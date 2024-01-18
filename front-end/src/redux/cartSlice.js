import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItem: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
    shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartAction: (state, action) => {
            state.cartItem = action.payload
            localStorage.setItem("cartItem", JSON.stringify(action.payload));
        },
        resetCart: (state) => {
            state.cartItem = []
            localStorage.removeItem('cartItem')
        },
        shippingInfoSave: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
        },
        resetShippingInfo: (state) => {
            state.shippingInfo = {}
            localStorage.removeItem('shippingInfo')
        }

    }
})

export const { cartAction, resetCart, shippingInfoSave, resetShippingInfo } = cartSlice.actions

export default cartSlice.reducer
