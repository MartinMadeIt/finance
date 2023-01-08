import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
    darkTheme: boolean
}
    
const initialState:ThemeState = {
    darkTheme: true
}

export const darkThemeSlice = createSlice({
    name : "darkTheme",
    initialState,
    reducers: {
        changeTheme : (state) => {
            state.darkTheme = !state.darkTheme
        }
    }
})

export const { changeTheme } = darkThemeSlice.actions;