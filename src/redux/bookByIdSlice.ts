import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// interface UpdateBookPayload {
//     bookId: string;
//     bookData: {
//         title: string;
//         body: string;
//         userId: number;
//     };
// }

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

// export const updateBook = createAsyncThunk<Book, UpdateBookPayload>(
//     "bookById/updateBook",
//     async ({bookId, bookData}) => {
//         try {
//             const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${bookId}`, bookData)
//             const data = {
//                 ...response.data,
//                 image: "/images/img_book.jpg"
//             } 
//             console.log(data)
//             return data
//         } catch (error) {
//             console.error(error);
//           }
//     }
// )

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
            // .addCase(updateBook.pending, (state) => {
            //     state.isLoading = true;
            //     state.hasError = false;
            // })
            // .addCase(updateBook.fulfilled, (state, action) => {
                
            //     // state.book = action.payload;
            //     state.isLoading = false;
            //     state.hasError = false;
            // })
            // .addCase(updateBook.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.hasError = true;
            // })

    },
    reducers: {}
})

export const selectBookById = (state: any) => state.bookById.book
export const selectLoadingState = (state: any) => state.bookById.isLoading
export const selectErrorState = (state: any) => state.bookById.hasError
export default bookByIdSlice.reducer

