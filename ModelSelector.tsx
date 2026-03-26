"use client";

import { AVAILABLE_MODELS, ChatModel } from "@/types/chat";

interface Props {
  selected: string;
  onChange: (model: string) => void;
}

export function ModelSelector({ selected, onChange }: Props) {
  const current = AVAILABLE_MODELS.find((m) => m.name === selected);

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-zinc-700/60 bg-zinc-800/80 pl-3 pr-8 py-1.5 text-xs font-medium text-zinc-300 outline-none hover:border-teal-500/50 focus:border-teal-500/60 transition-colors cursor-pointer backdrop-blur-sm"
      >
        {AVAILABLE_MODELS.map((m: ChatModel) => (
          <option key={m.name} value={m.name} className="bg-zinc-900">
            {m.label}
          </option>
        ))}
      </select>

      {/* Chevron icon */}
      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}