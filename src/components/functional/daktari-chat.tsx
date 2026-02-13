'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, X } from 'lucide-react';

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API (Note: In production, this should be done via a backend route to hide the key)
// For this prototype/MVP, we'll assume the key is available or proxied. 
// Given the constraints, we'll simulate the interaction or use the key if provided in env, 
// but strictly speaking, client-side key usage is risky. 
// We will implement a mock mode if key is missing to ensure UI works.

const MOCK_RESPONSE = "Jambo! I am Daktari AI. I can help you with initial triage. How are you feeling today?";

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export function DaktariChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'model', text: "Jambo! I'm Daktari AI. How can I help you today?", timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Simulate API call or Real API call
            // In a real app, send to /api/chat

            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
            let responseText = MOCK_RESPONSE;

            if (apiKey) {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await model.generateContent(input);
                responseText = result.response.text();
            } else {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                responseText = "I see. Could you tell me more about your symptoms? (Note: API Key missing, running in demo mode)";
            }

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Samahani, I'm having trouble connecting right now. Please try again.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center hover:bg-primary/90 transition-all z-50 animate-bounce"
                aria-label="Open Chat"
            >
                <Bot className="h-8 w-8" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Bot className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold">Daktari AI</h3>
                        <p className="text-xs text-blue-100 flex items-center">
                            <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-xs text-slate-400">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your symptoms..."
                        className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
                <p className="text-[10px] text-center text-slate-400 mt-2">
                    Daktari AI assists with triage but does not replace professional medical advice.
                </p>
            </div>
        </div>
    );
}
