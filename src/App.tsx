// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from './hooks/useSocket';
import { fetchMessages } from './api/messages';
import type { Message as ApiMessage } from './api/messages';

// API 메시지에 self 플래그를 추가한 UI 전용 타입
interface ChatMessage extends ApiMessage {
  self: boolean;
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  // 1) 페이지 로드 시 REST API로 초기 메시지 불러오기
  useEffect(() => {
    fetchMessages()
      .then((hist: ApiMessage[]) => {
        const chatHist: ChatMessage[] = hist.map(m => ({ ...m, self: false }));
        setMessages(chatHist);
      })
      .catch(err => console.error('메시지 불러오기 실패:', err));
  }, []);

  // 2) Socket.IO 실시간 메시지 수신 핸들러
  const handleMessage = useCallback((text: string) => {
    setMessages(prev => [
      ...prev,
      { id: prev.length, text, timestamp: new Date().toISOString(), self: false }
    ]);
  }, []);
  const { sendMessage } = useSocket('http://localhost:4000', handleMessage);

  // 3) 메시지 전송 및 즉시 UI에 반영
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    sendMessage(trimmed);
    setMessages(prev => [
      ...prev,
      { id: prev.length, text: trimmed, timestamp: new Date().toISOString(), self: true }
    ]);
    setInput('');
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="p-4 bg-indigo-600 text-white text-xl">Chat App</header>
      <main className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}>
            <div className={`
                max-w-[70%] px-4 py-2 rounded-lg
                ${msg.self
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'}
              `}
            >
              <div className="text-xs text-gray-500 mb-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
              {msg.text}
            </div>
          </div>
        ))}
      </main>
      <form onSubmit={handleSubmit} className="p-4 flex gap-2 bg-white border-t">
        <input
          type="text"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring"
          placeholder="메시지를 입력하세요…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          전송
        </button>
      </form>
    </div>
  );
}
