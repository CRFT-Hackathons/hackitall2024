"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/navbar";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

export default function Page() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: "Petrisor Huzum",
      content: "Hello, I would love to help you with your groceries.",
      timestamp: "2 hours ago",
      avatar: "",
    },
    {
      id: 2,
      sender: "Marian Popescu",
      content:
        "Hi. I see that you would be interested in giving a hand to the local library. I am the librarian and I would be happy to discuss this with you.",
      timestamp: "1 day ago",
      avatar: "",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-16">
        {/* Left sidebar */}
        <div className="w-1/3 border-r">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <Input placeholder="Search messages..." className="mb-4" />
            <ScrollArea className="h-[calc(100vh-140px)]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{message.sender}</h3>
                        <span className="text-sm text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {message.content}
                      </p>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 border-0">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-280px)] p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-4 mb-4"
                  >
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{message.sender}</h3>
                        <span className="text-sm text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-gray-600">{message.content}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Message input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
