import { Row } from "antd"
import Header from "../components/Header"
// import { getBooks } from "../api"
import { useSelector } from "react-redux"
import { selectBooks } from "../redux/bookSlice"
import BookItem from "../components/BookItem"
import { useParams } from "react-router-dom"
import { authors } from "../constants/global"
// import { useBooks } from "../react-query"

const HomePage = () => {
    const { keyword } = useParams()
    let books = useSelector(selectBooks)

    if (keyword) {
        books = books.filter((e: Book) => e.title.toLowerCase().includes(keyword.toLowerCase()) || authors[e.userId - 1].toLowerCase().includes(keyword.toLowerCase()))
    }
    
    return (
        <>
            <Header />
            <div className="container">
                <Row align="top" gutter={[40, 40]} style={{margin: "6rem 0"}}>
                    {books.map((book: Book) => (
                        <BookItem book={book} key={book.id} />
                    ))}
                </Row>
            </div>
        </>
    )
}

export default HomePage