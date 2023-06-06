// import AuthSlice from './AuthSlice'
import { configureStore } from "@reduxjs/toolkit";
import AuthSlices from "./features/AuthSlice";
export default configureStore({
	reducer: {
		'auth':AuthSlices,
	},
});
