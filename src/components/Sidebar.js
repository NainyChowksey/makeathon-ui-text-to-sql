import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight, FaPlus, FaSignOutAlt, FaBookmark } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { addToChatHistory, setCurrentActiveChatId, setActiveBookmarkId, setBookmarks, initBookmarks } from "../utils/chatSlice";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setNewChat }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const { currentActiveChatId, chatHistory, bookmarks } = useSelector((state) => state.chat); // Fetch bookmarks as well
    const role = useSelector((state) => state.userConfig.role);
    
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredChats = chatHistory.filter((chat) =>
        chat.messages[0]?.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {

        if (user?.uid) {

            const url =
                "https://5b38-2409-40f2-200b-6a6f-f5c2-dc87-cb25-3aea.ngrok-free.app/get-bookmarked";
                // "http://localhost:8000/metadata"
            const data = {
                uid: user.uid,
            };

            const jsonData = JSON.stringify(data);

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            fetch(url, {
                method: "POST",
                headers: headers,
                body: jsonData,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((responseData) => {
                   
                    dispatch(initBookmarks(responseData?.question_answer_pairs))

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [user?.uid])


    const groupedChats = filteredChats.reduce((acc, chat) => {
        const label = (chat.timestamp);
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
        if (location.pathname === "/metadata") navigate("/browse");
    };

    const handleChatClick = (chat) => {
        dispatch(setCurrentActiveChatId(chat.id));
    };

    const handleBookmarkClick = (bookmark, id) => {
        dispatch(setActiveBookmarkId(id)); // Dispatch the active bookmark ID
    };

    const handleSignOut = () => {
        localStorage.removeItem("authUser");
        dispatch(removeUser());
        dispatch(setCurrentActiveChatId(null));
        navigate("/");
    };

    const navigateToMetadata = () => {
        if (!isSidebarOpen) setIsSidebarOpen(true);
        navigate("/metadata");
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div
            className={`${
                isSidebarOpen ? "w-64" : "w-20"
            } h-screen bg-gradient-to-b from-purple-900 to-gray-900 p-4 shadow-lg flex flex-col justify-between transition-all duration-300 text-white`}
        >
            {/* Sidebar Header Section */}
            <div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-purple-300 mb-4 bg-gray-800 rounded-full p-2 hover:bg-gray-700 shadow-md transition"
                >
                    {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                </button>

                <button
                    onClick={handleNewChat}
                    className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-500 transition text-white font-semibold rounded-lg py-2 mb-6"
                >
                    <FaPlus className="mr-2" />
                    {isSidebarOpen && "New Chat"}
                </button>

                {isSidebarOpen && (
                    <h1 className="text-lg font-bold text-center mb-6">
                        Just in Time <br />
                        <span className="text-sm font-medium text-purple-300">A SQL to Text GenAI Solution</span>
                    </h1>
                )}
            </div>

            {/* Search Bar */}
            {isSidebarOpen && (
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search chats..."
                        className="w-full bg-gray-800 text-purple-300 placeholder-purple-400 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            )}

            {/* Chat History Section */}
            {isSidebarOpen && (
                <div className="flex-grow overflow-y-auto">
                    <div className="text-gray-400 text-sm font-semibold mb-2">Previous Chats</div>
                    {Object.keys(groupedChats).map((label) => (
                        <div key={label} className="mb-2">
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
                                    <span className="truncate">
                                        {chat.messages[0]?.text.length > 20
                                            ? `${chat.messages[0]?.text.slice(0, 20)}...`
                                            : chat.messages[0]?.text || `Chat ${chat.id}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Bookmarked Questions Section */}
                    <div className="text-gray-400 text-sm font-semibold mt-6 mb-2">Bookmarked Questions</div>
                    <div className="mb-2">
                        {bookmarks.map((bookmark, index) => (
                            <div
                                key={index}
                                onClick={() => handleBookmarkClick(bookmark, index)} // Use index as unique ID for now
                                className={`cursor-pointer p-3 rounded-lg mb-2 transition flex items-center ${
                                    // Add Bookmark CSS styles here
                                    "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                }`}
                            >
                                <FaBookmark className="text-yellow-500 mr-2" />
                                <span className="truncate">
                                    {bookmark.question.length > 20
                                        ? `${bookmark.question.slice(0, 20)}...`
                                        : bookmark.question}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sidebar Footer Section */}
            <div>
                {isSidebarOpen && user && (
                    <div className="bg-gray-800 rounded-lg p-3 shadow-md mb-4 flex items-center hover:bg-gray-700 transition">
                        <div className="w-12 h-12 rounded-full border border-purple-500 overflow-hidden bg-gray-700 mr-3 flex-shrink-0">
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-sm font-semibold text-white truncate">{user.displayName || "User"}</h2>
                            <p className="text-xs text-purple-300 truncate">{user.email || "No email"}</p>
                            <p className="text-xs text-gray-400 mt-1 truncate">Role: {role?.toUpperCase()}</p>
                        </div>
                    </div>
                )}

                <button
                    onClick={navigateToMetadata}
                    className="w-full bg-gray-800 hover:bg-gray-700 transition text-purple-300 font-semibold rounded-lg py-2 mb-2"
                >
                    Metadata Page
                </button>

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