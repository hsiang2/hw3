import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBook } from "../redux/bookSlice"
import { Button, Form, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"
import { authors } from "../models/book"


function AddBook() {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [userId, setUserId] = useState(0)

    type FieldType = {
        title: string;
        body: string;
        userId: number;
    };

    function handleAddBook() {
        const bookData = {
            title, body, userId
        }
        dispatch(addBook(bookData))
        navigate('/')
    }

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    };
    
    function handleBodyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    };

    function handleUserIdChange(value: string) {
        setUserId(parseInt(value))
    };

    return (
        <>
            <div className="container">
                <div className="add-book">
                    <h1 className="add-book-title">
                        Add a Book.
                    </h1>
                    <Form
                        name="basic"
                        style={{ width: "100%"}}
                        onFinish={handleAddBook}
                        labelCol={{span: 24}}
                        className="add-book-form"
                    >
                        <Form.Item<FieldType>
                            label="Book Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input book title!' }]}
                        >
                            <Input name="title" value={title} onChange={handleTitleChange} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Author"
                            name="userId"
                            rules={[{ required: true, message: 'Please input the author!' }]}
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
                        >
                            <TextArea name="body" rows={4} value={body} onChange={handleBodyChange} />
                        </Form.Item>

                        <Form.Item>
                        <div className="add-book-btn-wrapper">
                            <Button className="add-book-btn" shape="round" size="large" type="primary" htmlType="submit">
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

export default AddBook