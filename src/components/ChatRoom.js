import {useEffect, useRef, useState} from 'react';
import {FaArrowRight, FaRobot, FaClipboard, FaCheck} from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { format } from "sql-formatter";
import { dracula as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {addToChatHistory, setCurrentActiveChatId, updateChatHistory} from "../utils/chatSlice";

export default function ChatRoom({newChat, setNewChat}) {

  const dispatch = useDispatch()

  const [input, setInput] = useState('');
  const [copyStatus, setCopyStatus] = useState(null); // For copy button feedback
  const messagesEndRef = useRef(null);

  const chatHistory = useSelector((state) => state.chat.chatHistory);


  const currentActiveChatId = useSelector((state) => state.chat.currentActiveChatId);

  // Find messages for the currently active chat
  const activeChat = chatHistory.find((chat) => chat.id === currentActiveChatId);
  const messages = activeChat?.messages || [];


  const { displayName, uid } = useSelector((state) => state.user);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  useEffect(() => {
    if (newChat) {
      setNewChat(false);
    }
  }, [newChat])

  const commonQuestions = [
    'Generate an SQL query to fetch all employees from a company database sorted by salary in descending order.',
    'Write an SQL query to find customers who made purchases in the last 30 days.',
    'How can I optimize this SQL query for faster execution?',
    'Convert this text into an SQL query: "Show me the top 10 products by sales volume."',
    'What are database indexes, and how do they impact query performance?',
    'Generate SQL code to count users from each country in the database.',
  ];

  const generateBotResponse = (userMessage) => {
    let botText = "I'm sorry, I could not understand your query.";
    let botSQL = '';

    switch (userMessage.toLowerCase()) {
      case 'generate an sql query to fetch all employees from a company database sorted by salary in descending order.':
        botText = 'This query retrieves all employee records from the company database, sorting them by salary in descending order.';
        botSQL = `SELECT * FROM employees ORDER BY salary DESC;SELECT * FROM employees ORDER BY salary DESC;SELECT * FROM employees ORDER BY salary DESC;SELECT * FROM employees ORDER BY salary DESC;`;
        break;

      case 'write an sql query to find customers who made purchases in the last 30 days.':
        botText =
            'This query finds all customers who made purchases within the last 30 days based on the purchase timestamp.';
        botSQL = `SELECT customer_id, name FROM customers WHERE purchase_date >= NOW() - INTERVAL 30 DAY;`;
        break;

      case 'how can i optimize this sql query for faster execution?':
        botText =
            'To optimize a query, consider indexing commonly-used columns, avoiding SELECT *, and using EXPLAIN to analyze the query. For example, indexing eliminates full table scans.';
        break;

      case 'convert this text into an sql query: "show me the top 10 products by sales volume."':
        botText =
            'This query returns the top 10 products by sales volume from the products table, sorted in descending order of sales volume.';
        botSQL = `SELECT product_name, sales_volume FROM products ORDER BY sales_volume DESC LIMIT 10;`;
        break;

      case 'what are database indexes, and how do they impact query performance?':
        botText =
            'Indexes are used to speed up database queries by reducing the amount of data scanned when searching for rows. Proper indexing can significantly reduce query execution time but may increase storage requirements.';
        break;

      case 'generate sql code to count users from each country in the database.':
        botText = 'This query counts the number of users grouped by country from the users table.';
        botSQL = `SELECT country, COUNT(*) AS user_count FROM users GROUP BY country;`;
        break;

      default:
        botText = 'Let me try to interpret your request and help with a relevant SQL query.';
        botSQL = `-- Example SQL query based on your input. Refine this query as needed.`;
    }

    return { botText, botSQL };
  };

  const addMessageWithDelay = async (newMessages) => {
    for (const message of newMessages) {
      await new Promise((resolve) =>
          setTimeout(() => {
            dispatch(updateChatHistory(message))
            resolve();
          }, 500) // Adjust delay as needed
      );
    }
  };

  const extractData = async(response) => {
  
    const botTextMatch = response.match(/botText:\s(.*)\s*botSQL:/s);
    const botSQLMatch = response.match(/botSQL:\s(.*)/);
  
   
    const botText = botTextMatch ? botTextMatch[1].trim() : null;
    const botSQL = botSQLMatch ? botSQLMatch[1].trim() : null;

    console.log(botText, botSQL, "NAINY")

    const isSql = !botSQL?.includes("N/A")
  if(!isSql){
    await addMessageWithDelay([
      { text: botText, sender: 'bot' }
    ]);

  }
  else{
    await addMessageWithDelay([
      { text: botText, sender: 'bot' },
      { text: botSQL, sender: 'bot', sql: isSql },
    
    ]);

  }
  };
  

  const handleSubmit = async () => {
    if (input.trim()) {

      if (messages.length === 0) {
        const newChat = { id: chatHistory.length + 1, messages: [], timestamp: Date.now() }; // Create a unique ID
        dispatch(addToChatHistory(newChat));
        dispatch(setCurrentActiveChatId(newChat.id));
      }

      dispatch(updateChatHistory( { text: input, sender: 'user' }))

      
const url = 'https://5b38-2409-40f2-200b-6a6f-f5c2-dc87-cb25-3aea.ngrok-free.app/chat';
const data = {
  "uid": uid,
  "chatbot": [["Hi", "How are you?"]],
  "message": input
}

const jsonData = JSON.stringify(data);

const headers = new Headers();
headers.append('Content-Type', 'application/json');

fetch(url, {
  method: 'POST', 
  headers: headers,
  body: jsonData
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    
  }
  return response.json();
})
.then(responseData => {
  const { botText, botSQL } = extractData(responseData?.chatbot[1]?.[1]);

  console.log('Todo created successfully:', responseData);  
})
.catch(error => {
  console.error('Error:', error);
});




//const { botText, botSQL } = generateBotResponse(input);
      // Add bot responses with a delay for streaming
      // await addMessageWithDelay([
      //   { text: botText, sender: 'bot' },
      //   { text: botSQL, sender: 'bot', sql: true },
      // ]);

      setInput('');
    }
  };

  const handleCommonQuestionClick = async (question) => {

    const newChat = { id: chatHistory.length + 1, messages: [{ text: question, sender: 'user' }], timestamp: Date.now() }; // Create a unique ID
    dispatch(addToChatHistory(newChat));
    dispatch(setCurrentActiveChatId(newChat.id));



    // const { botText, botSQL } = generateBotResponse(question);

    // setMessages([...messages, { text: question, sender: 'user' }]);

   // const { botText, botSQL } = generateBotResponse(question);

    // Add bot responses with a delay for streaming
    // await addMessageWithDelay([
    //   { text: botText, sender: 'bot' },
    //   { text: botSQL, sender: 'bot', sql: true },
    // ]);
  };

  const handleCopyToClipboard = (sql) => {
    navigator.clipboard.writeText(sql);
    setCopyStatus(sql); // Temporarily set the copy status for this specific SQL
    setTimeout(() => setCopyStatus(null), 1000); // Reset after 1 second
  };
  const characterLimit = 1000; // Define character limit for the input box

  return (
      <div className="h-screen bg-gray-100 flex flex-col">
        {messages.length === 0 ? (
            // Welcome Screen
            <div className="flex-grow flex justify-center items-center p-6">
              <div className="w-full max-w-4xl">
                <h1 className="text-5xl font-extrabold text-gray-900">
                  Hi there,{' '}
                  <span className="bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                {displayName || 'Guest'}
              </span>
                </h1>
                <h2 className="text-xl font-medium text-gray-700 mt-4">
                  How can I assist you with text-to-SQL conversion today? Start by picking a prompt
                  below or type your own query.
                </h2>

                {/* Common Questions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {commonQuestions.map((question, index) => (
                      <button
                          key={index}
                          className="py-4 px-6 bg-purple-100 border border-purple-300 rounded-lg text-purple-800 text-sm md:text-base font-medium shadow hover:shadow-lg transition-all"
                          onClick={() => handleCommonQuestionClick(question)}
                      >
                        {question}
                      </button>
                  ))}
                </div>

                {/* Input Field */}
                <div className="relative w-full max-w-4xl mt-6">
                  <div className="bg-white shadow-md border rounded-full p-4 flex items-center">
                    <input
                        type="text"
                        placeholder="Ask anything about SQL or databases..."
                        className="flex-grow border-none outline-none text-gray-700 placeholder-gray-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <button
                        onClick={handleSubmit}
                        className="ml-4 bg-purple-500 text-white rounded-full p-3 hover:bg-purple-600 transition"
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
        ) : (
            // Chat Interface
            <div className="flex flex-col p-6 pb-0 bg-white h-full">
              <div className="space-y-4 flex-grow overflow-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start`}
                    >
                      {msg.sender === 'bot' && <FaRobot className="text-purple-500 mr-3 mt-1" />}
                      <div
                          className={`w-full max-w-4xl rounded-lg p-4 ${
                              msg.sender === 'user'
                                  ? 'bg-purple-500 text-white shadow-lg'
                                  : 'bg-gray-100 text-gray-800 shadow-md'
                          }`}
                      >
                        {msg.sql ? (
                            <div className="relative">
                              <SyntaxHighlighter
                                  language="sql"
                                  style={style}
                                  className="rounded-lg w-full"
                                  wrapLines={true}
                                  lineProps={{ style: { whiteSpace: 'pre-wrap', overflowWrap: 'break-word' } }}
                                  showLineNumbers
                              >
                                {format(msg.text, { language: 'sql', tabWidth: 4 })}
                              </SyntaxHighlighter>
                              <button
                                  onClick={() => handleCopyToClipboard(msg.text)}
                                  className="absolute top-5 right-5 text-purple-500 hover:text-purple-700"
                                  title={copyStatus === msg.text ? 'Copied!' : 'Copy to Clipboard'}
                              >
                                {copyStatus === msg.text ? <FaCheck /> : <FaClipboard />}
                              </button>
                            </div>
                        ) : (
                            <p>{msg.text}</p>
                        )}
                      </div>
                    </div>
                ))}

                <div ref={messagesEndRef}  className="space-y-4 flex-grow overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-100" />

              </div>


              {/* Sticky Input */}
                <div className="p-4 -mx-6 bg-gray-50 border-t border-gray-300 sticky bottom-0 shadow-md">
                        <div className="flex items-center bg-white border rounded-full p-2 w-full  shadow-md">
                            <input
                                type="text"
                                placeholder="Write your query..."
                                className="flex-grow px-4 py-2 rounded-full border-none outline-none text-gray-800 placeholder-gray-500"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                                maxLength={characterLimit}
                            />
                            <button
                                onClick={handleSubmit}
                                className="ml-3 bg-purple-500 text-white rounded-full px-4 py-2 hover:bg-purple-600 transition"
                            >
                                <FaArrowRight />
                            </button>
                        </div>

                        {/* Character Count */}
                        <div
                            className={`text-sm mt-2 float-end ${
                                input.length > characterLimit * 0.8
                                    ? 'text-red-500'
                                    : input.length > characterLimit * 0.6
                                        ? 'text-orange-400'
                                        : 'text-gray-500'
                            }`}
                        >
                            {input.length}/{characterLimit} characters
                        </div>
                    </div>
            </div>

                )}
            </div>
  );
}