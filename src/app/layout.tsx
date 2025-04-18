// src/app/layout.js
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Gemini AI Chat',
  description: 'Real-time chat with Gemini AI using Socket.io',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {children}
      </body>
    </html>
  );
}