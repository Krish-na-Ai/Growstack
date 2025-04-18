'use client';

import React from 'react';
import { useChatContext } from '../context/ChatContext';

export const ChatHeader = () => {
  const { clearChat, isConnected } = useChatContext();
  
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M6 17.657l-.707.707M12 21v-1" />
          </svg>
        </div>
        <div>
          <h2 className="font-semibold text-lg">Gemini AI</h2>
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-500">{isConnected ? 'Online' : 'Disconnected'}</span>
          </div>
        </div>
      </div>
      <button
        onClick={clearChat}
        className="text-gray-500 hover:text-red-500 transition-colors"
        title="Clear conversation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};