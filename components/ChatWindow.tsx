"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "../ChatInput";
import { ModelSelector } from "../ModelSelector";
import { EmptyState } from "../EmptyState";

export function ChatWindow() {
  const [model, setModel] = useState("llama3.2");
  const { messages, isLoading, error, sendMessage, stopGeneration, clearMessages } =
    useChat(model);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-full bg-zinc-950 font-sans antialiased">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-800/60 bg-zinc-900/50 p-4 gap-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-zinc-800/60">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </div>
          <span className="text-sm font-semibold text-zinc-200 tracking-tight">OllamaChat</span>
        </div>

        <button
          onClick={clearMessages}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-all duration-150 border border-dashed border-zinc-700/50 hover:border-zinc-600"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          New conversation
        </button>

        <div className="mt-auto space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 px-1 mb-2">Model</p>
          <ModelSelector selected={model} onChange={setModel} />

          <div className="mt-3 rounded-xl bg-zinc-800/40 border border-zinc-700/40 p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] text-zinc-400 font-medium">Ollama Status</span>
            </div>
            <p className="text-[10px] text-zinc-600 font-mono">localhost:11434</p>
          </div>
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <header className="flex md:hidden items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600" />
            <span className="text-sm font-semibold text-zinc-200">OllamaChat</span>
          </div>
          <div className="flex items-center gap-2">
            <ModelSelector selected={model} onChange={setModel} />
            <button
              onClick={clearMessages}
              className="h-7 w-7 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent py-4">
          {messages.length === 0 ? (
            <EmptyState onSuggestion={sendMessage} model={model} />
          ) : (
            <div className="max-w-3xl mx-auto space-y-1 pb-4">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-4 mb-2 rounded-xl bg-red-900/30 border border-red-700/40 px-4 py-2.5 text-xs text-red-300 flex items-start gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5 flex-shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            {error}
          </div>
        )}

        {/* Input bar */}
        <div className="px-4 pb-4 pt-2 max-w-3xl w-full mx-auto">
          <ChatInput
            onSend={sendMessage}
            onStop={stopGeneration}
            isLoading={isLoading}
          />
          <p className="mt-2 text-center text-[10px] text-zinc-600">
            Responses are generated by a local LLM. May contain errors.
          </p>
        </div>
      </div>
    </div>
  );
}