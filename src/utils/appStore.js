
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import chatSlice from "./chatSlice";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        movies: moviesReducer,
        gpt:gptReducer,
        chat: chatSlice
    }
})

export default appStore;
