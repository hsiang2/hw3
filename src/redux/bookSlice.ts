import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UpdateBookPayload {
    bookId: string;
    bookData: {
        title: string;
        body: string;
        userId: number;
    };
}

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

// export const searchBooks = createAsyncThunk(
//     "book/searchBooks",
//     async (keyword: string) => {
//         try {
//             const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?title=${keyword}`)
//             const data = response.data.map((e: object) => (
//                 {
//                     ...e,
//                     image: "/images/img_book.jpg"
//                 }
//             ))
//             return data
//         } catch (error) {
//             console.error(error);
//           }
//     }
// )

export const updateBook = createAsyncThunk<Book, UpdateBookPayload>(
    "book/updateBook",
    async ({bookId, bookData}) => {
        try {
            const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${bookId}`, bookData)
            const data = {
                ...response.data,
                image: "/images/img_book.jpg",
                id: parseInt(bookId)
            }
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
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', bookData)
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
                const data = { ...action.payload, id: (state.books[state.books.length - 1].id + 1)}
                state.books.push(data);
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
            .addCase(updateBook.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                
                let index = state.books.findIndex((e: Book) => e.id == action.payload.id);
                
                state.books[index] = action.payload;
                // state.book = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = true;
            })
    },
    reducers: {}
})

export const selectBooks = (state: any) => state.book.books
export const selectLoadingState = (state: any) => state.book.isLoading
export const selectErrorState = (state: any) => state.book.hasError
export default bookSlice.reducer

