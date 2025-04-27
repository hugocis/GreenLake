"use client";
import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, prefer-const */

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const ChatbotDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { type: 'user' as const, text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();

      const { sql, data: records, message } = data;

        let botResponse = `📄 SQL: ${sql}`;

        if (records && records.length > 0) {
        botResponse += `\n📊 Results:\n`;

        records.slice(0, 5).forEach((item: any, index: number) => {
            botResponse += `\n${index + 1}. `;

            // Mostrar solo campos clave si es posible
            const keys = Object.keys(item);
            if (keys.length <= 3) {
            botResponse += keys.map(k => `${k}: ${item[k]}`).join(', ');
            } else {
            botResponse += JSON.stringify(item, null, 2);
            }
        });

        if (records.length > 5) {
            botResponse += `\n...and ${records.length - 5} more records.`;
        }
        
        } else {
        botResponse += `\n⚠️ ${message || 'No records found.'}`;
        }


      setMessages([...newMessages, { type: 'bot', text: botResponse }]);
    } catch (err) {
      setMessages([...newMessages, { type: 'bot', text: '❌ Error processing your request.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        className="fixed bottom-6 right-6 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110 z-40"
        onClick={() => setIsOpen(true)}
      >
        💬
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-150 h- 90 rounded-xl shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center bg-green-600 text-white p-3 rounded-t-xl">
              <span>GreenBot 🤖</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">✖️</button>
            </div>
            <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg whitespace-pre-wrap ${
                    msg.type === 'user' ? 'bg-green-100 self-end' : 'bg-gray-100 self-start'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && <div className="text-gray-400">Thinking...</div>}
            </div>
            <div className="p-3 border-t flex">
              <input
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 border rounded-l px-2"
              />
              <button
                onClick={handleSend}
                className="bg-green-600 text-white px-4 rounded-r"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotDialog;
