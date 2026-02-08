import { useState, useRef, useEffect } from "react";
import { Send, Mic } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      let textBuffer = "";
      let streamDone = false;

      // Add empty assistant message to update progressively
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Handle remaining buffer
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return updated;
              });
            }
          } catch {
            /* ignore */
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
      // Remove the empty assistant message if error occurred
      setMessages((prev) => {
        if (prev[prev.length - 1]?.content === "") {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-20 pb-6 px-4 md:px-8 animate-slide-up"
      style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
      aria-label="Chat with LuvGPT"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-lg font-medium mb-4 text-muted-foreground">
          Ask <span className="text-peach font-serif">LuvGPT</span>
        </h2>

        {/* Messages area */}
        {messages.length > 0 && (
          <div className="max-h-60 overflow-y-auto mb-4 space-y-3 scrollbar-hide">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.role === "user"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
            aria-label="Voice input (coming soon)"
            title="Voice input coming soon"
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
            className="w-full bg-glass/80 border border-white/10 rounded-xl py-4 pl-12 pr-16 text-foreground placeholder:text-white/40 focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/10 transition-all duration-200"
            disabled={isLoading}
          />

          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-peach hover:bg-peach/90 text-black rounded-lg w-10 h-10 transition-all duration-200"
            style={{
              transform: `translateY(-50%) ${isSendHovered ? "rotate(15deg) scale(1.05)" : "rotate(0)"}`,
            }}
            onMouseEnter={() => setIsSendHovered(true)}
            onMouseLeave={() => setIsSendHovered(false)}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
