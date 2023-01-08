import { createSlice } from "@reduxjs/toolkit";
import { getUSER } from "../Controllers/loginManage";
import { supabase } from "../Utilities/supabaseClient";


const unauthorized = {
    authorized: false,
}


export const authSlice = createSlice({
    name : "auth",
    initialState:unauthorized,
    reducers: {
        logIn : (state) => {
            state.authorized = true
        },
        logOut : (state) => {
            state.authorized = false
        }
    }
})

export const { logIn, logOut } = authSlice.actions;