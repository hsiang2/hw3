import { Link, useNavigate } from "react-router-dom"
import { Button, Input } from "antd"
import type { SearchProps } from "antd/es/input";

const { Search } = Input


const Header = () => {
    const navigate = useNavigate()

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        navigate(`/${value.trim()}`)
    }
    return (
        // <div className="header">
        <div className="container header">
            <div className="nav-left">
                <Link to="/" className="header-home">
                    BOOKS
                </Link>
                <Search name="search" placeholder="Find Books..." onSearch={onSearch}  />
            </div>
            <Link to="/addBook">
                <Button type="primary" shape="round" className="header-btn">ADD NEW BOOKS</Button>
            </Link>
        </div>
        // </div>
    )
}

export default Header