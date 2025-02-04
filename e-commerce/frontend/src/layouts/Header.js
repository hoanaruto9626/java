import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GET_ALL } from '../api/apiService';
import us from "../assets/images/icons/flags/US.png"
import logo from "../assets/images/logo.svg"

function Header() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const params = {
            pageNumber: 0,
            pageSize: 5,
            sortBy: 'categoryId',
            sortOrder: 'asc',
        };
        GET_ALL('categories', params)
            .then(response => {
                setCategories(response.content);
                console.log("response", response.content);
            })
            .catch(error => {
                console.error('Failed to fetch categories:', error);
            })
    }, []);

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
                            <span className='nav-link'>
                                Xin chào, <Link to="/Login">Đăng nhập</Link> hoặc
                                <Link to="/Register"> Đăng ký </Link>
                            </span>
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
                            <li className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link dropdown-toggle"
                                    data-toggle="dropdown"
                                >Danh sách theo dõi</a>
                                <ul className="dropdown-menu small">
                                    <li>
                                        <a className="dropdown-item" href="#">Sản phẩm thứ nhất</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Sản phẩm thứ hai</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Sản phẩm thứ ba</a>
                                    </li>
                                </ul>
                            </li>
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
                                <a className="nav-link" href="#">
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
                                <button
                                    type="button"
                                    class="btn btn-light dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    Mua sắm theo
                                </button>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">
                                        Máy móc / Phụ tùng cơ khí / Dụng cụ
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Điện tử tiêu dùng / Thiết bị gia dụng
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Xe hơi / Giao thông
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Thời trang / Vải và sản phẩm vải
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Nhà cửa &amp; Vườn / Xây dựng / Đèn
                                    </a>
                                    <a href="#" className="dropdown-item">
                                        Làm đẹp &amp; Chăm sóc cá nhân / Sức khỏe
                                    </a>
                                </div>
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
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Danh sách sản phẩm
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {categories.length > 0 &&
                                    categories.map((row)=>(
                                        <a
                                            className="dropdown-item"
                                            href={`/ListingGrid?categoryId=${row.categoryId}`}
                                        >
                                            {row.categoryName}
                                        </a>
                                    ))    
                                }
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/ListingGrid">
                                    Tất cả sản phẩm
                                </a>
                            </div>
                        </li>
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