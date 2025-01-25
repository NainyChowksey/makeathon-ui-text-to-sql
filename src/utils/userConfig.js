import { createSlice } from "@reduxjs/toolkit";

const userConfigSlice = createSlice({
    name: "userConfig",
    initialState: {
        role:null
    },
    reducers:{
        addRole:(state, action)=>{
             state.role=action.payload

        },
        removeRole:(state, action)=>{
            state.role=null

        }
    }

})

export const {addRole, removeRole}=userConfigSlice.actions;
export default userConfigSlice.reducer;