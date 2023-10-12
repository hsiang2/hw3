import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addBook, selectBooks, updateBook } from "../redux/bookSlice"
import { Button, Form, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate, useParams } from "react-router-dom"
import { authors } from "../constants/global"
import { Book } from "../models/book"

function UpdateBook() {
    const { bookId } = useParams()
    const formType = bookId ? "update" : "add"
    const books = useSelector(selectBooks)
    const book = bookId ? books.find((e: Book) => e.id == parseInt(bookId)) : {}

    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [title, setTitle] = useState(book.title || "")
    const [body, setBody] = useState(book.body  || "")
    const [userId, setUserId] = useState(book.userId || 1)

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

    const handleAddBook = () => {
        const bookData = {
            title, body, userId
        }
        dispatch(addBook(bookData))
        navigate('/')
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    
    const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };

    const handleUserIdChange =(value: string) => {
        setUserId(parseInt(value))
    };

    return (
        <>
            <div className="container">
                <div className="add-book">
                    <h1 className="add-book-title">
                        {formType == "update" ? "Update the Book." : "Add the Book."}
                    </h1>
                    <Form
                        name="basic"
                        style={{ width: "100%"}}
                        onFinish={formType == "update" ? handleUpdateBook : handleAddBook}
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
                            initialValue={userId.toString()}
                        >
                            <Select
                                onChange={handleUserIdChange}
                            >
                                {authors.map((author, index) => (
                                    <Select.Option key={index.toString()} value={(index + 1).toString()}>{author}</Select.Option>
                                ))}
                            </Select>
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
                            {formType == "update" ? (
                                <>
                                    <Button size="large" shape="round" className="update-btn" onClick={() => {navigate(`/book/${book.id}`)}}>
                                        CANCEL
                                    </Button>
                                    <Button className="submit-update-btn" shape="round" size="large" type="primary" htmlType="submit">
                                        SUBMIT
                                    </Button>
                                </>
                            ):(
                                <Button className="add-book-btn" shape="round" size="large" type="primary" htmlType="submit">
                                    SUBMIT
                                </Button>
                            )}
                            
                        </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default UpdateBook