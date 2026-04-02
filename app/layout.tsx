import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leave Policy Assistant · CognitoBay",
  description: "AI-powered leave policy assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}