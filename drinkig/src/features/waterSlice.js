import { createSlice } from "@reduxjs/toolkit";

const initialValues = {
    capacity: 2,
    totalCups: 8
}

const ContainerSlice = createSlice({
    name: "water",
    initialState: initialValues,
    reducers: {
        updateQuantity (state, action) {
            state.capacity = action.payload.capacity;
            state.totalCups = action.payload.totalCups;
        }
    }
})

export const { updateQuantity } = ContainerSlice.actions;

export default ContainerSlice.reducer;