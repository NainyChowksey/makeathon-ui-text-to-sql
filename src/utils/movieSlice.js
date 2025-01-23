import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        movieTrailer:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null
    },
    reducers:{
        addNowPlayingMovies:(state, action)=>{
            state.nowPlayingMovies= action.payload
        },
        addPopularMovies:(state, action)=>{
            state.popularMovies= action.payload
        },
        addTopRatedMovies:(state, action)=>{
            state.topRatedMovies= action.payload
        },
        addUpcomingMovies:(state, action)=>{
            state.upcomingMovies= action.payload
        },

        addMovieTrailer: (state, action)=>{
            state.movieTrailer=action.payload
        }
    }
})

export const { addNowPlayingMovies , addMovieTrailer, addPopularMovies, addTopRatedMovies, addUpcomingMovies} = movieSlice.actions;
export default movieSlice.reducer;
