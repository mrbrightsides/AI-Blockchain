
import React from 'react';
import { ModelType } from '../types';

interface HeaderProps {
  currentModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onNewChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentModel, onModelChange, onNewChat }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-white/10 bg-black bg-opacity-20 backdrop-blur-sm z-10">
      <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        AI Blockchain Tutor
      </h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <select
            value={currentModel}
            onChange={(e) => onModelChange(e.target.value as ModelType)}
            className="bg-slate-800 border border-slate-700 rounded-md py-2 pl-3 pr-8 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            <option value={ModelType.SONAR}>Sonar (Fast)</option>
            <option value={ModelType.SONAR_PRO}>Sonar Pro (Detailed)</option>
          </select>
          <svg className="w-4 h-4 absolute top-1/2 right-2.5 -translate-y-1/2 pointer-events-none text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <button
          onClick={onNewChat}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition-transform transform hover:scale-105"
        >
          New Chat
        </button>
      </div>
    </header>
  );
};
