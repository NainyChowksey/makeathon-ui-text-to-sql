
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import chatSlice from "./chatSlice";
import userConfigReducer from "./userConfig";

const appStore = configureStore({
    reducer:{
        user: userReducer,
        movies: moviesReducer,
        gpt:gptReducer,
        chat: chatSlice,
        userConfig: userConfigReducer
    }
})

export default appStore;
