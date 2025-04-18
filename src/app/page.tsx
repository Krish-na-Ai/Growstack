'use client';

import { ChatProvider } from '../context/ChatContext';
import { ChatContainer } from '../components/ChatContainer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl h-[80vh]">
        <ChatProvider>
          <ChatContainer />
        </ChatProvider>
      </div>
    </main>
  );
}