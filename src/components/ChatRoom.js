import React, { useState, useEffect, useRef } from "react";

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add the user's message to the messages state
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMessage]);

    const url = "http://localhost:8000/chat";

    const data = {
      chatbot: [["Hello", "Hi there!"]],
      message: input,
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
        console.log(responseData?.chatbot?.[1]?.[1]);
        const botReply = {
            id: messages.length + 2,
            sender: "bot",
            text: responseData?.chatbot?.[1]?.[1],
          };
          setMessages((prev) => [...prev, botReply]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // Add bot reply after a short delay

    setInput(""); // Clear the input field
  };

  // Scroll to bottom only if user is already at the bottom
  useEffect(() => {
    if (
      messagesContainerRef.current &&
      messagesContainerRef.current.scrollHeight ===
        messagesContainerRef.current.scrollTop +
          messagesContainerRef.current.clientHeight
    ) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen bg-fuchsia-200 bg-opacity-70">
      {/* Message Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto flex justify-center mt-10"
      >
        <div className="w-full max-w-4xl">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow text-sm ${
                  message.sender === "user"
                    ? "bg-fuchsia-400 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl p-2">
        <form
          className="bg-fuchsia-100 h-16 w-full rounded-xl shadow-md flex items-center p-3"
          onSubmit={handleSend}
        >
          <input
            className="w-full px-4 py-2 border border-fuchsia-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            placeholder="Ask me Questions?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 bg-fuchsia-400 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
