import { useState, useRef, useEffect } from "react";
import { Send, Mic, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuggestionPills from "./SuggestionPills";
import TypingIndicator from "./TypingIndicator";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/luvgpt-chat`;

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendHovered, setIsSendHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized]);

  const handleSuggestionSelect = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";
    // Use a ref to track if component is mounted/streaming to prevent state updates after unmount
    let isStreaming = true;

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (response.status === 429) {
        toast.error("Rate limit exceeded. Please try again later.");
        setIsLoading(false);
        return;
      }

      if (response.status === 402) {
        toast.error("Usage limit reached. Please try again later.");
        setIsLoading(false);
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to start stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamDone = false;

      // Add empty assistant message once
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      // Buffer for throttling updates
      let lastUpdateTime = Date.now();

      while (!streamDone && isStreaming) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        let shouldUpdate = false;

        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const jsonStr = line.slice(6);
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                shouldUpdate = true;
              }
            } catch (e) {
              // ignore parse errors for partial chunks
            }
          } else if (line === "data: [DONE]") {
            streamDone = true;
          }
        }

        // Throttle updates to ~60fps (16ms) to prevent UI freezing
        // or even slower (e.g. 50ms) if the stream is very fast
        const now = Date.now();
        if (shouldUpdate && (now - lastUpdateTime > 50 || streamDone)) {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: assistantContent,
            };
            return updated;
          });
          lastUpdateTime = now;
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
      setMessages((prev) => {
        if (prev[prev.length - 1]?.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
      isStreaming = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Minimized State
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999] animate-enter">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full h-14 w-14 bg-gradient-to-r from-peach to-accent shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center p-0"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-8 h-8 text-black" />
        </Button>
      </div>
    );
  }

  return (
    <section
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-6 px-2 md:px-8 animate-slide-up transition-all duration-300"
      style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
      aria-label="Chat with LuvGPT"
    >
      <div className="max-w-3xl mx-auto relative bg-glass/40 backdrop-blur-md rounded-t-3xl border-t border-white/10 p-4 shadow-2xl">

        {/* Toggle Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute right-4 top-4 p-2 text-white/50 hover:text-white transition-colors"
          aria-label="Minimize Chat"
        >
          <ChevronDown className="w-6 h-6" />
        </button>

        <h2 className="text-center text-lg font-medium mb-4 text-muted-foreground pt-2">
          Ask <span className="text-peach font-serif">LuvGPT</span>
        </h2>

        {/* Messages area - Responsive Height */}
        {messages.length > 0 && (
          <div className="max-h-[35vh] md:max-h-60 overflow-y-auto mb-4 space-y-3 scrollbar-hide px-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] ${message.role === "user"
                      ? "chat-bubble-user"
                      : "chat-bubble-assistant prose prose-invert prose-sm"
                    }`}
                >
                  {message.role === "assistant" ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Suggestion pills */}
        {messages.length === 0 && (
          <SuggestionPills onSelect={handleSuggestionSelect} />
        )}

        {/* Input area */}
        <div className="relative mt-4">
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:scale-110 transition-all duration-200 hidden md:block"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What would you like to know?"
            className="w-full bg-glass/80 border border-white/10 rounded-xl py-4 pl-4 md:pl-12 pr-12 md:pr-16 text-foreground placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-200 text-sm md:text-base"
            disabled={isLoading}
          />

          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-peach hover:bg-peach/90 text-black rounded-lg w-8 h-8 md:w-10 md:h-10 transition-all duration-200"
            style={{
              transform: `translateY(-50%) ${isSendHovered ? "rotate(15deg) scale(1.05)" : "rotate(0)"}`,
            }}
            onMouseEnter={() => setIsSendHovered(true)}
            onMouseLeave={() => setIsSendHovered(false)}
            aria-label="Send message"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
