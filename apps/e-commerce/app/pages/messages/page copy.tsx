"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "user" | "other";
  read: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");

  // Mock data - replace with your actual data
  const chats: Chat[] = [
    {
      id: "1",
      name: "John Doe",
      lastMessage: "Hey, is the product still available?",
      timestamp: "2 min ago",
      unread: 2,
      avatar: "/avatars/john.jpg",
      online: true,
    },
    // Add more chat items
  ];

  const messages: Message[] = [
    {
      id: "1",
      content: "Hi, I'm interested in your product",
      timestamp: "10:30 AM",
      sender: "other",
      read: true,
    },
    {
      id: "2",
      content: "Yes, it's still available! Would you like more details?",
      timestamp: "10:32 AM",
      sender: "user",
      read: true,
    },
    // Add more messages
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Add your message sending logic here
    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-6rem)]">
      <div className="grid grid-cols-12 gap-4 h-full">
        {/* Chat List */}
        <Card className="col-span-4 p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <span className="text-sm text-gray-500">(2 unread)</span>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>

          {/* <ScrollArea className="flex-1"> */}
          {chats.map((chat) => (
            <div key={chat.id}>
              <button
                onClick={() => setActiveChat(chat.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeChat === chat.id ? "bg-pink-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </button>
              <Separator className="my-2" />
            </div>
          ))}
          {/* </ScrollArea> */}
        </Card>

        {/* Chat Window */}
        <Card className="col-span-8 p-4 h-full flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Image
                    src="/avatars/john.jpg"
                    alt="John Doe"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <span className="text-sm text-green-500">Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              {/* <ScrollArea className="flex-1 py-4"> */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-pink-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>{message.content}</p>
                      <span
                        className={`text-xs ${
                          message.sender === "user"
                            ? "text-pink-100"
                            : "text-gray-500"
                        } block mt-1`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* </ScrollArea> */}

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                >
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" className="bg-pink-500 hover:bg-pink-600">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
