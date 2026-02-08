const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-glass/60 rounded-2xl rounded-bl-md border border-white/10 w-fit">
      <span
        className="w-2 h-2 rounded-full bg-white/60 typing-dot"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="w-2 h-2 rounded-full bg-white/60 typing-dot"
        style={{ animationDelay: "0.2s" }}
      />
      <span
        className="w-2 h-2 rounded-full bg-white/60 typing-dot"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  );
};

export default TypingIndicator;
