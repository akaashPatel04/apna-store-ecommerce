import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orders: localStorage.getItem('orderList') ? JSON.parse(localStorage.getItem('orderList')) : [],
    products: localStorage.getItem('productList') ? JSON.parse(localStorage.getItem('productList')) : [],
    users: localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [],
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getAllOrders: (state, action) => {
            state.orders = action.payload
            localStorage.setItem('orderList', JSON.stringify(action.payload || []))
        },
        getAllProducts: (state, action) => {
            state.products = action.payload
            localStorage.setItem('productList', JSON.stringify(action.payload || []))
        },
        getAllUsers: (state, action) => {
            state.users = action.payload
            localStorage.setItem('userList', JSON.stringify(action.payload || []))
        },
        removeAllData: (state) => {
            state.orders = [];
            state.products = [];
            state.users = [];
            localStorage.removeItem('orderList')
            localStorage.removeItem('productList')
            localStorage.removeItem('userList')
        }
    }
})


export const { getAllOrders, getAllProducts, getAllUsers, removeAllData } = adminSlice.actions

export default adminSlice.reducer