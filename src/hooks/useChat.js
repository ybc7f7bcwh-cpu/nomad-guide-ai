import { useState, useCallback } from 'react';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content) => {
    const userMessage = { role: 'user', content, id: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage = {
        role: 'ai',
        content: `Thanks for your message! I'm processing your travel request.`,
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  }, []);

  return { messages, sendMessage, isLoading };
}
