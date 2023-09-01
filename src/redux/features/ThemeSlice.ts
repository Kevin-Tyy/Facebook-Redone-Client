import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
	name: "Theme",
	initialState: {
		theme: "system",
	},
	reducers: {
		toggleTheme: (state, { payload }) => {
      state.theme = payload    
    },
	},
});


export const { toggleTheme } = ThemeSlice.actions
export default ThemeSlice.reducer
export const currentTheme = (state : any) => state.theme
 