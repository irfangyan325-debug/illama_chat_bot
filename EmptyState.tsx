"use client";

const SUGGESTIONS = [
  "How many annual leaves do I get?",
  "What is the sick leave policy?",
  "How do I apply for maternity leave?",
  "Can I carry forward unused leaves?",
  "What is the notice period for planned leave?",
  "Are there any unpaid leave options?",
];

interface Props {
  onSuggestion: (text: string) => void;
}

export function EmptyState({ onSuggestion }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center select-none">
      <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-teal-900/50">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">Leave Policy Assistant</h2>
        <p className="mt-1.5 text-sm text-zinc-500">Ask anything about CognitoBay's leave policy</p>
      </div>

      {/* <div className="grid grid-cols-2 gap-2 w-full max-w-md">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="rounded-xl border border-zinc-700/60 bg-zinc-800/60 px-3 py-3 text-left text-xs text-zinc-400 hover:text-zinc-200 hover:border-teal-500/40 hover:bg-zinc-700/50 transition-all duration-150 leading-relaxed"
          >
            {s}
          </button>
        ))}
      </div> */}
    </div>
  );
}