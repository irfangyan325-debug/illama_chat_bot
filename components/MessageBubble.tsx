"use client";

import { Message } from "@/types/chat";
import { useEffect, useRef } from "react";

interface Props {
  message: Message;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!message.isStreaming && cursorRef.current) {
      cursorRef.current.style.display = "none";
    }
  }, [message.isStreaming]);

  return (
    <div
      className={`flex w-full gap-3 px-4 py-3 group ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-900/30">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
              fill="white"
              opacity="0.9"
            />
          </svg>
        </div>
      )}

      <div
        className={`relative max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-teal-600 text-white rounded-tr-sm"
            : "bg-zinc-800/80 text-zinc-100 border border-zinc-700/50 rounded-tl-sm backdrop-blur-sm"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">
          {message.content}
          {message.isStreaming && (
            <span
              ref={cursorRef}
              className="ml-0.5 inline-block h-4 w-0.5 bg-teal-400 animate-pulse align-text-bottom"
            />
          )}
        </p>

        <span
          className={`mt-1.5 block text-[10px] select-none ${
            isUser ? "text-teal-200/70 text-right" : "text-zinc-500"
          }`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {isUser && (
        <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-zinc-700 flex items-center justify-center border border-zinc-600">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"
              fill="#94a3b8"
            />
          </svg>
        </div>
      )}
    </div>
  );
}