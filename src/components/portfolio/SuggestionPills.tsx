interface SuggestionPillsProps {
  onSelect: (question: string) => void;
}

const suggestions = [
  "What hackathons has Luv won?",
  "Tell me about the Nebula project",
  "What are Luv's coding ratings?",
  "Show me the SentiHeal demo",
  "What tech stack does Luv use?",
  "How many GitHub contributions?",
];

const SuggestionPills = ({ onSelect }: SuggestionPillsProps) => {
  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 px-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            className="suggestion-pill"
            onClick={() => onSelect(suggestion)}
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionPills;
