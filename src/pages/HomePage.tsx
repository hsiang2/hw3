import { Col, Row } from "antd"
import Header from "../components/Header"
// import { getBooks } from "../api"
import { useDispatch, useSelector } from "react-redux"
import { selectBooks } from "../redux/bookSlice"
import { Link } from "react-router-dom"
// import { useBooks } from "../react-query"

const HomePage = () => {
    // const dispatch = useDispatch<any>()
    const books = useSelector(selectBooks)

    // useEffect(() => {
    //     dispatch(getBooks())
    // }, [])

    return (
        <>
            <Header />
            <div className="container">
                <Row align="top" gutter={[32, 32]} style={{marginBottom: "9rem"}}>
                    {books.map((book: Book) => (
                        <Col 
                            key={book.id}
                            xs={{ span: 24 }}
                            sm={{ span: 24 }} 
                            md={{ span: 12 }}
                            lg={{ span: 8 }}
                        >
                            <Link to={`/id/${book.id}`}>
                                {book.title}
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default HomePage