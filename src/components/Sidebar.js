import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import {addToChatHistory, setCurrentActiveChatId} from "../utils/chatSlice";

// Helper to determine if a chat is from Today, Yesterday, or a specific date
const getLabelForChat = (timestamp) => {
    const chatDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Format dates without time for comparison
    const isToday = chatDate.toDateString() === today.toDateString();
    const isYesterday = chatDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    // Fallback to formatted date (e.g., November 25, 2023)
    return chatDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setNewChat }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const {currentActiveChatId, chatHistory} = useSelector((state) => state.chat);
    const location = useLocation();


    // Group chats by relative labels (Today, Yesterday, or date)
    const groupedChats = chatHistory.reduce((acc, chat) => {
        const label = getLabelForChat(chat.timestamp); // Get relative day label
        if (!acc[label]) acc[label] = [];
        acc[label].push(chat);
        return acc;
    }, {});

    const handleNewChat = () => {
        if (!isSidebarOpen) setIsSidebarOpen(true);
        const newChat = { id: chatHistory.length + 1, timestamp: Date.now(), messages: [] };
        dispatch(addToChatHistory(newChat));
        dispatch(setCurrentActiveChatId(newChat.id));
        setNewChat(true);
        if (location.pathname === "/metadata") {
            navigate("/browse");
        }
    };

    const navigateToMetadata = () => {
        if (!isSidebarOpen) setIsSidebarOpen(true);
        navigate("/metadata");
    };

    const handleSignOut = () => {
        localStorage.removeItem("authUser");
        dispatch(removeUser());
        navigate("/");
    };

    const handleChatClick = (chat) => {
        dispatch(setCurrentActiveChatId(chat.id));
        console.log("Opening chat:", chat);
    };

    return (
        <div
            className={`${
                isSidebarOpen ? "w-64" : "w-20"
            } h-screen bg-gradient-to-b from-purple-900 to-gray-900 p-4 shadow-lg flex flex-col justify-between transition-all duration-300 text-white`}
        >
            {/* Sidebar Header Section */}
            <div>
                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-purple-300 mb-4 bg-gray-800 rounded-full p-2 hover:bg-gray-700 shadow-md transition"
                >
                    {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button>

                {/* New Chat Button */}
                <button
                    onClick={handleNewChat}
                    className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-500 transition text-white font-semibold rounded-lg py-2 mb-6"
                >
                    <FaPlus className="mr-2" />
                    {isSidebarOpen && "New Chat"}
                </button>

                {/* Title Section */}
                {isSidebarOpen && (
                    <h1 className="text-lg font-bold text-center mb-6">
                        Just in Time <br />
                        <span className="text-sm font-medium text-purple-300">A SQL to Text GenAI Solution</span>
                    </h1>
                )}
            </div>

            {/* Chat History Section */}
            {
                isSidebarOpen && <div className="flex-grow overflow-y-auto">
                    {Object.keys(groupedChats).map((label) => (
                        <div key={label} className="mb-6">
                            {/* Relative Date Label (Today, Yesterday, or Date) */}
                            <div className="text-gray-400 text-sm font-semibold mb-2">{label}</div>
                            {/* Chats of the Day */}
                            {groupedChats[label].map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => handleChatClick(chat)}
                                    className={`cursor-pointer p-3 rounded-lg mb-2 transition flex items-center ${
                                        currentActiveChatId === chat.id
                                            ? "border-2 border-purple-500 text-white bg-gray-800 font-semibold shadow-lg"
                                            : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                    }`}
                                >
                                    <span className="truncate">{chat.messages[0]?.text.slice(0, 20) || `Chat ${chat.id}`}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            }

            {/* Sidebar Footer Section */}
            <div>
                {/* User Profile Section */}
                {isSidebarOpen && user && (
                    <div className="bg-gray-800 rounded-lg p-4 shadow-md mb-6 text-center transition hover:bg-gray-700">
                        <img
                            src={user.photoURL || "https://via.placeholder.com/50"}
                            alt="Profile"
                            className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-purple-500"
                        />
                        <h2 className="text-lg font-semibold text-white">{user.displayName || "Anonymous User"}</h2>
                        <p className="text-sm text-purple-300">{user.email || "Email not available"}</p>
                        <p className="text-sm text-gray-400 mt-1">Role: Standard User</p>
                    </div>
                )}

                {/* Metadata Page Button */}
                {isSidebarOpen && (
                    <button
                        onClick={navigateToMetadata}
                        className="w-full bg-gray-800 hover:bg-gray-700 transition text-purple-300 font-semibold rounded-lg py-2 mb-2"
                    >
                        Metadata Page
                    </button>
                )}

                {/* Sign Out Button */}
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 transition text-white font-semibold rounded-lg py-2"
                >
                    <FaSignOutAlt className="mr-2" />
                    {isSidebarOpen && "Sign Out"}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;