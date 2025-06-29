import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken: null,
    userRole: null,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.userRole = action.payload.userRole
            state.user = action.payload.user
        },
        logout: (state) => {
            state.accessToken = null
            state.userRole = null
            state.user = null
        }
    }
})

export const {loginSuccess, logout} = authSlice.actions

export default authSlice.reducer