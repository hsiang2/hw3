import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const books: Book[] = []
// const initialState = { books }

export const getBooks = createAsyncThunk(
    "book/getBooks",
    async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            return response.data
        } catch (error) {
            console.error(error);
          }
    }
)

export const getBookById = createAsyncThunk(
    "book/getBookById",
    async (bookId: number) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${bookId}`)
            return response.data
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
            
            return response.data
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
                console.log(state.books[100])
            })
            .addCase(addBook.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            });

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

