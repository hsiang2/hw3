import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const books: Book[] = []
// const initialState = { books }

export const getBooks = createAsyncThunk(
    "book/getBooks",
    async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            const data = response.data.map((e: object) => (
                {
                    ...e,
                    image: "/images/img_book.jpg"
                }
            ))
            return data
        } catch (error) {
            console.error(error);
          }
    }
)

export const addBook = createAsyncThunk(
    "book/addBook",
    async (bookData: {title: string; body: string; userId: number;}) => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', bookData 
            // {
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            //     body: JSON.stringify({ userId, title, body })
                 
            // }
            )
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

export const deleteBook = createAsyncThunk(
    "book/deleteBook",
    async (bookId: string) => {
        try {
            const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${bookId}`)
            return parseInt(bookId)
        } catch (error) {
            console.error(error);
          }
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState: {
        books: [] as Book[],
        isLoading: false,
        hasError: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(addBook.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            })
            .addCase(deleteBook.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.books = state.books.filter((e) => e.id !== action.payload);
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(deleteBook.rejected, (state, action) => {
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

export const selectBooks = (state: any) => state.book.books
export const selectLoadingState = (state: any) => state.book.isLoading
export const selectErrorState = (state: any) => state.book.hasError
// export const { fetchBooks } = bookSlice.actions
export default bookSlice.reducer

