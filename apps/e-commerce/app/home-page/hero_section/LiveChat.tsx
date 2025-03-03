"use client";
import { Card } from "@/components/ui/card";
import { RootState } from "@/redux/store";
import { MessageCircleIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function LiveChat() {
  const [showChat, setShowChat] = useState(false);
  const { currentUser, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello! ${
        isAuthenticated === true ? currentUser?.name.split(" ")[0] : ""
      } How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    (messagesEndRef.current as any)?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsTyping(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Sorry, an error occurred. Try again later!" },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div
      className={`fixed bottom-5 z-50 right-5 ${showChat ? "w-80" : "w-52"}`}
    >
      {showChat && (
        <div className="w-80 p-4 bg-white shadow-2xl rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-bold flex items-center text-gray-800 dark:text-gray-200">
            <FaComments className="mr-2 text-blue-500" /> AI ChatBot
          </h3>
          <div className="h-60 overflow-y-auto p-3 border rounded-md bg-gray-50 dark:bg-gray-700 my-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 text-sm rounded-md max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-blue-100 text-blue-900 self-start dark:bg-blue-800 dark:text-white"
                    : "bg-green-100 text-green-900 self-end dark:bg-green-800 dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping === true && (
              <div className="bg-blue-100 flex items-center justify-center h-[21px] max-w-[40%] rounded-full px-3">
                <span className="loader"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center border rounded-md p-2 bg-gray-100 dark:bg-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 text-sm border-none bg-transparent focus:outline-none text-gray-800 dark:text-gray-200"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
      <Card
        className="flex justify-center items-center gap-3 cursor-pointer w-full p-4 border bg-white shadow-lg rounded-xl dark:bg-gray-800 dark:border-gray-700"
        onClick={() => setShowChat(!showChat)}
      >
        <MessageCircleIcon size={21} className="text-blue-500" />
        <p className="text-gray-800 dark:text-gray-200">Live Chat</p>
      </Card>
    </div>
  );
}
