import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import apiFetch from '@/lib/apiClient';

export default function Chatbot() {
  const [role, setRole] = useState('tenant');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I\'m your RootnSpace Assistant.\n\nThis is a comprehensive property management system where tenants can manage their stays, payments, and requests, while admins oversee operations, approvals, and maintenance.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { sender: 'user', text: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      const res = await apiFetch('/chat', { method: 'POST', body: { message: input, role } });
      setMessages((m) => [...m, { sender: 'bot', text: res.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { sender: 'bot', text: 'Error: ' + (err.message || 'Failed to get reply') }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
  <div className="chat-container p-6 bg-card rounded-2xl max-w-lg mx-auto border border-border">
      <div className="flex justify-between mb-2">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border border-border rounded-lg bg-background text-foreground">
          <option value="tenant">Tenant</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div ref={boxRef} className="chat-box h-96 overflow-y-auto p-4 border border-border rounded-lg bg-background">
        {messages.map((msg, i) => (
          <div key={i} className={`my-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ml-8' : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 mr-8'}`}>
            <b className="text-xs uppercase text-muted-foreground">{msg.sender === 'user' ? 'You' : 'Bot'}</b>
            <p className="text-sm whitespace-pre-wrap mt-0.5">{msg.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className="my-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 mr-8 flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Thinking...</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1 p-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
