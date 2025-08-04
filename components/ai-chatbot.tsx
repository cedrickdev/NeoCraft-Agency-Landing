"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bot, Send, ImageIcon, Paperclip, Video } from "lucide-react";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  attachments?: {
    type: "image" | "video";
    url: string;
  }[];
};

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Bonjour et bienvenue chez NeoCraft. Je suis NeoBot, votre assistant virtuel dédié. Comment puis-je vous aider aujourd’hui ?",
      role: "assistant",
    },
  ]);
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() && attachments.length === 0) return;

    // Création du message utilisateur
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      attachments:
        attachments.length > 0
          ? attachments.map((file) => ({
              type: file.type.startsWith("image/") ? "image" : "video",
              url: URL.createObjectURL(file),
            }))
          : undefined,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setAttachments([]);
    setIsLoading(true); // <-- Ajout ici

    // Appel à l'API backend
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_NEOCHAT_BASE_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await response.json();
      console.log(data);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer.result,
        role: "assistant",
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: "Erreur lors de la connexion au serveur.",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false); // <-- Ajout ici
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...filesArray]);
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="w-full max-w-md mx-auto h-[600px] flex flex-col">
      <CardHeader className=" text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <Bot className="text-gray-900 dark:text-white" size={20} />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            NeoChat
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-2 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar className="h-8 w-8">
                {message.role === "assistant" ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <div className="h-full w-full bg-primary dark:bg-emerald-800 rounded-full flex items-center justify-center text-primary-foreground">
                    U
                  </div>
                )}
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground dark:bg-emerald-800"
                    : "bg-muted"
                }`}
              >
                <p>
                  {typeof message.content === "string"
                    ? message.content
                    : JSON.stringify(message.content)}
                </p>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment, index) =>
                      attachment.type === "image" ? (
                        <img
                          key={index}
                          src={attachment.url || "/placeholder.svg"}
                          alt="Attachment"
                          className="max-w-full rounded-md"
                        />
                      ) : (
                        <video
                          key={index}
                          src={attachment.url}
                          controls
                          className="max-w-full rounded-md"
                        />
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
            <div className="flex gap-2 max-w-[80%] flex-row">
              <Avatar className="h-8 w-8">
                <Bot className="h-5 w-5" />
              </Avatar>
              <div className="rounded-lg p-3 bg-muted">
                <p>Un instant...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="border-t p-3">
        {attachments.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="bg-muted rounded px-2 py-1 text-xs flex items-center gap-1"
              >
                {file.type.startsWith("image/") ? (
                  <ImageIcon size={12} />
                ) : (
                  <Video size={12} />
                )}
                {file.name.length > 15
                  ? `${file.name.substring(0, 15)}...`
                  : file.name}
              </div>
            ))}
          </div>
        )}
        <div className="flex w-full gap-2">
          <Input
            placeholder="Saisissez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1 text-gray-900 dark:text-gray-100"
          />
          <Button
            className="dark:bg-gray-800"
            onClick={handleSendMessage}
            size="icon"
            type="button"
          >
            <Send className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            className="hidden"
            multiple
          />
        </div>
      </CardFooter>
    </Card>
  );
}
