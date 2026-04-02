"use client";

import { useState, useCallback, useRef } from "react";
import { Message } from "@/types/chat";

const API_URL = "http://localhost:8000/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadingRef = useRef(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoadingRef.current) return;

    setError(null);
    isLoadingRef.current = true;
    setIsLoading(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    const assistantId = crypto.randomUUID();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({ question: content.trim() }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.detail || `HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No response body");

      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: accumulated } : m
          )
        );
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;

      const msg =
        err instanceof Error ? err.message : "Failed to connect to the API";
      setError(msg);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: `⚠️ Error: ${msg}. Make sure the backend is running on localhost:8000.`,
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []); // ← empty deps, no re-renders on state change

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    isLoadingRef.current = false;
    setIsLoading(false);
    setMessages((prev) =>
      prev.map((m) => (m.isStreaming ? { ...m, isStreaming: false } : m))
    );
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, stopGeneration, clearMessages };
}