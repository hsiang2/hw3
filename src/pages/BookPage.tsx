
import { useNavigate, useParams } from "react-router-dom"
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { getBookById, selectBookById, selectLoadingState } from "../redux/bookByIdSlice"
import { useEffect } from "react"
import { Button, Popconfirm, Skeleton } from "antd"
import { authors } from "../constants/global"
import { deleteBook, selectBooks } from "../redux/bookSlice"


const BookPage = () => {
    const { bookId } = useParams()
    // const
    const dispatch = useDispatch<any>()
    // const book = useSelector(selectBookById)

    const books = useSelector(selectBooks)
    const book = books.filter((e: any) => e.id == bookId)[0]

    
    const isLoading = useSelector(selectLoadingState)
    const navigate = useNavigate()

    const confirm = (e?: React.MouseEvent<HTMLElement>) => {
        if (bookId) {
            dispatch(deleteBook(bookId))
        }
        navigate('/')
    };

    useEffect(() => {
        // if (bookId) {
        //     const book = books.filter((e: any) => e.id == bookId)
        //     console.log(book)
        // }
        // if (bookId) {
        //     const book = books[bookId]
        // }
        // if (bookId) {
        //     dispatch(getBookById(bookId))
        // }
    }, [bookId, dispatch])
   
    return (
        <>
            <Header />
            <div className="container">
                {isLoading ? (
                    <Skeleton style={{marginTop: "5.5rem"}}  />
                ) : (
                    <div className="book-detail">
                        <img src={book.image} className="book-detail-img" />
                        <div className="book-detail-text">
                            <div>
                                <h1 className="book-detail-title">{book.title}</h1>
                                <h3 className="book-detail-author">By {authors[book.userId - 1]}</h3>
                                <p className="book-detail-body">{book.body}</p>
                            </div>
                            <div className="book-detail-btns">
                                <Popconfirm
                                    title="Delete the book"
                                    description="Are you sure to delete this book?"
                                    onConfirm={confirm}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button size="large" shape="round" className="delete-btn">DELETE</Button>
                                </Popconfirm>
                                <Button size="large" shape="round" className="update-btn">UPDATE</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BookPage