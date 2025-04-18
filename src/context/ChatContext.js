// src/context/ChatContext.js
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initializeSocket, getSocket, disconnectSocket } from '../utils/socketClient';

// Define message types
const MessageTypes = {
  USER: 'user',
  AI: 'ai',
};

// Create context
const ChatContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Initialize socket connection
  useEffect(() => {
    const socket = initializeSocket();
    
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    socket.on('connect_error', (err) => {
      setError(`Connection error: ${err.message}`);
      setIsConnected(false);
    });

    // Handle message receipt confirmation
    socket.on('messageReceived', (data) => {
      console.log('Message received by server:', data);
    });
    
    // Handle response start
    socket.on('responseStart', (data) => {
      setMessages(prev => prev.map(msg => 
        msg.id === data.id ? { ...msg, status: 'generating' } : msg
      ));
      
      // Add AI message placeholder
      const aiMessageId = uuidv4();
      
      setMessages(prev => [...prev, {
        id: aiMessageId,
        type: MessageTypes.AI,
        text: '',
        relatedTo: data.id,
        status: 'generating',
        isStreaming: true,
        timestamp: new Date().toISOString()
      }]);
    });
    
    // Handle response chunks in ChatGPT-like streaming fashion
    socket.on('responseChunk', (data) => {
      setMessages(prev => prev.map(msg => 
        msg.relatedTo === data.id ? { 
          ...msg, 
          text: msg.text + data.chunk,
          isStreaming: true
        } : msg
      ));
    });
    
    // Handle response completion
    socket.on('responseComplete', (data) => {
      setIsLoading(false);
      setMessages(prev => prev.map(msg => 
        msg.relatedTo === data.id ? { 
          ...msg, 
          text: data.fullResponse,
          status: 'complete',
          isStreaming: false
        } : msg
      ));
    });
    
    // Handle response errors
    socket.on('responseError', (data) => {
      setIsLoading(false);
      setError(data.message);
      setMessages(prev => prev.map(msg => 
        msg.id === data.id || msg.relatedTo === data.id ? { 
          ...msg, 
          status: 'error',
          error: data.message,
          isStreaming: false
        } : msg
      ));
    });
    
    return () => {
      disconnectSocket();
    };
  }, []);
  
  // Send message to AI
  const sendMessage = useCallback((text) => {
    if (!text.trim()) return;
    
    const messageId = uuidv4();
    const newMessage = {
      id: messageId,
      type: MessageTypes.USER,
      text,
      status: 'sending',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);
    
    const socket = getSocket();
    socket.emit('sendMessage', {
      id: messageId,
      text
    });
  }, []);
  
  // Clear conversation
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);
  
  // Value to be provided by the context
  const value = {
    messages,
    sendMessage,
    clearChat,
    isConnected,
    isLoading,
    error,
    MessageTypes
  };
  
  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};