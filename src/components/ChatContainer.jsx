'use client';

import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatHistory } from './ChatHistory';
import { ChatInput } from './ChatInput';
import { ConnectionStatus } from './ConnectionStatus';

export const ChatContainer = () => {
  return (
    <div className="flex flex-col h-full rounded-lg shadow-lg bg-gray-50 overflow-hidden">
      <ChatHeader />
      <ConnectionStatus />
      <ChatHistory />
      <ChatInput />
    </div>
  );
};