// src/hooks/useSocket.ts
import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(url: string, onMessage: (msg: string) => void) {
  const socketRef = useRef<Socket | null>(null);
  const onMessageRef = useRef(onMessage);

  // 1) onMessage가 바뀔 때마다 ref만 업데이트
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // 2) url이 바뀔 때만 연결/해제
  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;

    socket.on('chat message', (msg: string) => {
      onMessageRef.current(msg);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url]);

  // 메시지 전송 함수
  const sendMessage = useCallback((msg: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('chat message', msg);
    }
  }, []);

  return { sendMessage };
}
