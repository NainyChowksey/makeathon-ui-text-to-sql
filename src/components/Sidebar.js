import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FaChevronLeft, FaChevronRight, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import {useLocation, useNavigate} from 'react-router-dom';
import {removeUser} from "../utils/userSlice";
import {addToChatHistory} from "../utils/chatSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setNewChat }) => {
    const navigate = useNavigate(); // Navigation hook
    const dispatch = useDispatch();

    // Get user details from Redux store
    const user = useSelector((state) => state.user);
    const chatHistory = useSelector((state) => state.chat.chatHistory);
    const location = useLocation()


    const [activeChat, setActiveChat] = useState(null); // Track the currently active chat

    // Creating a new chat and making it active
    const handleNewChat = () => {
        if (!isSidebarOpen) setIsSidebarOpen(true); // Open sidebar if closed

        // Create a new chat
        const newChat = { id: chatHistory.length + 1, title: `New Chat ${chatHistory.length + 1}`, timestamp: Date.now() };

        // Add chat to history and set it as active
        dispatch(addToChatHistory(newChat))
        setActiveChat(newChat.id); // Automatically make the new chat active
        setNewChat(true); // Optional function passed as props
        if (location.pathname === '/metadata') {
            navigate('/browse');

        }
    };

    const navigateToMetadata = () => {
        if (!isSidebarOpen) setIsSidebarOpen(true);
        navigate('/metadata'); // Navigate to Metadata page
    };

    const handleSignOut = () => {
        console.log('Sign out logic');
        localStorage.removeItem('authUser')
        dispatch(removeUser())
        navigate('/'); // Redirect to login after sign-out
    };

    // Handling chat selection
    const handleChatClick = (chat) => {
        setActiveChat(chat.id); // Mark the clicked chat as active
        console.log('Opening chat:', chat.title);
    };

    return (
        <div
            className={`${
                isSidebarOpen ? 'w-64' : 'w-20'
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
                    {isSidebarOpen && 'New Chat'}
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
            <div className="flex-grow overflow-y-auto">
                {chatHistory.map((chat) => (
                    <div
                        key={chat.id}
                        onClick={() => handleChatClick(chat)}
                        className={`cursor-pointer p-3 rounded-lg mb-2 transition flex items-center ${
                            isSidebarOpen ? 'text-gray-300 hover:bg-gray-700' : 'bg-gray-500'
                        } ${
                            activeChat === chat.id
                                ? 'border-2 border-purple-500 text-white bg-gray-800  font-semibold shadow-lg'
                                : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                    >
                        {/* Display chat title */}
                        {isSidebarOpen ? (
                            <span className="truncate">{chat.title}</span>
                        ) : (
                            <div className="w-full h-2 bg-gray-500 rounded"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Sidebar Footer Section */}
            <div>
                {/* User Profile Section */}
                {isSidebarOpen && user && (
                    <div className="bg-gray-800 rounded-lg p-4 shadow-md mb-6 text-center transition hover:bg-gray-700">
                        <img
                            src={user.photoURL || 'https://via.placeholder.com/50'}
                            alt="Profile"
                            className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-purple-500"
                        />
                        <h2 className="text-lg font-semibold text-white">{user.displayName || 'Anonymous User'}</h2>
                        <p className="text-sm text-purple-300">{user.email || 'Email not available'}</p>
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
                    {isSidebarOpen && 'Sign Out'}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;