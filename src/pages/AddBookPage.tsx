import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { addBook } from "../redux/bookSlice"
import Header from "../components/Header"
import { Button, Form, Input, InputNumber } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"


const AddBookPage = () => {
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

    const handleUserIdChange = (value: number | undefined | null) => {
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
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleAddBook}
                >
                    <Form.Item<FieldType>
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input your title!' }]}
                    >
                        <Input value={title} onChange={handleTitleChange} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="UserID"
                        name="userId"
                        rules={[{ required: true, message: 'Please input your user Id!' }]}
                    >
                        <InputNumber value={userId} onChange={handleUserIdChange} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Body"
                        name="body"
                        rules={[{ required: true, message: 'Please input your body!' }]}
                    >
                        <TextArea value={body} onChange={handleBodyChange} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        SUBMIT
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default AddBookPage