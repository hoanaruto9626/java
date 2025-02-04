import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GET_ALL, GET_ID, POST_ADD } from "../../../api/apiService";


const SectionContent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page")) || 1;
    const categoryId = queryParams.get("categoryId");

    const cartId = localStorage.getItem('cartId');
    const emailId = localStorage.getItem('email');

    const numItems = 5;

    const handlePageChange = (page) => {
        if (categoryId) {
            navigate(`/ListingGrid?page=${page}&categoryId=${categoryId}`);
        } else {
            navigate(`/ListingGrid?page=${page}`);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pageNumber = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumber.push(
                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                    <Link
                        className="page-link"
                        to={`?page=${i}${categoryId ? `&categoryId=${categoryId}` : ''}`}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </Link>
                </li>
            );
        }
        return pageNumber;
    };

    useEffect(() => {
        setLoading(true);
        const params = {
            pageNumber: currentPage,
            pageSize: numItems,
            sortBy: "productId",
            sortOrder: "asc",
        };
        if (categoryId !== null) {
            GET_ALL(`categories/${categoryId}/products`, params)
                .then((response) => {
                    console.log("Products by category:", response);
                    setProducts(response.content);
                    setTotalPages(response.totalPages);
                    setTotalElements(response.totalElements);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch products:', error);
                    setLoading(false);
                });

            GET_ID("categories", categoryId)
                .then((item) => {
                    console.log("Category details:", item);
                    setCategories(item)
                })
                .catch(error => {
                    console.error('Failed to fetch category:', error);
                });
        } else {
            GET_ALL("products", params)
                .then((response) => {
                    console.log("All products:", response);
                    setProducts(response.content);
                    setTotalPages(response.totalPages);
                    setTotalElements(response.totalElements);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Failed to fetch products:', error);
                    setLoading(false);
                });
            setCategories({ categoryName: "Tất cả sản phẩm" });
        }
    }, [categoryId, currentPage, numItems]);

    const handleAddToCart = async (productId) => {
            if (!cartId) {
                console.log("No cart ID found. Please create a cart first.");
                return;
            }    
            try {
                const response = await GET_ALL(`users/${emailId}/carts/${cartId}`);
                const existingProducts = response.cartItemDTOs || [];
    
                const isProductInCart = existingProducts.some(item => item.product.productId === Number(productId));
    
                if (isProductInCart) {
                    alert("Sản phẩm này đã được thêm vào giỏ hàng!");
                    return;
                }
        
                const quantity = 1;
                await POST_ADD(`carts/${cartId}/products/${productId}/quantity/${quantity}`, {cartId, productId, quantity});
                alert("Đã thêm vào giỏ hàng thành công!");
    
            } catch (error) {
                console.error("Error adding to cart:", error);
                alert("Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau.");
            }
        }

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="card mb-3">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2">Bạn đang ở đây:</div>
                            <nav className="col-md-8">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#" style={{ textDecoration: "none" }}>
                                            Trang chủ
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <a href="#" style={{ textDecoration: "none" }}>
                                            {categories?.categoryName}
                                        </a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-md-2">Lọc theo</div>
                            <div className="col-md-10">
                                {/* Filters option */}
                            </div>
                        </div>
                    </div>
                </div>
                <header className="mb-3">
                    <div className="form-inline">
                        <strong className="mr-md-auto">Kết quả tìm kiếm:</strong>
                        <select
                            className="mr-2 form-control"
                        >
                            <option>Sản phẩm mới nhất</option>
                            <option>Đang thị hành</option>
                            <option>Phổ biến nhất</option>
                            <option>Rẻ nhất</option>
                        </select>
                        <div className="btn-group">
                            <a href="#" className="btn btn-light active">
                                <i className="fa fa-bars"></i>
                            </a>
                            <a href="#" className="btn btn-light">
                                <i className="fa fa-th"></i>
                            </a>
                        </div>
                    </div>
                </header>
                {/* Product grid */}
                <div className="row">
                    {!loading &&
                        products.length > 0 &&
                        products.map((row) => (
                            <div className="col-md-3" key={row.productId}>
                                <figure className="card card-product-grid">
                                    <div className="img-wrap">
                                        <span className="badge badge-danger"> MỚI </span>
                                        <img src={`http://localhost:8080/api/public/products/image/${row.image}`} alt={row.productName} />
                                    </div>
                                    <figcaption className="info-wrap">
                                        <Link to={`/Detail?productId=${row.productId}&categoryId=${row.category.categoryId}`} className="title mb-2" style={{ textDecoration: "none" }}>
                                            {row.productName.length > 30 ? `${row.productName.substring(0, 30)}...` : row.productName}
                                        </Link>
                                        <div className="price-wrap">
                                            <span className="price">{(row.specialPrice * 1000).toLocaleString("vi-VN")} đ</span>
                                            <small className="text-muted"> / mỗi sản phẩm</small>
                                        </div>
                                        <p className="price-wrap">
                                            {row.quantity} Cái{" "}
                                            <small className="text-muted">(Số lượng tối thiểu)</small>
                                        </p>
                                        <p className="text-muted">{row.category.categoryName}</p>
                                        <hr />
                                        <p className="mb-3">
                                            <span className="tag">
                                                <i className="fa fa-check"></i> Đã xác minh
                                            </span>
                                        </p>
                                        <label className="custom-control mb-3 custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">Thêm vào so sánh</div>
                                        </label>
                                        <div>
                                            <button onClick={() => handleAddToCart(row.productId)} className="btn btn-primary" style={{ marginRight: "10px" }}>
                                                <i className="fas fa-shopping-cart"></i>
                                            </button>
                                            <button className="btn btn-outline-primary">
                                                <i className="fa fa-envelope"></i> Liên hệ nhà cung cấp
                                            </button>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        ))}
                    {loading && <p>Loading...</p>}
                </div>
                {/* Pagination */}
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disable" : ""}`}>
                            <button
                                className="page-link"
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            >
                                Trang trước
                            </button>
                        </li>
                        {renderPageNumbers()}
                        <li className={`page-item ${currentPage === totalPages ? "disable" : ""}`}>
                            <button
                                className="page-link"
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                            >
                                Trang sau
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="box text-center">
                    <p>Bạn đã tìm thấy điều bạn tìm kiếm chứ?</p>
                    <a href="#" className="btn btn-light">
                        Có
                    </a>
                    <a href="#" className="btn btn-light" style={{ marginLeft: "10px" }}>
                        Không
                    </a>
                </div>
            </div>
        </section>
    );
}

export default SectionContent