import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalId: "",
}

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        createCustomer (state, action) {
            state.fullName = action.payload.fullName;
            state.nationalId = action.payload.nationalId;
        },
        updateName (state, action) {
            state.fullName = action.payload;
        },
        closeAccount (state) {
            state.fullName = "";
            state.nationalId = "";
        }
    }
})

export const { createCustomer, updateName, closeAccount } = customerSlice.actions

export default customerSlice.reducer;