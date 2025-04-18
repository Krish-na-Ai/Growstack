'use client';

import React from 'react';
import { useChatContext } from '../context/ChatContext';

export const ConnectionStatus = () => {
  const { isConnected, error } = useChatContext();
  
  if (isConnected && !error) {
    return null;
  }
  
  return (
    <div className={`p-3 text-white text-sm ${error ? 'bg-red-500' : 'bg-yellow-500'}`}>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Disconnected from server. Attempting to reconnect...</p>
      )}
    </div>
  );
};