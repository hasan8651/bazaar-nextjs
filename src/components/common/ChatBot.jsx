"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // for auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleChat = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({
        history: messages.map((m)=> ({
          role: m.role === "user"?"user":"model",
          parts: [{text:m.text}],
        })),
        generationConfig: { maxOutputTokens: 2048 },
      });

      const result = await chat.sendMessage(currentInput + "\n\nGive complete answer Do not stop midway.");
      const response = await result.response;
      const botText = response.text();

      
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I am having trouble connecting. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-(--text-primary)">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0EA5A4] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all cursor-pointer border-none outline-none"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 md:w-96 bg-(--background) border border-(--border) rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
          <div className="bg-[#0EA5A4] p-4 text-white font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span>PrimeMart Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-lg cursor-pointer text-white border-none bg-transparent outline-none"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-4 space-y-4 bg-(--surface) custom-scrollbar"
          >
            {messages.length === 0 && (
              <div className="text-center text-(--text-primary) opacity-50 text-xs mt-10">
                Hi! Ask me anything about PrimeMart.
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#0EA5A4] text-white rounded-tr-none"
                      : "bg-(--background) text-(--text-primary) border border-(--border) rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-(--background) p-3 rounded-2xl border border-(--border) shadow-sm">
                  <Loader2 className="animate-spin text-[#0EA5A4]" size={18} />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-(--border) bg-(--background) flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Type a message..."
              className="flex-1 outline-none text-sm p-2 bg-(--surface) text-(--text-primary) border border-(--border) rounded-xl focus:ring-1 focus:ring-[#0EA5A4]"
            />
            <button
              onClick={handleChat}
              disabled={loading || !input.trim()}
              className="p-2 bg-[#0EA5A4] text-white rounded-xl hover:bg-[#0c8d8c] transition-colors disabled:opacity-50 cursor-pointer border-none flex items-center justify-center shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
