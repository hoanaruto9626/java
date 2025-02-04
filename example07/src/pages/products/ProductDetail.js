import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ALL, GET_ID, POST_ADD, PUT_EDIT } from "../../api/apiService";
import { Col, InputGroup, Row } from "react-bootstrap";
import { Spinner } from 'react-bootstrap';

const cardTextStyle = {
    width: "80%",
}

const ProductDetail = () => {
    const [categories, setCategories] = useState(null);
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [dataChanged, setDataChanged] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const productId = queryParams.get("productId");
    const categoryId = queryParams.get("categoryId");

    const cartId = localStorage.getItem('cartId');
    const emailId = localStorage.getItem('email');

    useEffect(() => {
        setLoading(true);
        if (productId) {
            Promise.all([
                GET_ID("products", productId),
                GET_ID("categories", categoryId),
                GET_ALL(`users/${emailId}/carts/${cartId}`)
            ])
            .then(([productResponse, categoryResponse, cartResponse]) => {
                setProducts(productResponse);
                setCategories(categoryResponse);
                
                const cartItems = cartResponse?.cartItemDTOs || [];
                const existingItem = cartItems.find(item => item?.product?.productId === Number(productId));
                setIsProductInCart(!!existingItem);
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [productId, categoryId, emailId, cartId, dataChanged]);

    const handleIncrease = () => {
        setQuantity(prev => {
            if (products && products.quantity) {
                if (prev < products.quantity) {
                    return prev + 1;
                } else {
                    return prev;
                }
            } else {
                return prev;
            }
        });
    };

    const handleDecrease = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = async () => {
        if (!cartId) {
            console.log("No cart ID found. Please create a cart first.");
            return;
        }

        if (!products) {
            console.error("No product details available.");
            return;
        }

        try {
            await POST_ADD(`carts/${cartId}/products/${productId}/quantity/${quantity}`, cartId, productId, quantity);
            alert("Đã thêm vào giỏ hàng thành công!");
            setDataChanged(prev => !prev);

        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Lỗi khi thêm vào giỏ hàng. Vui lòng thử lại sau.");
        }
    }

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    return (
        <>
            <section className="py-3 bg-light">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#" style={{ textDecoration: "none"}}>Trang chủ</a></li>
                        <li className="breadcrumb-item"><a href="#" style={{ textDecoration: "none"}}>{categories?.categoryName || "Danh mục"}</a></li>
                        <li className="breadcrumb-item"><a href="#" style={{ textDecoration: "none"}}>{products?.productName || "Sản phẩm"}</a></li>
                    </ol>
                </div>
            </section>

            <section className="section-content bg-white padding-y">
                <div className="container">

                    <div className="row">
                        <aside className="col-md-6">
                            <div className="card">
                                <article className="gallery-wrap">
                                    <div className="img-big-wrap">
                                        <div> <a href="#"><img src={`http://localhost:8080/api/public/products/image/${products?.image}`} /></a></div>
                                    </div>
                                    <div className="thumbs-wrap">
                                        <a href="#" className="item-thumb"> <img src={`http://localhost:8080/api/public/products/image/${products?.image}`} /></a>
                                        <a href="#" className="item-thumb"> <img src={`http://localhost:8080/api/public/products/image/${products?.image}`} /></a>
                                        <a href="#" className="item-thumb"> <img src={`http://localhost:8080/api/public/products/image/${products?.image}`} /></a>
                                        <a href="#" className="item-thumb"> <img src={`http://localhost:8080/api/public/products/image/${products?.image}`} /></a>
                                    </div>
                                </article>
                            </div>
                        </aside>
                        <main className="col-md-6">
                            <article className="product-info-aside">

                                <h2 className="title mt-3"> {products?.productName} </h2>

                                <div className="rating-wrap my-3">
                                    <ul className="rating-stars">
                                        <li style={{ cardTextStyle }} className="stars-active">
                                            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </li>
                                        <li>
                                            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </li>
                                    </ul>
                                    <small className="label-rating text-muted">132 reviews</small>
                                    <small className="label-rating text-success"> <i className="fa fa-clipboard-check"></i> 154 orders </small>
                                </div>

                                <div className="mb-3">
                                    <var className="price h4">
                                        {(products && products.price ? (products.price * 1000).toLocaleString("vi-VN") : "0")} đ
                                    </var>
                                </div>

                                <p>
                                    {products?.description}
                                </p>

                                <dl className="row">
                                    <dt className="col-sm-3">Manufacturer</dt>
                                    <dd className="col-sm-9"><a href="#">Great textile Ltd.</a></dd>

                                    <dt className="col-sm-3">Article number</dt>
                                    <dd className="col-sm-9">596 065</dd>

                                    <dt className="col-sm-3">Guarantee</dt>
                                    <dd className="col-sm-9">2 year</dd>

                                    <dt className="col-sm-3">Delivery time</dt>
                                    <dd className="col-sm-9">3-4 days</dd>

                                    <dt className="col-sm-3">Availabilty</dt>
                                    <dd className="col-sm-9">in Stock</dd>
                                </dl>

                                <Row className="form-row mt-4">
                                    {!isProductInCart ? (
                                        <Col md="auto" className="form-group col-md flex-grow-0">
                                            <InputGroup className="input-group mb-3 input-spinner">
                                                <div className="input-group-prepend">
                                                    <button onClick={handleDecrease} style={{ borderColor: "#e5e7ea" }} className="btn btn-light" type="button" id="button-plus"> &minus; </button>
                                                </div>
                                                <input type="text" className="form-control" value={quantity} />
                                                <div className="input-group-append">
                                                    <button onClick={handleIncrease} style={{ borderColor: "#e5e7ea" }} className="btn btn-light" type="button" id="button-minus"> + </button>
                                                </div>
                                            </InputGroup>
                                        </Col>
                                    ) : null }
                                    <div className="form-group col-md">
                                        {!isProductInCart ? (
                                            <button onClick={handleAddToCart} className="btn btn-primary" style={{ marginRight: "12px" }}>
                                                <i className="fas fa-shopping-cart"></i> <span className="text">Thêm giỏ hàng</span>
                                            </button>
                                        ) : (
                                            <button className="btn btn-secondary" style={{ marginRight: "12px" }} disabled>
                                                <i className="fas fa-check"></i> <span className="text">Đã có trong giỏ hàng</span>
                                            </button>
                                        )}

                                        <a href="#" className="btn btn-light">
                                            <i className="fas fa-envelope"></i> <span className="text">Liên hệ nhà cung cấp</span>
                                        </a>
                                    </div>
                                </Row>


                            </article>
                        </main>
                    </div>

                </div>
            </section>

            <section className="section-name padding-y bg">
                <div className="container">

                    <div className="row">
                        <div className="col-md-8">
                            <h5 className="title-description">Description</h5>
                            <p>
                                Lava stone grill, suitable for natural gas, with cast-iron cooking grid, piezo ignition, stainless steel
                                burners, water tank, and thermocouple. Thermostatic adjustable per zone. Comes complete with lava rocks.
                                Adjustable legs. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.
                            </p>
                            <ul className="list-check">
                                <li>Material: Stainless steel</li>
                                <li>Weight: 82kg</li>
                                <li>built-in drip tray</li>
                                <li>Open base for pots and pans</li>
                                <li>On request available in propane execution</li>
                            </ul>

                            <h5 className="title-description">Specifications</h5>
                            <table className="table table-bordered">
                                <tr>
                                    <th colspan="2">Basic specs</th>
                                </tr>
                                <tr>
                                    <td>Type of energy</td>
                                    <td>Lava stone</td>
                                </tr>
                                <tr>
                                    <td>Number of zones</td>
                                    <td>2</td>
                                </tr>
                                <tr>
                                    <td>Automatic connection </td>
                                    <td> <i className="fa fa-check text-success"></i> Yes </td>
                                </tr>

                                <tr>
                                    <th colspan="2">Dimensions</th>
                                </tr>
                                <tr>
                                    <td>Width</td>
                                    <td>500mm</td>
                                </tr>
                                <tr>
                                    <td>Depth</td>
                                    <td>400mm</td>
                                </tr>
                                <tr>
                                    <td>Height </td>
                                    <td>700mm</td>
                                </tr>

                                <tr>
                                    <th colspan="2">Materials</th>
                                </tr>
                                <tr>
                                    <td>Exterior</td>
                                    <td>Stainless steel</td>
                                </tr>
                                <tr>
                                    <td>Interior</td>
                                    <td>Iron</td>
                                </tr>

                                <tr>
                                    <th colspan="2">Connections</th>
                                </tr>
                                <tr>
                                    <td>Heating Type</td>
                                    <td>Gas</td>
                                </tr>
                                <tr>
                                    <td>Connected load gas</td>
                                    <td>15 Kw</td>
                                </tr>

                            </table>
                        </div>

                        <aside className="col-md-4">

                            <div className="box">

                                <h5 className="title-description">Files</h5>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>

                                <h5 className="title-description">Videos</h5>


                                <article className="media mb-3">
                                    <a href="#"><img className="img-sm mr-3" src={require("../../assets/images/posts/3.jpg")} /></a>
                                    <div className="media-body">
                                        <h6 className="mt-0"><a href="#">How to use this item</a></h6>
                                        <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin </p>
                                    </div>
                                </article>

                                <article className="media mb-3">
                                    <a href="#"><img className="img-sm mr-3" src={require("../../assets/images/posts/2.jpg")} /></a>
                                    <div className="media-body">
                                        <h6 className="mt-0"><a href="#">New tips and tricks</a></h6>
                                        <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin </p>
                                    </div>
                                </article>

                                <article className="media mb-3">
                                    <a href="#"><img className="img-sm mr-3" src={require("../../assets/images/posts/1.jpg")} /></a>
                                    <div className="media-body">
                                        <h6 className="mt-0"><a href="#">New tips and tricks</a></h6>
                                        <p className="mb-2"> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
                                            sollicitudin </p>
                                    </div>
                                </article>



                            </div>
                        </aside>
                    </div>

                </div>
            </section>
        </>
    );
}

export default ProductDetail;