import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        book: bookSlice
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk] 
})


// export type AppDispatch = typeof store.dispatch