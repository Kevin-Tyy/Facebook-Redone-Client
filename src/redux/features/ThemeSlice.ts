import { createSlice } from "@reduxjs/toolkit";
const element = document.documentElement

const ThemeSlice = createSlice({
	name: "Theme",
	initialState: {
		theme: "system",
	},
	reducers: {
		toggleTheme: (state, { payload }) => {
      state.theme = payload
      
      switch (state.theme) {
        case 'dark':
          element.classList.add('dark')
          break;
        case 'light':
          element.classList.remove('dark')
          break;

        default:
          break;
      }
    },
	},
});


export const { toggleTheme } = ThemeSlice.actions
export default ThemeSlice.reducer
export const currentTheme = (state : any) => state.theme
 