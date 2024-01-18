import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
            state.error = null
        },
        signUpSuccess: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.loading = false;
            state.error = null
        },
        signUpFail: (state, action) => {
            state.user = null
            state.error = action.payload
            state.loading = false
        },
        removeUser: (state) => {
            state.user = null
            localStorage.removeItem("user");
        }
    }
})

export const { signUpStart, signUpSuccess, signUpFail, removeUser } = userSlice.actions

export default userSlice.reducer