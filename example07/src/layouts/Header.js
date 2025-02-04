import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL, GET_ID, LOGOUT } from '../api/apiService';
import us from "../assets/images/icons/flags/US.png"
import logo from "../assets/images/logo.svg"
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

function Header({ updateCategories }) {
    const { isLoggedIn, userEmail, logout } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('email');
            console.log("Email người dùng:", email);

            if (email) {
                try {
                    const response = await GET_ID('users/email', email);
                    setUserName(response);
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                    localStorage.removeItem('email');
                    localStorage.removeItem('authToken');
                    setUserName(null);
                }
            } else {
                setUserName(null);
            }
        };

        const fetchCategories = async () => {
            const params = {
                pageNumber: 0,
                pageSize: 5,
                sortBy: 'categoryId',
                sortOrder: 'asc',
            };
            try {
                const response = await GET_ALL('categories', params);
                setCategories(response.content);
                updateCategories(response.content);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchUserData();
        fetchCategories();
    }, [isLoggedIn]);

    async function handleLogout() {
        try {
            await LOGOUT();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <header className="section-header">
            <nav className="navbar d-none d-md-flex p-md-0 navbar-expand-sm navbar-light border-bottom">
                <div className="container">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarTop4"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTop4">
                        <ul className="navbar-nav mr-auto">
                            {isLoggedIn && userEmail ? (
                                <React.Fragment>
                                    <span className='nav-link'>
                                        Xin chào, {userName?.lastName} {userName?.firstName}
                                    </span>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Profile">Thông tin cá nhân</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link btn btn-link" onClick={handleLogout}>Đăng xuất</button>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <span className='nav-link'>
                                    Xin chào, <Link to="/Login" style={{ textDecoration: "none" }}>Đăng nhập</Link> hoặc
                                    <Link to="/Register" style={{ textDecoration: "none" }}> Đăng ký </Link>
                                </span>
                            )}
                            <li className="nav-item">
                                <a className="nav-link" href="#">Khuyến mãi</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Bán hàng</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Trợ giúp</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li>
                                <a className="nav-link" href="#">
                                    <img src={us} alt='us' height="16" /> Giao hàng tới
                                </a>
                            </li>
                            <Nav className="nav-item dropdown">
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title="Danh sách theo dõi"
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item> Sản phẩm thứ nhất </NavDropdown.Item>
                                    <NavDropdown.Item> Sản phẩm thứ hai </NavDropdown.Item>
                                    <NavDropdown.Item> Sản phẩm thứ ba </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <li>
                                <a className="nav-link" href="#">
                                    Cửa hàng của tôi
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="#">
                                    <i className="fa fa-bell"></i>
                                </a>
                            </li>
                            <li>
                                <a className="nav-link" href="/Cart">
                                    <i className="fa fa-shopping-cart"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container">
                <section className="header-main border-bottom">
                    <div className="row row-sm">
                        <div className="col-6 col-sm col-md col-lg flex-md-grow-0">
                            <Link to="/Home" className="brand-wrap">
                                <img className="logo" src={logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className="col-6 col-sm col-md col-lg flex-md-grow-0">
                            <div className="d-md-none float-right">
                                <a href="#" className="btn btn-light">
                                    <i className="fa fa-bell"></i>
                                </a>
                                <a href="#" className="btn btn-light">
                                    <i className="fa fa-user"></i>
                                </a>
                                <a href="#" className="btn btn-light">
                                    <i className="fa fa-shopping-cart"></i>2
                                </a>
                            </div>
                            <div className="category-wrap d-none dropdown d-md-inline-block">
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        Mua sắm theo
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#">Máy móc / Phụ tùng cơ khí / Dụng cụ</Dropdown.Item>
                                        <Dropdown.Item href="#">Điện tử tiêu dùng / Thiết bị gia dụng</Dropdown.Item>
                                        <Dropdown.Item href="#">Xe hơi / Giao thông</Dropdown.Item>
                                        <Dropdown.Item href="#">Thời trang / Vải và sản phẩm vải</Dropdown.Item>
                                        <Dropdown.Item href="#">Nhà cửa & Vườn / Xây dựng / Đèn</Dropdown.Item>
                                        <Dropdown.Item href="#">Làm đẹp & Chăm sóc cá nhân / Sức khỏe</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl col-md-5 col-sm-12 flex-grow-1">
                            <form action="#" className="search-header">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm"
                                    />
                                    <select
                                        className="custom-select border-right"
                                        name="category_name"
                                    >
                                        <option value="">Tất cả loại</option>
                                        <option value="codex">Đặc biệt</option>
                                        <option value="comments">Chỉ tốt nhất</option>
                                        <option value="content">Mới nhất</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg col-md" style={{ flexGrow: 0.2 }}>
                            <button className="btn btn-block btn-primary" type="submit">
                                {" "}
                                Tìm kiếm{" "}
                            </button>
                        </div>
                        <div className="col-lg col-md" style={{ flexGrow: 0.2 }}>
                            <button className="btn btn-block btn-primary" type="submit">
                                {" "}
                                Nâng cao{" "}
                            </button>
                        </div>
                    </div>
                </section>
                <nav className="navbar navbar-main navbar-expand pl-0">
                    <ul className="navbar-nav flex-wrap">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Home">
                                Trang chủ
                            </Link>
                        </li>
                        <Navbar.Collapse id="navbar-dark-example">
                            <Nav>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title="Danh sách sản phẩm"
                                    menuVariant="dark"
                                >
                                    {categories.length > 0 &&
                                        categories.map((row) => (
                                            <NavDropdown.Item
                                                key={row.categoryId}
                                                href={`/ListingGrid?categoryId=${row.categoryId}`}
                                            >
                                                {row.categoryName}
                                            </NavDropdown.Item>
                                        ))
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/ListingGrid"> Tất cả sản phẩm </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Điện tử
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Thời trang
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Làm đẹp
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Xe hơi
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Thể thao
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Nông trại và vườn
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Khuyến mãi
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Dưới $10
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header