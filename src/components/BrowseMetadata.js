import React, { useState } from 'react';
import GptChat from './GptChat';
import Sidebar from './Sidebar';
import ChatRoom from "./ChatRoom";
import Metadata from "./Metadata";
import {ReactFlowProvider} from "@xyflow/react";

const Browse = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newChat, setNewChat] = useState(false);

  return (
      <ReactFlowProvider>

      <div className="flex h-screen">
        {/* Sidebar: Adjust width dynamically based on state */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} setNewChat={setNewChat} />
        </div>

        {/* GptChat: Takes the remaining space when Sidebar is open, full width when closed */}
        <div className={`flex-grow transition-all duration-300`}>
          <Metadata />
        </div>
      </div>
      </ReactFlowProvider>
  );
};

export default Browse;