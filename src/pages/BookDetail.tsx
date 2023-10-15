
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectLoadingState } from "../redux/bookByIdSlice"
import { Button, Popconfirm, Skeleton } from "antd"
import { authors } from "../models/book"
import { deleteBook, selectBooks } from "../redux/bookSlice"
import { Book } from "../models/book"
import { useEffect } from "react"


function BookDetail() {
    const { bookId } = useParams()
    const dispatch = useDispatch<any>()

    const bookArr = useSelector(selectBooks)
    const book = bookId ? bookArr.find((e: Book) => e.id == parseInt(bookId)) : {}
    const isLoading = useSelector(selectLoadingState)
    const navigate = useNavigate()

    const confirm = (e?: React.MouseEvent<HTMLElement>) => {
        if (bookId) {
            dispatch(deleteBook(bookId))
        }
        navigate('/')
    };

    useEffect(() => {
        if ( !(bookId && bookArr.some((e: Book) => e.id == parseInt(bookId)))) {
            navigate('/404')
        }

    }, [])
   
    return (
        <>
            <div className="container">
                
                {isLoading ? (
                    <Skeleton style={{marginTop: "5.5rem"}}  />
                ) : (
                    <div className="book-detail">
                        <img alt={book?.title} src={book?.image} className="book-detail-img" />
                        <div className="book-detail-text">
                            <div>
                                <h1 className="book-detail-title">{book?.title}</h1>
                                <h3 className="book-detail-author">By {authors[book?.userId - 1]}</h3>
                                <p className="book-detail-body">{book?.body}</p>
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

export default BookDetail