import { Col, Row } from "antd"
import { useSelector } from "react-redux"
import { selectBooks } from "../redux/bookSlice"
import { Link, useSearchParams } from "react-router-dom"
import { authors } from "../constants/global"
import { Book } from "../models/book"

function Home() {
    
    // const { keyword } = useParams()
    let books = useSelector(selectBooks)
    let [searchParams, setSearchParams] = useSearchParams();
    let keyword = searchParams.get('keyword') as string

    if (keyword) {
        books = books.filter((e: Book) => e.title.toLowerCase().includes(keyword.toLowerCase()) || authors[e.userId - 1].toLowerCase().includes(keyword.toLowerCase()))
    }
    
    return (
        <>
            <div className="container">
                <Row  gutter={[40, 40]} style={{margin: "6rem 0"}}>
                    {books.map((book: Book) => (
                        <BookItem book={book} key={book.id} />
                    ))}
                </Row>
            </div>
        </>
    )
}

export default Home

interface BookItemProps {
    book: Book
}

function BookItem({book}: BookItemProps) {
    return (
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }} 
            md={{ span: 12 }}
            lg={{ span: 6 }}
        >
            <Link to={`/book/${book.id}`}>
                <img alt={book.title} src={book.image} className="book-item-img" />
                <h2 className="book-item-title">{book.title}</h2>
                <h3 className="book-item-author">By {authors[book.userId - 1]}</h3>
            </Link>
        </Col>
    )
}