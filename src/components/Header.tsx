import { Link, useSearchParams } from "react-router-dom"
import { Button, Input } from "antd"
import type { SearchProps } from "antd/es/input";

const { Search } = Input


function Header() {
    // const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {


        const search = value ? { keyword: value } : undefined;

        // if (value) {
        //     search = {
        //         keyword: value
        //     }
        // } else {
        //     search = undefined;
        // }

        setSearchParams(search);
        // navigate(`/${value.trim()}`)
    }
    
    return (
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
    )
}

export default Header