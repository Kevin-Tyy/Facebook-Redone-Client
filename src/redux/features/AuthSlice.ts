import { createSlice } from "@reduxjs/toolkit";

const initialState  =  {
    user  : null,
    loggedIn : false
}
interface state {
    auth :  Auth 
}

interface Auth {
    user : object;
    loggedIn : boolean
}const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.user = payload;
            state.loggedIn = true;
        },
        logout: (state) => {
            state.user = null;
            state.loggedIn = false;
        },
        updateImage: (state, { payload }) => {
            state.user.userInfo.profileimage = payload
            state.loggedIn = true;
        }
    }
});

export const { login , logout , updateImage } = AuthSlice.actions;
export const loggedInUser = (state : state) => state.auth
export default AuthSlice.reducer;