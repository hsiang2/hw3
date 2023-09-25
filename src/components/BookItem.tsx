import { Col } from "antd"
import { Link } from "react-router-dom"
import { authors } from "../constants/global"
interface BookItemProps {
    book: Book
}

const BookItem = ({book}: BookItemProps) => {
    return (
        <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }} 
            md={{ span: 12 }}
            lg={{ span: 6 }}
        >
            <Link to={`/book/${book.id}`}>
                <img src={book.image} className="book-item-img" />
                <h2 className="book-item-title">{book.title}</h2>
                <h3 className="book-item-author">By {authors[book.userId - 1]}</h3>
            </Link>
        </Col>
    )
}

export default BookItem