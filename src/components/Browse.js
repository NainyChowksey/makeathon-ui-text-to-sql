import React, { useState } from 'react';
import GptChat from './GptChat';
import Sidebar from './Sidebar';
import ChatRoom from "./ChatRoom";

const Browse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newChat, setNewChat] = useState(false);
    // Chat history and active chat state

  return (
      <div className="flex h-screen">
        {/* Sidebar: Adjust width dynamically based on state */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setNewChat={setNewChat} />
        </div>

        {/* GptChat: Takes the remaining space when Sidebar is open, full width when closed */}
        <div className={`flex-grow transition-all duration-300`}>
          <ChatRoom newChat={newChat} setNewChat={setNewChat}  />
        </div>
      </div>
  );
};

export default Browse;