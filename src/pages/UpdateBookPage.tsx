import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBook, selectBooks, selectLoadingState, updateBook } from "../redux/bookSlice"
import Header from "../components/Header"
import { Button, Form, Input, InputNumber } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate, useParams } from "react-router-dom"
import { valueType } from "antd/es/statistic/utils"



const UpdateBookPage = () => {
    const { bookId } = useParams()
    const books = useSelector(selectBooks)
    const book = books.find((e: any) => e.id == bookId)

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [title, setTitle] = useState(book.title)
    const [body, setBody] = useState(book.body)
    const [userId, setUserId] = useState(book.userId)

    type FieldType = {
        title: string;
        body: string;
        userId: number;
    };

    const handleUpdateBook = async () => {
        const bookData = {
            title, body, userId
        }
        if (bookId) {
            await dispatch(updateBook({ bookId, bookData }))
            navigate(`/book/${bookId}`)
        }
        
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    const handleUserIdChange =(value: valueType | null) => {
        if (value !== undefined && value !== null) {
            setUserId(value);
        } else {
            setUserId(0);
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="add-book">
                    <h1 className="add-book-title">
                        Update the Book.
                    </h1>
                    <Form
                        name="basic"
                        style={{ width: "100%"}}
                        onFinish={handleUpdateBook}
                        labelCol={{span: 24}}
                        className="add-book-form"
                    >
                        <Form.Item<FieldType>
                            label="Book Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input book title!' }]}
                            initialValue={title}
                        >
                            <Input value={title} onChange={handleTitleChange} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Author"
                            name="userId"
                            rules={[{ required: true, message: 'Please input the author!' }]}
                            initialValue={userId}
                        >
                            <InputNumber value={userId} onChange={handleUserIdChange} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Description"
                            name="body"
                            rules={[{ required: true, message: 'Please input the description!' }]}
                            initialValue={body}
                        >
                            <TextArea rows={4} value={body} onChange={handleBodyChange} />
                        </Form.Item>

                        <Form.Item>
                        <div className="add-book-btn-wrapper">
                            <Button size="large" shape="round" className="update-btn" onClick={() => {navigate(`/book/${book.id}`)}}>
                                CANCEL
                            </Button>
                            <Button className="submit-update-btn" shape="round" size="large" type="primary" htmlType="submit">
                                SUBMIT
                            </Button>
                        </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default UpdateBookPage