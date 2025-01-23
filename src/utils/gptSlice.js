import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name:"gpt",
    initialState:{
        showGptSearch:false,
        movieNames: null,
        movieResults: null
    },
    reducers:{
        ShowGptSearch:(state)=>{
            state.showGptSearch=!state.showGptSearch
         },

        AddGptResults:(state, action)=>{
                const { movieNames, movieResults } = action.payload;
                state.movieNames = movieNames;
                state.movieResults = movieResults;
              },
        

    }
})

export const {ShowGptSearch, AddGptResults} = gptSlice.actions;

export default gptSlice.reducer;