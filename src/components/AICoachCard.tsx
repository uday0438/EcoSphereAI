import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { type ChatMessage } from "../types";
import { cn } from "../lib/utils";

// Safe helper function to parse markdown-style bold text (**bold**) into JSX.
// Prevents XSS vulnerabilities caused by injecting raw HTML.
function renderSafeMessageContent(content: string) {
  const parts = content.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, index) => {
        // Odd indices contain text that was enclosed in **
        if (index % 2 === 1) {
          return (
            <strong key={index} className="text-white font-semibold">
              {part}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

export function AICoachCard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm EcoSphere AI, your personal climate coach. How can I help you reduce your footprint today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/analyze-carbon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage.content })
      });
      
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: data.result,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Sorry, my systems encountered an error analyzing that. Could you try again?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl flex flex-col h-[450px] relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-400" />
      
      <div className="p-6 border-b border-white/5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Sparkles className="text-emerald-400 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">AI Coach</h3>
            <p className="text-xs text-slate-400">Powered by Gemini Vertex AI</p>
          </div>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 pr-4"
        role="log"
        aria-label="Chat conversation history"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={cn(
              "max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed",
              msg.role === "user" 
                ? "bg-slate-700/60 text-white ml-auto rounded-tr-sm" 
                : "bg-emerald-500/10 border border-emerald-500/20 text-slate-200 mr-auto rounded-tl-sm"
            )}
          >
            {/* Safely render text to prevent XSS */}
            {renderSafeMessageContent(msg.content)}
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 items-center text-emerald-400 text-sm ml-2"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating dynamic insights...
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input
            id="ai-coach-input-field"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask your climate coach..."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-full pl-6 pr-14 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white transition-all disabled:opacity-50"
            aria-label="Ask your climate coach"
          />
          <button 
            id="ai-coach-submit-button"
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full disabled:opacity-50 transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
