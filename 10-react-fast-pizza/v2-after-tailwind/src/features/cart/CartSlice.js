import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizzaToCart (state, action) {
            state.cart.push(action.payload)
        },
        removePizzaFromCart (state, action) {
            state.cart = state.cart.filter(pizza => pizza.pizzaId !== action.payload)
        },
        increaseQuantity (state, action) {
            const pizza = state.cart.find(pizza => pizza.pizzaId === action.payload)
            pizza.quantity++
            pizza.totalPrice = pizza.quantity * pizza.unitPrice
        },
        decreaseQuantity (state, action) {
            const pizza = state.cart.find(pizza => pizza.pizzaId === action.payload)
            pizza.quantity--
            pizza.totalPrice = pizza.quantity * pizza.unitPrice
        },
        clearPizzaCart (state) {
            state.cart = []
        }
    }
})

export const { addPizzaToCart, removePizzaFromCart, increaseQuantity, decreaseQuantity, clearPizzaCart } = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state, action) => state.cart.cart