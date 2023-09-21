
import { useParams } from "react-router-dom"
import Header from "../components/Header"


const BookPage = () => {
    const { bookId } = useParams()
    // const



    return (
        <>
            <Header />
            <div className="container">
                
            </div>
        </>
    )
}

export default BookPage