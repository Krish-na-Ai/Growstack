'use client';

import React, { useEffect, useRef } from 'react';
import { useChatContext } from '../context/ChatContext';
import { MessageBubble } from './MessageBubble';

export const ChatHistory = () => {
  const { messages } = useChatContext();
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Welcome to Gemini Chat</h3>
            <p>Send a message to start the conversation!</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
