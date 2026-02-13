"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2, ArrowLeft, User } from 'lucide-react';
import Link from "next/link";
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export default function PatientChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'model', text: "Jambo! I am Daktari AI. I can help you with initial triage strategies. Please describe your symptoms.", timestamp: new Date() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
            // In a real app, use a server action or API route to protect the key
            const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
            let responseText = "I understand. Based on your symptoms, I recommend seeing a nurse for a check-up. Would you like to book an appointment?";

            if (apiKey) {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await model.generateContent(`Acting as a medical triage assistant named Daktari AI for a hospital in Kenya, provide brief, professional advice for: ${input}. Keep it under 50 words. Always advise seeing a professional.`);
                responseText = result.response.text();
            } else {
                // Mock delay
                await new Promise(resolve => setTimeout(resolve, 1500));
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
                text: "System error. Please try again or book an appointment directly.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] bg-background">
            {/* Header */}
            <div className="flex items-center space-x-4 p-4 border-b border-border bg-card">
                <Link href="/patient" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft className="h-6 w-6 text-foreground" />
                </Link>
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <Bot className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Daktari AI Assistant</h1>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary ml-2' : 'bg-green-100 mr-2'}`}>
                                {msg.role === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-green-600" />}
                            </div>

                            {/* Bubble */}
                            <div
                                className={`p-4 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                        : 'bg-card text-card-foreground border border-border rounded-tl-none'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-center space-x-2 ml-10 bg-card p-3 rounded-2xl border border-border shadow-sm">
                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                            <span className="text-xs text-muted-foreground">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your symptoms here..."
                        className="flex-1 p-4 bg-background border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:border-input text-sm transition-all shadow-inner"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="p-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md transform hover:scale-105 active:scale-95"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
