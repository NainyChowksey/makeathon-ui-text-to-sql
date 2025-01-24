import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name:"chatSlice",
    initialState:{
        chatHistory:[
            { id: 1, title: 'Chat with John', timestamp: Date.now() },
            { id: 2, title: 'Work Discussion', timestamp: Date.now() },
            { id: 3, title: 'Project Workshop', timestamp: Date.now() },
        ],
        currentChat:null,
    },
    reducers:{
       addToChatHistory:(state, action)=>{
           state.chatHistory.push(action.payload)
           state.chatHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

       },
        setCurrentChat:(state, action)=>{
            state.currentChat=action.payload
        }
    }
})

export const {addToChatHistory, setCurrentChat} = chatSlice.actions;

export default chatSlice.reducer;