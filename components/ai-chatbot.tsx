"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, ImageIcon, Paperclip, Send, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Message = {
    id: string;
    content: string;
    role: "user" | "assistant";
    attachments?: {
        type: "image" | "video";
        url: string;
    }[];
};

/** Simple markdown-like rendering: bold, italic, links, line breaks */
function renderMarkdown(text: string) {
    // Split by newlines first
    const lines = text.split("\n");
    return lines.map((line, i) => {
        // Process inline formatting
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let key = 0;

        // Bold **text**
        const boldRegex = /\*\*(.*?)\*\*/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(remaining)) !== null) {
            if (match.index > lastIndex) {
                parts.push(remaining.slice(lastIndex, match.index));
            }
            parts.push(<strong key={`b-${key++}`}>{match[1]}</strong>);
            lastIndex = boldRegex.lastIndex;
        }
        if (lastIndex < remaining.length) {
            parts.push(remaining.slice(lastIndex));
        }

        return (
            <span key={i}>
                {parts.length > 0 ? parts : line}
                {i < lines.length - 1 && <br />}
            </span>
        );
    });
}

export function AIChatbot() {
    const t = useTranslations("chat");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: t("welcomeMessage"),
            role: "assistant",
        },
    ]);
    const [input, setInput] = useState("");
    const [attachments, setAttachments] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() && attachments.length === 0) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            attachments:
                attachments.length > 0
                    ? attachments.map((file) => ({
                          type: file.type.startsWith("image/")
                              ? ("image" as const)
                              : ("video" as const),
                          url: URL.createObjectURL(file),
                      }))
                    : undefined,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        const question = input;
        setInput("");
        setAttachments([]);
        setIsLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_NEOCHAT_BASE_URL}/askNeochat`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ question }),
                }
            );

            if (response.status === 429) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: (Date.now() + 1).toString(),
                        content: t("errorRateLimit"),
                        role: "assistant",
                    },
                ]);
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                content:
                    data.answer?.result || t("errorProcess"),
                role: "assistant",
            };
            setMessages((prev) => [...prev, aiResponse]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 2).toString(),
                    content: t("errorConnection"),
                    role: "assistant",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [input, attachments, t]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setAttachments((prev) => [...prev, ...filesArray]);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-[550px] bg-background">
            {/* Header */}
            <div className="p-6 border-b border-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold tracking-tight">
                            {t("title")}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <Avatar className="h-8 w-8 shrink-0">
                                {message.role === "assistant" ? (
                                    <div className="h-full w-full bg-primary/5 flex items-center justify-center text-primary">
                                        <Bot className="h-4 w-4" />
                                    </div>
                                ) : (
                                    <div className="h-full w-full bg-primary flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                                        {t("you").charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </Avatar>
                            <div
                                className={`space-y-2 ${message.role === "user" ? "items-end text-right" : "items-start"}`}
                            >
                                <div
                                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                                            : "bg-primary/5 text-foreground rounded-tl-none"
                                    }`}
                                >
                                    <div>
                                        {message.role === "assistant"
                                            ? renderMarkdown(message.content)
                                            : message.content}
                                    </div>
                                </div>
                                {message.attachments &&
                                    message.attachments.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {message.attachments.map(
                                                (attachment, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl overflow-hidden border border-primary/10 max-w-[200px]"
                                                    >
                                                        {attachment.type ===
                                                        "image" ? (
                                                            <Image
                                                                src={
                                                                    attachment.url ||
                                                                    "/placeholder.svg"
                                                                }
                                                                alt="Attachment"
                                                                width={200}
                                                                height={150}
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <video
                                                                src={
                                                                    attachment.url
                                                                }
                                                                controls
                                                                className="w-full"
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[85%]">
                            <Avatar className="h-8 w-8 shrink-0">
                                <div className="h-full w-full bg-primary/5 flex items-center justify-center text-primary">
                                    <Bot className="h-4 w-4" />
                                </div>
                            </Avatar>
                            <div className="bg-primary/5 px-4 py-3 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1.5">
                                    <span
                                        className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                    />
                                    <span
                                        className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                    />
                                    <span
                                        className="w-1.5 h-1.5 bg-primary/20 rounded-full animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-primary/5 bg-background/50 backdrop-blur-sm">
                {attachments.length > 0 && (
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                        {attachments.map((file, index) => (
                            <div
                                key={index}
                                className="px-3 py-1.5 bg-primary/5 rounded-full text-[10px] font-bold flex items-center gap-2 border border-primary/10 shrink-0"
                            >
                                {file.type.startsWith("image/") ? (
                                    <ImageIcon size={12} />
                                ) : (
                                    <Video size={12} />
                                )}
                                <span className="opacity-60">
                                    {file.name.substring(0, 10)}...
                                </span>
                                <button
                                    onClick={() =>
                                        setAttachments((prev) =>
                                            prev.filter((_, i) => i !== index)
                                        )
                                    }
                                    className="hover:text-primary transition-colors"
                                    aria-label={`Remove ${file.name}`}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="relative flex items-center gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        aria-label={t("attachFile")}
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*,video/*"
                        className="hidden"
                        multiple
                    />
                    <Input
                        placeholder={t("placeholder")}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" &&
                            !e.shiftKey &&
                            (e.preventDefault(), handleSendMessage())
                        }
                        className="h-12 border-primary/5 bg-primary/[0.02] rounded-xl focus-visible:ring-primary/20"
                    />
                    <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={
                            (!input.trim() && attachments.length === 0) ||
                            isLoading
                        }
                        className="h-12 w-12 rounded-xl shrink-0 transition-transform active:scale-90"
                        aria-label={t("sendMessage")}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
