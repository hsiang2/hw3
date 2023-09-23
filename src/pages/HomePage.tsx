import { Row } from "antd"
import Header from "../components/Header"
// import { getBooks } from "../api"
import { useSelector } from "react-redux"
import { selectBooks } from "../redux/bookSlice"
import BookItem from "../components/BookItem"
// import { useBooks } from "../react-query"

const HomePage = () => {
    const books = useSelector(selectBooks)

    // console.log(books)
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