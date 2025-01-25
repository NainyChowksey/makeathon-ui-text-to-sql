import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chatSlice",
    initialState: {
        activeBookmarkId: null,
        bookmarks: [],
        chatHistory:[
            {
                id: 1,
                timestamp: new Date().setDate(new Date().getDate() - 7), // 7 days ago
                messages: [
                    { text: "What is SQL?", sender: "user" },
                    { text: "SQL stands for Structured Query Language. It is used to interact with relational databases.", sender: "bot" },
                    { text: "For example, here is a query to retrieve all rows from a table named 'users':", sender: "bot" },
                    { text: "SELECT * FROM users;", sender: "bot", sql: true },
                ],
            },
            {
                id: 2,
                timestamp: new Date().setDate(new Date().getDate() - 5), // 5 days ago
                messages: [
                    { text: "How do I filter data in SQL?", sender: "user" },
                    { text: "You can use the WHERE clause to filter rows based on a condition.", sender: "bot" },
                    { text: "For instance, if you want to find users with age greater than 30:", sender: "bot" },
                    { text: "SELECT * FROM users WHERE age > 30;", sender: "bot", sql: true },
                ],
            },
            {
                id: 3,
                timestamp: new Date().setDate(new Date().getDate() - 3), // 3 days ago
                messages: [
                    { text: "How can I insert data into a table?", sender: "user" },
                    { text: "To insert data, you use the INSERT INTO statement followed by the table name and the values to be added.", sender: "bot" },
                    { text: "Here's an example of adding a new user to the 'users' table:", sender: "bot" },
                    { text: "INSERT INTO users (name, age, email) VALUES ('John Doe', 25, 'john.doe@example.com');", sender: "bot", sql: true },
                ],
            },
            {
                id: 4,
                timestamp: new Date().setDate(new Date().getDate() - 2), // 2 days ago
                messages: [
                    { text: "How do I update data in SQL?", sender: "user" },
                    { text: "You can use the UPDATE statement to modify existing records in a table.", sender: "bot" },
                    { text: "Here is an example of updating the age of a user named 'John Doe':", sender: "bot" },
                    { text: "UPDATE users SET age = 26 WHERE name = 'John Doe';", sender: "bot", sql: true },
                ],
            },
            {
                id: 5,
                timestamp: new Date().setDate(new Date().getDate() - 1), // 1 day ago
                messages: [
                    { text: "How do I delete data in SQL?", sender: "user" },
                    { text: "The DELETE statement is used to remove rows from a table. You use the WHERE clause to specify which rows to delete.", sender: "bot" },
                    { text: "Here's an example of deleting a user named 'John Doe':", sender: "bot" },
                    { text: "DELETE FROM users WHERE name = 'John Doe';", sender: "bot", sql: true },
                ],
            },
            {
                id: 6,
                timestamp: new Date(), // Today
                messages: [
                    { text: "How can I create a table in SQL?", sender: "user" },
                    { text: "You can create a table using the CREATE TABLE statement, which defines its structure (columns and their types).", sender: "bot" },
                    { text: "Here's how to create a 'users' table:", sender: "bot" },
                    {
                        text: `
                            CREATE TABLE users (
                                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                                   name VARCHAR(255) NOT NULL,
                                                   age INT,
                                                   email VARCHAR(255) UNIQUE
                            );`,
                        sender: "bot",
                        sql: true,
                    },
                ],
            },
            {
                id: 7,
                timestamp: new Date().setDate(new Date().getDate() + 1), // 1 day in the future
                messages: [
                    { text: "How can I join tables in SQL?", sender: "user" },
                    { text: "You can use the JOIN clause to combine rows from two or more tables based on a related column.", sender: "bot" },
                    { text: "For example, to get orders along with user details from 'orders' and 'users' tables:", sender: "bot" },
                    {
                        text: `
                            SELECT orders.id, orders.date, users.name, users.email
                            FROM orders
                                     INNER JOIN users ON orders.user_id = users.id;
                        `,
                        sender: "bot",
                        sql: true,
                    },
                ],
            },
        ],
        currentChat: null, // Holds chat object
        currentActiveChatId: null, // Tracks the active chat ID
    },
    reducers: {
        // Add a new chat and sort by most recent
        addToChatHistory: (state, action) => {
            state.chatHistory.push(action.payload);
            state.chatHistory.sort((a, b) => b.id - a.id);
        },

       // Set the chat to be active based on chat object
        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        updateChatHistory: (state, action) => {
            const chatIndex = state.chatHistory.findIndex((chat) => chat.id === state.currentActiveChatId);

            if (chatIndex !== -1) {
                // Push the new message into the specific chat's messages array
                state.chatHistory[chatIndex].messages.push(action.payload);
            } else {
                console.error(`Chat not found.`);
            }
        },
        // Set the active chat ID (new reducer)
        setCurrentActiveChatId: (state, action) => {
            state.currentActiveChatId = action.payload;
        },

        setChatHistory: (state, action) => {
            state.chatHistory = action.payload;
        },
        setActiveBookmarkId: (state, action) => {
            state.activeBookmarkId = action.payload;
        },
        setBookmarks: (state, action) => {
            state.bookmarks.push(action.payload);
        },
        initBookmarks: (state, action) => {
            state.bookmarks=action.payload;
        }
    },
});

export const {setBookmarks, setActiveBookmarkId, setChatHistory, updateChatHistory, addToChatHistory, setCurrentChat, setCurrentActiveChatId, initBookmarks } = chatSlice.actions;

export default chatSlice.reducer;