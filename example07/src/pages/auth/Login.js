import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../api/apiService";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { email, password };
        console.log("Body gửi lên API:", body);

        try {
            setIsLoading(true);
            const response = await LOGIN(body);
            console.log("Response từ API:", response);

            if (response && response.data) {
                const token = response.data['jwt-token'];
                console.log("Token nhận được:", token);

                if (token) {
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('email', email);

                    // Fetch thông tin user để lấy cartId
                    const userResponse = await axios.get(
                        `http://localhost:8080/api/public/users/email/${email}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        }
                    );

                    const cartId = userResponse.data.cart.cartId;
                    console.log("Cart ID nhận được:", cartId);

                    localStorage.setItem('cartId', cartId);

                    login(token, email);
                    setIsLoading(false);
                    window.alert("Đăng nhập thành công");
                    navigate("/");
                } else {
                    window.alert("Token not found in response");
                }
            } else {
                window.alert("Login response is missing data");
            }
        } catch (error) {
            console.log("Error trong quá trình đăng nhập:", error);
            window.alert("Login failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
            {/* <!-- ============================ COMPONENT LOGIN   ================================= --> */}
            <div className="card mx-auto" style={{ maxWidth: "380px", marginTop: "100px" }}>
                <div className="card-body">
                    <h4 className="card-title mb-4">Đăng nhập</h4>
                    <form onSubmit={handleSubmit}>
                        <a href="#" className="btn btn-facebook btn-block mb-2">
                            <i className="fab fa-facebook-f"></i> &nbsp  Sign in with Facebook
                        </a>
                        <a href="#" className="btn btn-google btn-block mb-4">
                            <i className="fab fa-google"></i> &nbsp  Sign in with Google
                        </a>
                        <div className="form-group">
                            <input
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <a href="#" className="float-right">Quên mật khẩu?</a>
                            <label className="float-left custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" checked="" />
                                <div className="custom-control-label"> Nhớ mật khẩu </div>
                            </label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}  </button>
                        </div>
                    </form>
                </div>
            </div>

            <p className="text-center mt-4">Bạn chưa có tài khoản? <Link to="/Register">Đăng ký</Link></p>
            <br /><br />
            {/* <!-- ============================ COMPONENT LOGIN  END.// ================================= --> */}
        </section>
    )
};

export default Login;