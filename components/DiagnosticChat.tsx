
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

interface DiagnosticChatProps {
  onClose: () => void;
}

const DiagnosticChat: React.FC<DiagnosticChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Seja bem-vindo à Japantech. Qual o desafio tecnológico ou de software que sua empresa precisa resolver agora?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_LINK = "https://api.whatsapp.com/send?phone=5516996398116&text=Olá%20Japantech!%20Acabei%20de%20fazer%20o%20diagnóstico%20com%20a%20IA%20e%20gostaria%20de%20falar%20com%20um%20especialista.";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = 'gemini-3-flash-preview';
      
      const response = await ai.models.generateContent({
        model,
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: `Você é o Tech Advisor da Japantech. 
          Seu foco é: Agilidade, Desenvolvimento de Software Corporativo, Landing Pages com Pagamento Integrado e Automações com IA.
          Seu tom deve ser profissional, direto, tecnológico e voltado para negócios (B2B).
          Evite metáforas culturais ou termos como "precisão oriental". Foque em resultados práticos, eficiência técnica e velocidade de entrega.
          Identifique se o cliente precisa de um sistema de gestão, uma landing page para vendas ou uma IA para automatizar processos manuais.
          Após 3-4 mensagens, sugira fortemente um contato humano para fechamento de proposta através do WhatsApp: +55 (16) 99639-8116 ou pelo link: ${WHATSAPP_LINK}.`,
          temperature: 0.7,
        }
      });

      const aiResponse = response.text || "Desculpe, tive um pequeno erro técnico. Vamos continuar?";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Houve um erro na conexão. Pode tentar novamente em instantes?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl">
      <div className="w-full max-w-4xl h-[80vh] bg-zinc-950 border border-red-600/30 rounded-sm flex flex-col shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-zinc-900">
          <div>
            <h3 className="text-white font-black text-xl uppercase tracking-tighter">Especialista <span className="text-red-600">Japantech</span></h3>
            <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Software & AI Mastery</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-sm ${
                m.role === 'user' 
                  ? 'bg-red-600 text-white font-medium' 
                  : 'bg-zinc-900 text-gray-200 border border-white/5'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 p-4 rounded-sm border border-white/5 flex space-x-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10 bg-zinc-900">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-4"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Descreva sua necessidade de tecnologia..."
              className="flex-1 bg-black border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-red-600 transition-colors"
              disabled={isLoading}
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-sm font-bold uppercase text-sm transition-all active:scale-95 disabled:opacity-50"
            >
              Enviar
            </button>
          </form>
          <div className="flex justify-between items-center mt-4">
            <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
              Tecnologia ágil para acelerar sua empresa.
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-red-500 font-bold uppercase hover:text-red-400 transition-colors cursor-none"
            >
              Falar com humano agora
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticChat;
