"use client";

import { useState, useRef, KeyboardEvent } from "react";

interface Props {
  onSend: (message: string) => void;
  onStop: () => void;
  isLoading: boolean;
}

export function ChatInput({ onSend, onStop, isLoading }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || isLoading) return;
    onSend(value);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  };

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-zinc-700/60 bg-zinc-800/70 px-3 py-2.5 shadow-xl shadow-black/30 focus-within:border-teal-500/60 transition-colors duration-200">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        rows={1}
        placeholder="Ask about leave policy… (Enter to send)"
        className="flex-1 resize-none bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none max-h-40"
      />
      <div className="flex items-center pb-0.5">
        {isLoading ? (
          <button
            onClick={onStop}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
            title="Stop"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!value.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-600 text-white hover:bg-teal-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-900/40"
            title="Send"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}