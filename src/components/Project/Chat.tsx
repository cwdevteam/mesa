"use client";
import { ArrowRightIcon, FaceIcon } from "@radix-ui/react-icons";
import { useState, useRef, KeyboardEvent, FormEvent } from "react";

type ChatProps = {
  project?: any;
};

type Message = {
  sender: string;
  message: string;
  timestamp: Date;
};

const Chat = ({ project }: ChatProps) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<any>();
  const user = { username: "currentUser" }; // Mock user

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    // Add your logic to send the message
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as unknown as FormEvent);
    }
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow min-h-[37rem]">
      <div className="space-y-1.5 p-6 flex flex-row justify-center items-center"></div>
      <div
        className="px-4 py-8 h-[30rem] overflow-y-auto relative style={{ height: '400px' }}"
        ref={messageContainerRef}
      >
        <div className="flex flex-col gap-3">
          <div className="flex">
            <div className="flex flex-col w-full">
              {messages.map((msg: any, index: any) => (
                <div key={index} className="flex flex-col items-start">
                  <div
                    className={`flex w-full ${
                      msg.sender === user.username
                        ? "flex-col"
                        : "flex-row h-10"
                    }`}
                  >
                    <div
                      className={`flex break-words overflow-hidden ${
                        msg.sender === user.username
                          ? "flex-row justify-end w-full"
                          : msg.sender === "server"
                          ? "flex justify-center items-center w-full"
                          : "justify-start flex-row w-full"
                      }`}
                    >
                      {user.username !== msg.sender &&
                        msg.sender !== "server" && <p>{msg.sender}</p>}
                      <div
                        className={
                          msg.sender === user.username
                            ? "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground"
                            : msg.sender === "server"
                            ? "text-xs sm:text-sm lg:text-sm py-2 px-2 sm:py-3 sm:px-4 border overflow-hidden break-words rounded-md text-center flex justify-center items-center"
                            : "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mr-auto text-ellipsis bg-muted"
                        }
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      msg.sender === user.username
                        ? "flex justify-end w-full mb-4 pr-1"
                        : msg.sender === "server"
                        ? "flex justify-center items-center w-full"
                        : "flex justify-start w-full mb-4 pl-1"
                    }
                  >
                    <span className="text-gray-500 justify-end text-xs">
                      {new Date(msg.timestamp).toLocaleTimeString(
                        "en-US",
                        options
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex items-center p-6 pt-3">
        <div className="flex flex-row w-full">
          <div className="flex justify-center items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowEmojiPicker(!showEmojiPicker);
              }}
            >
              <FaceIcon />
            </button>
          </div>
          <form onSubmit={sendMessage} className="w-full">
            <div className="flex items-center justify-between">
              <textarea
                className="flex mx-4 h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1 resize-none"
                name="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
              />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
                type="submit"
              >
                <ArrowRightIcon />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
