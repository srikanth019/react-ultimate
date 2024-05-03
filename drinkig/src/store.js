import { configureStore } from "@reduxjs/toolkit"
import WaterSlice from "./features/waterSlice"

const store = configureStore({
    reducer: {
        water: WaterSlice
    }
})

export default store;