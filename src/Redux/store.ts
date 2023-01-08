import { configureStore } from "@reduxjs/toolkit";
import { darkThemeSlice } from "./themeSlice";
import { authSlice } from "./authSlice";

export const store = configureStore({
    reducer: {
        darkTheme : darkThemeSlice.reducer,
        auth : authSlice.reducer 
    }

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;