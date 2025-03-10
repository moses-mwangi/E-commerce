"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  Phone,
  Mail,
  Search,
  MoreVertical,
  User,
  Circle,
} from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "admin";
  timestamp: string;
}

interface Chat {
  id: number;
  user: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  online: boolean;
}

export default function MessagesPage() {
  const [chats] = useState<Chat[]>([
    {
      id: 1,
      user: "John Doe",
      avatar: "JD",
      lastMessage: "When will my order arrive?",
      time: "2 mins ago",
      unread: true,
      online: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      avatar: "JS",
      lastMessage: "Thank you for your help!",
      time: "1 hour ago",
      unread: false,
      online: false,
    },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      content: "When will my order arrive?",
      sender: "user",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      content: "Your order will arrive tomorrow between 2-4 PM.",
      sender: "admin",
      timestamp: "2:31 PM",
    },
    {
      id: 3,
      content: "Thank you for the quick response!",
      sender: "user",
      timestamp: "2:32 PM",
    },
  ]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar - Chat List */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                chat.unread ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <Circle className="w-3 h-3 bg-green-500 rounded-full absolute -right-0 -bottom-0 ring-2 ring-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium truncate">{chat.user}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
                JD
              </div>
              <Circle className="w-3 h-3 bg-green-500 rounded-full absolute -right-0 -bottom-0 ring-2 ring-white" />
            </div>
            <div>
              <h2 className="font-medium">John Doe</h2>
              <span className="text-sm text-green-500">Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mail className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end space-x-2 ${
                  message.sender === "admin" ? "justify-end" : ""
                }`}
              >
                {message.sender === "user" && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                    JD
                  </div>
                )}
                <div
                  className={`max-w-md rounded-lg p-3 ${
                    message.sender === "admin"
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  <p>{message.content}</p>
                  <span
                    className={`text-xs mt-1 ${
                      message.sender === "admin"
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button className="bg-primary">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   MessageCircle,
//   Send,
//   Phone,
//   Mail,
//   Search,
//   MoreVertical,
//   User,
// } from "lucide-react";

// export default function MessagesPage() {
//   const [messages] = useState([
//     {
//       id: 1,
//       user: "John Doe",
//       avatar: "JD",
//       lastMessage: "When will my order arrive?",
//       time: "2 mins ago",
//       unread: true,
//     },
//     {
//       id: 2,
//       user: "Jane Smith",
//       avatar: "JS",
//       lastMessage: "Thank you for your help!",
//       time: "1 hour ago",
//       unread: false,
//     },
//   ]);

//   return (
//     <div className="flex h-[calc(100vh-4rem)]">
//       {/* Sidebar */}
//       <div className="w-80 border-r bg-white">
//         <div className="p-4 border-b">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <input
//               type="text"
//               placeholder="Search messages..."
//               className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
//             />
//           </div>
//         </div>

//         <div className="overflow-y-auto h-full">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
//                 message.unread ? "bg-blue-50" : ""
//               }`}
//             >
//               <div className="flex items-center space-x-3">
//                 <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
//                   {message.avatar}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-medium truncate">{message.user}</h3>
//                     <span className="text-xs text-gray-500">
//                       {message.time}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-600 truncate">
//                     {message.lastMessage}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col bg-gray-50">
//         <div className="p-4 bg-white border-b flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
//               JD
//             </div>
//             <div>
//               <h2 className="font-medium">John Doe</h2>
//               <span className="text-sm text-green-500">Online</span>
//             </div>
//           </div>
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="sm">
//               <Phone className="w-4 h-4" />
//             </Button>
//             <Button variant="ghost" size="sm">
//               <Mail className="w-4 h-4" />
//             </Button>
//             <Button variant="ghost" size="sm">
//               <MoreVertical className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4">
//           {/* Chat messages will go here */}
//           <div className="space-y-4">
//             <div className="flex items-end space-x-2">
//               <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
//                 JD
//               </div>
//               <div className="max-w-md bg-white rounded-lg p-3 shadow-sm">
//                 <p>When will my order arrive?</p>
//                 <span className="text-xs text-gray-500 mt-1">2:30 PM</span>
//               </div>
//             </div>
//             <div className="flex items-end justify-end space-x-2">
//               <div className="max-w-md bg-blue-600 text-white rounded-lg p-3 shadow-sm">
//                 <p>Your order will arrive tomorrow between 2-4 PM.</p>
//                 <span className="text-xs text-blue-100 mt-1">2:31 PM</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 bg-white border-t">
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
//             />
//             <Button className="bg-primary">
//               <Send className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
