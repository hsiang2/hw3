import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import thunk from "redux-thunk";
import bookByIdSlice from "./bookByIdSlice";

export const store = configureStore({
    reducer: {
        book: bookSlice,
        bookById: bookByIdSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk] 
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch