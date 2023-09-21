import { Link } from "react-router-dom"
import { Button, Input } from "antd"
import type { SearchProps } from "antd/es/input";

const { Search } = Input
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

const Header = () => {
    return (
        // <div className="header">
        <div className="container header">
            <div className="nav-left">
                <Link to="/">
                    BOOKS
                </Link>
                <Search placeholder="Find Books..." onSearch={onSearch}  />
            </div>
            <Link to="/addBook">
                <Button type="primary" shape="round">ADD NEW BOOKS</Button>
            </Link>
        </div>
        // </div>
    )
}

export default Header