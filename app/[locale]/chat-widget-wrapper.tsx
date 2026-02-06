"use client";

import dynamic from "next/dynamic";

// Lazy load ChatWidget in client component (ssr: false only works in client components)
const ChatWidget = dynamic(
  () => import("@/components/chat-widget").then(mod => ({ default: mod.ChatWidget })),
  {
    ssr: false,
    loading: () => null
  }
);

export function ChatWidgetWrapper() {
  return <ChatWidget />;
}
