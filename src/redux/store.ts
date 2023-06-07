import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthSlice";
export default configureStore({
	reducer: {
		auth : AuthReducer ,
	},
});
