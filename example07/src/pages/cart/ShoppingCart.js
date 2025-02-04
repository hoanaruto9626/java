import React, { useEffect, useState } from 'react';
import { Col, InputGroup, Row } from 'react-bootstrap';
import { DELETE_ID, GET_ALL, PUT_EDIT } from '../../api/apiService';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    const cartId = localStorage.getItem('cartId');
    const email = localStorage.getItem('email');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                GET_ALL(`users/${email}/carts/${cartId}`)
                    .then((item) => {
                        console.log("Cart:", item.cartItemDTOs);
                        setCartItems(item.cartItemDTOs);
                    })
                    .catch(error => {
                        console.error('Failed to fetch product:', error);
                    });
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [email, cartId]);

    const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0);

    const handleDeleteItem = async (productId) => {
        try {
            // Gọi API để xóa sản phẩm khỏi giỏ hàng
            await DELETE_ID(`carts/${cartId}/product/${productId}`);

            // Cập nhật lại danh sách sản phẩm trong giỏ hàng
            const updatedCartItems = cartItems.filter(item => item.product.productId !== productId);
            setCartItems(updatedCartItems);

            alert("Xóa sản phẩm khỏi giỏ hàng thành công!");
        } catch (error) {
            console.error("Error deleting item from cart:", error);
            alert("Lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại sau.");
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await GET_ALL(`users/${email}/carts/${cartId}`);
            setCartItems(response.cartItemDTOs || []);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleIncreaseQuantity = async (productId) => {
        try {
            const item = cartItems.find(item => item.product.productId === productId);
            if (!item) return;
    
            if (item.quantity >= item.product.quantity) {
                alert(`Bạn đã đạt số lượng tối đa (${item.product.quantity}) cho sản phẩm này.`);
                return;
            }
    
            const newQuantity = item.quantity + 1;
    
            // Gọi API cập nhật số lượng
            const updateResponse = await PUT_EDIT(`carts/${cartId}/products/${productId}/quantity/${newQuantity}`);
    
            if (updateResponse) {
                await fetchCartItems(); // Tải lại giỏ hàng sau khi cập nhật
            } else {
                alert("Lỗi khi cập nhật số lượng sản phẩm.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            alert("Có lỗi xảy ra khi tăng số lượng.");
        }
    };

    const handleDecreaseQuantity = async (productId) => {
        try {
            // Tìm sản phẩm trong giỏ hàng
            const item = cartItems.find(item => item.product.productId === productId);
            if (!item || item.quantity <= 1) return; // Đảm bảo số lượng không nhỏ hơn 1

            // Giảm số lượng đi 1
            const newQuantity = item.quantity - 1;

            // Gọi API để cập nhật số lượng
            await PUT_EDIT(`carts/${cartId}/products/${productId}/quantity/${newQuantity}`);

            // Cập nhật lại state
            const updatedCartItems = cartItems.map(item =>
                item.product.productId === productId ? { ...item, quantity: newQuantity } : item
            );
            setCartItems(updatedCartItems);

        } catch (error) {
            console.error("Error decreasing quantity:", error);
            alert("Lỗi khi giảm số lượng sản phẩm. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <section className="section-content padding-y">
                <div className="container">

                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">
                                {cartItems.length === 0 ? ( // Kiểm tra nếu giỏ hàng rỗng
                                    <div className="text-center p-5">
                                        <h4>Giỏ hàng của bạn đang trống</h4>
                                        <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm!</p>
                                        <a href="/Home" className="btn btn-primary">Tiếp tục mua sắm</a>
                                    </div>
                                ) : (
                                    <>
                                        <table className="table table-borderless table-shopping-cart">
                                            <thead className="text-muted">
                                                <tr className="small text-uppercase">
                                                    <th scope="col">Product</th>
                                                    <th scope="col" width="120">Quantity</th>
                                                    <th scope="col" width="120">Price</th>
                                                    <th scope="col" className="text-right" width="200"> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item) => (
                                                    <tr key={item.cartItemId}>
                                                        <td>
                                                            <figure className="itemside">
                                                                <div className="aside"><img src={`http://localhost:8080/api/public/products/image/${item.product.image}`} alt={item.product.productName} className="img-sm" /></div>
                                                                <figcaption className="info">
                                                                    <a href="#" className="title text-dark" style={{ textDecoration: "none" }}>{item.product.productName}</a>
                                                                </figcaption>
                                                            </figure>
                                                        </td>
                                                        <Row className="form-row">
                                                            <Col md="auto" className="form-group col-md flex-grow-0">
                                                                <InputGroup className="input-group mb-3 input-spinner">
                                                                    <div className="input-group-prepend">
                                                                        <button onClick={() => handleDecreaseQuantity(item.product.productId)} style={{ borderColor: "#e5e7ea" }} className="btn btn-light" type="button" id="button-plus"> &minus; </button>
                                                                    </div>
                                                                    <input type="text" className="form-control" value={item.quantity} readOnly />
                                                                    <div className="input-group-append">
                                                                        <button onClick={() => handleIncreaseQuantity(item.product.productId)} style={{ borderColor: "#e5e7ea" }} className="btn btn-light" type="button" id="button-minus"> + </button>
                                                                    </div>
                                                                </InputGroup>
                                                            </Col>
                                                        </Row>
                                                        <td>
                                                            <div className="price-wrap">
                                                                <var className="price">{(item.product.price).toLocaleString("vi-VN")}đ</var>
                                                            </div>
                                                        </td>
                                                        <td className="text-right">
                                                            <a className="btn btn-light" data-toggle="tooltip" style={{ marginRight: "4px" }}> <i className="fa fa-heart"></i></a>
                                                            <a href="" className="btn btn-light" onClick={(e) => { e.preventDefault(); handleDeleteItem(item.product.productId); }}> Xóa</a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className="card-body border-top">
                                            <a href="#" className="btn btn-primary float-md-right"> Thanh toán <i
                                                className="fa fa-chevron-right"></i> </a>
                                            <a href="/Home" className="btn btn-light"> <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm </a>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="alert alert-success mt-3">
                                <p className="icontext"><i className="icon text-success fa fa-truck"></i> Giao hàng nhanh 1 - 2 ngày
                                </p>
                            </div>

                        </main>
                        <aside className="col-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Có phiếu giảm giá không?</label>
                                            <div className="input-group">
                                                <input type="text" className="form-control" name="" placeholder="Mã giảm giá" />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">Áp dụng</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>Tổng giá trị:</dt>
                                        <dd className="text-right">{totalPrice.toLocaleString("vi-VN")} đ</dd>
                                    </dl>
                                    <hr />
                                    <p className="text-center mb-3">
                                        <img src={require('../../assets/images/misc/payments.png')} height="26" />
                                    </p>

                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="section-name border-top padding-y">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </div>
            </section>
        </>
    );
};

export default ShoppingCart;