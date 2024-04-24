import { configureStore } from "@reduxjs/toolkit"
import AccountReducer from "./features/account/AccountSlice.js"
import CustomerReducer from "./features/customer/CustomerSlice.js";

const store = configureStore({
    reducer: {
        account: AccountReducer,
        customer: CustomerReducer
    }
})

export default store;