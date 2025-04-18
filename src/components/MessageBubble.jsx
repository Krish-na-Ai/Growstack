// src/components/MessageBubble.jsx
'use client';

import React from 'react';
import { useChatContext } from '../context/ChatContext';
import ReactMarkdown from 'react-markdown';

export const MessageBubble = ({ message }) => {
  const { MessageTypes } = useChatContext();
  const isUser = message.type === MessageTypes.USER;
  
  // Format the timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-2xl px-4 py-2 rounded-lg ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-none' 
            : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap break-words">{message.text}</div>
        ) : (
          <>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown>
                {message.text || " "}
              </ReactMarkdown>
            </div>
            {message.isStreaming && (
              <div className="flex mt-1">
                <div className="cursor-pulse"></div>
              </div>
            )}
          </>
        )}
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};