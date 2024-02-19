import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/todoslice";

export const store = configureStore({
    reducer: {
        tasks: taskReducer
    }
})