import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER } from '../../api/apiService';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            userId: 0,
            firstName,
            lastName,
            mobileNumber,
            email,
            password,
            roles: [
                {
                    roleId: 102,
                    roleName: "USER",
                },
            ],
            address: {
                addressId: 0, 
                street: "string",
                buildingName: "string",
                city,
                state: "string",
                country,
                pincode: "string",
            },
        };

        try {
            const response = await REGISTER(body);
            console.log(response.data);
            window.alert("Đăng ký thành công!");
            navigate("/Login");

        } catch (error) {
            console.log("Error trong quá trình đăng ký:", error);
            window.alert("Đăng ký thất bại: " + error.message);

        }
    };


    return (
        <section className="section-content padding-y">

            <div className="card mx-auto" style={{ maxWidth: "520px", marginTop: "40px" }}>
                <article className="card-body">
                    <header className="mb-4"><h4 className="card-title">Đăng ký</h4></header>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col form-group">
                                <label>Tên</label>
                                <input type="text" className="form-control" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div className="col form-group">
                                <label>Họ</label>
                                <input type="text" className="form-control" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input type="text" className="form-control" placeholder="" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Mật khẩu</label>
                            <input type="password" className="form-control" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Thành phố</label>
                                <input type="text" class="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Quốc gia</label>
                                <input type="text" class="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Đăng ký </button>
                        </div>
                    </form>
                </article>
            </div>
            <p className="text-center mt-4">Bạn đã có tài khoản? <Link to="/Login">Đăng nhập</Link></p>

        </section>
    );
}

export default Register;