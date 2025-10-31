
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { MessageInput } from './components/MessageInput';
import { StarsBackground } from './components/StarsBackground';
import { Message, ModelType, Role } from './types';
import { SYSTEM_INSTRUCTION } from './constants';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentModel, setCurrentModel] = useState<ModelType>(ModelType.SONAR);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const ai = useMemo(() => new GoogleGenAI({ apiKey: process.env.API_KEY as string }), []);
  
  const chat = useMemo(() => ai.chats.create({
      model: currentModel,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })).slice(0, -1) // Exclude the last message if it's a model response being generated
    }), [ai, currentModel, messages]);


  useEffect(() => {
    const savedChat = localStorage.getItem('chatHistory');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  const cleanResponse = (text: string): string => {
    return text
      .replace(/\[\d+\]/g, '') // Remove citation numbers like [1], [2]
      .replace(/(\*|_|`|#)/g, ''); // Remove basic markdown characters
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: Role.USER, text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result = await chat.sendMessageStream({ message: text });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: Role.MODEL, text: '...' }]);

      for await (const chunk of result) {
        modelResponse += chunk.text;
        const cleanedText = cleanResponse(modelResponse);
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: Role.MODEL, text: cleanedText };
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { role: Role.MODEL, text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => {
        const newMessages = [...prev];
        if(newMessages[newMessages.length-1].role === Role.MODEL){
          newMessages[newMessages.length - 1] = errorMessage;
        } else {
          newMessages.push(errorMessage)
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [chat]);

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
  };

  const handleModelChange = (model: ModelType) => {
    setCurrentModel(model);
    handleNewChat();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#1e1b4b] to-[#0c0a09] text-white flex flex-col font-sans">
      <StarsBackground />
      <Header
        currentModel={currentModel}
        onModelChange={handleModelChange}
        onNewChat={handleNewChat}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <ChatInterface messages={messages} isLoading={isLoading} />
      </main>
      <footer className="p-4 md:p-6 bg-black bg-opacity-20 backdrop-blur-sm">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;
