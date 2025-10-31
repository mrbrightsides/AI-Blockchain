
import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white self-end'
    : 'bg-slate-700 text-slate-200 self-start';

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  
  const formattedText = message.text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

  return (
    <div className={`flex ${containerClasses} animate-fade-in-up`}>
      <div className={`max-w-xl lg:max-w-2xl rounded-xl px-5 py-3 ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap">{formattedText}</p>
      </div>
    </div>
  );
};

// Add keyframes for animation in tailwind.config.js or a global style tag
// For simplicity, we can add it to the main HTML or configure it here if using a full setup.
// In tailwind.config.js:
// theme: {
//   extend: {
//     keyframes: {
//       'fade-in-up': {
//         '0%': { opacity: '0', transform: 'translateY(10px)' },
//         '100%': { opacity: '1', transform: 'translateY(0)' },
//       },
//     },
//     animation: {
//       'fade-in-up': 'fade-in-up 0.3s ease-out',
//     },
//   },
// },
