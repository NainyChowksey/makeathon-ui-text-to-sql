import React, {useEffect, useState} from 'react';
import GptChat from './GptChat';
import Sidebar from './Sidebar';
import ChatRoom from "./ChatRoom";
import {addRole} from "../utils/userConfig";
import {setChatHistory} from "../utils/chatSlice";
import {convertResponses} from "../utils/validations";
import {useDispatch, useSelector} from "react-redux";

const Browse = () => {
    const dispatch = useDispatch()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newChat, setNewChat] = useState(false);
    const userState = useSelector(state => state.user)
    useEffect(() => {

        if (userState?.uid) {

            const url =
                "https://5b38-2409-40f2-200b-6a6f-f5c2-dc87-cb25-3aea.ngrok-free.app/fetchrole";
                // "http://localhost:8000/metadata"
            const data = {
                uid: userState.uid,
                email: userState.email
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
                    console.log("Nainy", responseData);
                    dispatch(addRole(responseData?.role))

                    dispatch(setChatHistory(convertResponses(responseData?.prev_question_response?.question_answer_pairs)))

                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, [userState?.uid])

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