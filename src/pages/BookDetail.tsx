
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectLoadingState } from "../redux/bookByIdSlice"
import { Button, Popconfirm, Skeleton } from "antd"
import { authors } from "../constants/global"
import { deleteBook, selectBooks } from "../redux/bookSlice"
import { Book } from "../models/book"


const BookPage = () => {
    const { bookId } = useParams()
    const dispatch = useDispatch<any>()

    const books = useSelector(selectBooks)
    const book = bookId ? books.find((e: Book) => e.id == parseInt(bookId)) : {}
    const isLoading = useSelector(selectLoadingState)
    const navigate = useNavigate()

    const confirm = (e?: React.MouseEvent<HTMLElement>) => {
        if (bookId) {
            dispatch(deleteBook(bookId))
        }
        navigate('/')
    };
   
    return (
        <>
            <div className="container">
                {isLoading ? (
                    <Skeleton style={{marginTop: "5.5rem"}}  />
                ) : (
                    <div className="book-detail">
                        <img alt={book.title} src={book.image} className="book-detail-img" />
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
                                <Button size="large" shape="round" className="update-btn" onClick={() => {navigate(`/update/${book.id}`)}}>UPDATE</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default BookPage