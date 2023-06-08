import { createSlice } from "@reduxjs/toolkit";

const initialState  =  {
    user  : null,
    loggedIn : false
}

interface state {
    auth : object 
}

const AuthSlice = createSlice({
    name : 'Auth',
    initialState,
    reducers : {
        login : (state , {payload}) => {
            state.user = payload
            state.loggedIn = true
            
        },
        logout : (state) => {
            state.user = null;
            state.loggedIn = false;
        }
    }
})
export const { login , logout } = AuthSlice.actions;
export const loggedInUser = (state : state) => state.auth 
export default AuthSlice.reducer;
