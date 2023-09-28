import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { addBook } from "../redux/bookSlice"
import Header from "../components/Header"
import { Button, Form, Input, Select, Upload, UploadFile, UploadProps, message } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"
import { authors } from "../constants/global"
import { RcFile } from "antd/es/upload"


const AddBookPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [userId, setUserId] = useState(0)

    const [fileList, setFileList] = useState<UploadFile[]>([])

    // const handleChange: UploadProps['onChange'] = (info) => {
    //     let newFileList = [...info.fileList]
    //     newFileList = newFileList.slice(-1)
    //     newFileList = newFileList.map((file) => {
    //         if (file.response) {
    //           // Component will show file.url as link
    //           file.url = file.response.url;
    //         }
    //         return file;
    //       });
    //     setFileList(newFileList)
    // }

    // const beforeUpload = (file: RcFile) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     if (!isJpgOrPng) {
    //       message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //       message.error('Image must smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    //   };

    // const props = {
    //     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    //     onChange: handleChange,
    
    //     // multiple: true,
    //   };

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

    // const handleUserIdChange = (value: number | undefined | null) => {
    //     if (value !== undefined && value !== null) {
    //         setUserId(value);
    //     } else {
    //         setUserId(0);
    //     }
    // };

    const handleUserIdChange =(value: string) => {
        setUserId(parseInt(value))
        // if (value !== undefined && value !== null) {
        //     setUserId(value);
        // } else {
        //     setUserId(0);
        // }
    };

    return (
        <>
            <Header />
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
                        {/* <Upload {...props} beforeUpload={beforeUpload} fileList={fileList}>
                            <Button>Upload</Button>
                        </Upload> */}
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
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
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

export default AddBookPage