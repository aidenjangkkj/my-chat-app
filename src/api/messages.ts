// src/api/messages.ts
import axios from 'axios';

export interface Message {
  id: number;
  text: string;
  timestamp: string;
}

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchMessages(): Promise<Message[]> {
  const res = await axios.get<Message[]>(`${API_BASE}/api/messages`);
  return res.data;
}

// // POST 이용 시
// export async function postMessage(text: string): Promise<Message> {
//   const res = await axios.post<Message>(`${API_BASE}/api/messages`, { text });
//   return res.data;
// }
