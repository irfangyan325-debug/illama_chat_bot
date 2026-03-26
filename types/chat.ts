export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatModel {
  name: string;
  label: string;
}

export const AVAILABLE_MODELS: ChatModel[] = [
  { name: "llama3.2", label: "Llama 3.2" },
  { name: "llama3.1", label: "Llama 3.1" },
  { name: "mistral", label: "Mistral" },
  { name: "gemma2", label: "Gemma 2" },
  { name: "qwen2.5", label: "Qwen 2.5" },
  { name: "phi3", label: "Phi-3" },
  { name: "deepseek-r1", label: "DeepSeek R1" },
];