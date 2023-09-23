import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBookById = createAsyncThunk(
    "bookById/getBookById",
    async (bookId: string) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${bookId}`)
            const data = {
                ...response.data,
                image: "/images/img_book.jpg"
            }
            return data
        } catch (error) {
            console.error(error);
          }
    }
)

const bookByIdSlice = createSlice({
    name: 'bookById',
    initialState: {
        book: {} as Book,
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookById.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getBookById.fulfilled, (state, action) => {
                state.book = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(getBookById.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            })

    }
    // reducers: {
    //     fetchBooks: (state) => {
    //         console.log("Hi")
    //         axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
    //             const books = response.data as Book[]
    //             state.books = books
    //         })
    //     }
    // }
    ,
    reducers: {}
})

export const selectBookById = (state: any) => state.bookById.book
export const selectLoadingState = (state: any) => state.bookById.isLoading
export const selectErrorState = (state: any) => state.bookById.hasError
// export const { fetchBooks } = bookSlice.actions
export default bookByIdSlice.reducer

