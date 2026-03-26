"use client";

const SUGGESTIONS = [
  "Explain quantum entanglement simply",
  "Write a Python script to scrape a webpage",
  "What's the difference between TCP and UDP?",
  "Give me 5 startup ideas for 2025",
];

interface Props {
  onSuggestion: (text: string) => void;
  model: string;
}

export function EmptyState({ onSuggestion, model }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center select-none">
      {/* Logo mark */}
      <div className="relative">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-teal-900/50">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              fill="white"
              opacity="0.15"
            />
            <path
              d="M8 12l2.5 2.5L16 9"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-teal-400 border-2 border-zinc-900 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-zinc-900" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">
          How can I help you?
        </h2>
        <p className="mt-1.5 text-sm text-zinc-500">
          Running{" "}
          <span className="font-mono text-teal-400 text-xs bg-teal-400/10 px-1.5 py-0.5 rounded">
            {model}
          </span>{" "}
          via Ollama
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="rounded-xl border border-zinc-700/60 bg-zinc-800/60 px-3 py-3 text-left text-xs text-zinc-400 hover:text-zinc-200 hover:border-teal-500/40 hover:bg-zinc-700/50 transition-all duration-150 leading-relaxed"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}