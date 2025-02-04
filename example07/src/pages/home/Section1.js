import { useEffect, useState } from "react";
import { GET_ALL, POST_ADD } from "../../api/apiService";

import startsActive from "../../assets/images/icons/stars-active.svg";
import startsDisable from "../../assets/images/icons/starts-disable.svg";
import { Link } from "react-router-dom";

const cardTextStyle = {
    width: "80%"
}

const Section1 = ({ category }) => {
    const { categoryName, categoryId } = category;
    const [products, setProducts] = useState([]);

    const cartId = localStorage.getItem('cartId');
    const emailId = localStorage.getItem('email');

    useEffect(() => {
        const params = {
            pageNumber: 0,
            pageSize: 5,
            sortBy: 'productId',
            sortOrder: 'asc',
        };

        GET_ALL(`categories/${categoryId}/products`, params)
            .then(response => {
                console.log("response product", response.content);
                setProducts(response.content);
            })
            .catch(error => {
                console.log('Failed to fetch products: ', error);
            });
    }, [categoryId]);

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
        <section className="padding-bottom">
            <header className="section-heading mb-4">
                <h3 className="title-section">{categoryName}</h3>
            </header>

            <div className="row">
                {products.length > 0 &&
                    products.map((row) => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
                            <div className="card card-product-grid">
                                <Link to={`/Detail?productId=${row.productId}&categoryId=${categoryId}`} className="img-wrap">
                                    <img src={`http://localhost:8080/api/public/products/image/${row.image}`} alt={row.productName} />{" "}
                                </Link>
                                <figcaption className="info-wrap">
                                    <ul className="rating-stars mb-1">
                                        <li style={{ cardTextStyle }} className="stars-active">
                                            <img src={startsActive} alt="" />
                                        </li>
                                        <li>
                                            <img src={startsDisable} alt="" />
                                        </li>
                                    </ul>
                                    <div>
                                        <Link to="#" className="text-muted" style={{ textDecoration: "none" }}>{categoryName}</Link>
                                        <Link to={`/Detail?productId=${row.productId}&categoryId=${categoryId}`} className="title" style={{ textDecoration: "none" }}>
                                            {row.productName.length > 50 ? `${row.productName.substring(0, 50)}...` : row.productName}
                                        </Link>
                                    </div>
                                    <div className="price h5 mt-2">{(row.price * 1000).toLocaleString("vi-VN")} đ</div>
                                    <div>
                                        <button onClick={() => handleAddToCart(row.productId)} className="btn btn-primary" style={{ marginRight: "10px" }}>
                                            <i className="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </figcaption>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default Section1