import React from "react";

import { Icons } from "../Icons";
import { FaceIcon } from "@radix-ui/react-icons";

const Chat = () => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="space-y-1.5 p-6 flex flex-row justify-center items-center"></div>
      <div className="px-4 py-8 min-h-[20vh] overflow-y-auto relative"></div>
      <div className="flex items-center p-6 pt-3">
        <div className="flex flex-row w-full">
          <form className="w-full">
            <div className="flex items-center justify-between">
              <FaceIcon />
              <textarea
                className="flex mx-4 h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-1 resize-none"
                name="text"
                placeholder="Type your message..."
                rows={3}
              />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
                type="submit"
              >
                <Icons.arrow />
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
