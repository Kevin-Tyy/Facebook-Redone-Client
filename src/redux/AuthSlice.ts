import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name : 'Auth',
    initialState : {
        user : null,
        isLoggedIn : false,

    },
    reducers : {
        login : function (state , action) {
            state.user = action.payload.username;
            state.isLoggedIn = action.payload.isLoggedIn;
            
        },
        // logout : function (state , action) {
        //     state.user = null;
        //     state.isLoggedIn = false;
        // }
    }
})
export const { } = AuthSlice.actions