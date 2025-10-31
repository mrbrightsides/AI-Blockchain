
import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {messages.length === 0 && !isLoading && (
        <div className="text-center text-slate-400 mt-20">
          <h2 className="text-2xl font-semibold">Welcome to the AI Blockchain Tutor</h2>
          <p className="mt-2">Ask me anything about Blockchain and Web3 to get started!</p>
        </div>
      )}

      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      
      {isLoading && messages[messages.length - 1]?.role === 'user' && (
        <MessageBubble message={{ role: 'model', text: 'Thinking...' }} />
      )}
      
      <div ref={chatEndRef} />
    </div>
  );
};
