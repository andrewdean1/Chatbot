'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/buttons/Button';
import { supabase } from '@/utils/supabase/client';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = { text: inputMessage, isUser: true };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({
                role: m.isUser ? 'user' : 'assistant',
                content: m.text,
              })),
              { role: 'user', content: inputMessage },
            ],
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from API');
        }

        const data = await response.json();

        const { error } = await supabase.from('chats').insert({
          user_input: inputMessage,
          response: data.reply,
          timestamp: new Date().toISOString(),
        });

        if (error) {
          console.error('Error inserting chat data:', error);
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.reply, isUser: false },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, I couldn't process your request.", isUser: false },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setInputMessage('');
  };

  return (
    <div className='flex flex-col h-screen bg-gradient-to-b from-primary-500 to-primary-950'>
      <div className='p-4 grid grid-cols-3 items-center'>
        <Link href='/'>
          <Button variant='light'>Back to Home</Button>
        </Link>
        <div className='flex flex-col items-center col-start-2'>
          <h1 className='text-3xl font-bold text-white'>Chat</h1>
          <h2 className='text-sm font-bold text-primary-200 mt-1'>
            Powered by OpenAI
          </h2>
        </div>
      </div>
      <div className='flex-1 flex justify-center overflow-hidden px-4 pb-4'>
        <div className='w-full max-w-3xl flex flex-col bg-white bg-opacity-10 backdrop-blur-md rounded-2xl shadow-2xl'>
          <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary-200 text-primary-950 rounded-br-none'
                      : 'bg-primary-800 text-primary-200 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className='p-4 border-t border-gray-200 border-opacity-20'>
            <div className='flex w-full items-end space-x-2'>
              <Button
                variant='light'
                onClick={handleClearChat}
                className='whitespace-nowrap'
              >
                Clear
              </Button>
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className='flex-1 border rounded-lg p-2 resize-none overflow-hidden bg-white text-black'
                placeholder='Type your message...'
                disabled={isLoading}
                rows={1}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading}
                className='whitespace-nowrap'
              >
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
