import { createSlice } from "@reduxjs/toolkit";
export interface user {
    username:string |any;
    id:string;
    email:string;
    isLoggedIn:boolean;
}
const initialState:user = {
    username:"Kevi",
    id:"",
    email:"",
    isLoggedIn:false
}

const AuthSlice = createSlice({
    name : 'Auth',
    initialState,
    reducers : {
        login : (state , {payload}) => {
            // const {userName }= jwt_decode(payload.token)
            state.username = payload.username;
            state.isLoggedIn = true
            
        },
        logout : (state) => {
            state.username =null;
            state.isLoggedIn = false;
        }
    }
})
export const {login,logout} = AuthSlice.actions;
export default AuthSlice.reducer;