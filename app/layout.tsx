import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OllamaChat",
  description: "Local AI chat powered by Ollama",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}