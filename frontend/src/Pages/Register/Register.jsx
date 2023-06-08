import React, { useState } from "react";
import "./Register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
const Register = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post("/register", inputs);
            // console.log(response);
            await axios.post(`${API_URL}/register`, inputs);
            navigate("/login");
        } catch (error) {
            setErr(error.response.data.email[0]);
            // setErr(error.response.statusText)
            // console.log(error);
        }
    };

    return (
        <div className="auth">
            <h1>Register Account</h1>
            <form action="">
                {/* <div className="name">
                    <input type="text" name="" id="" placeholder='Last Name' />
                </div> */}
                <input
                    style={{ textTransform: "capitalize" }}
                    type="text"
                    name="name"
                    id=""
                    placeholder="Enter Name..."
                    onChange={handleChange}
                />
                <input
                    required
                    type="email"
                    name="email"
                    id=""
                    placeholder="Enter Email..."
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    name="password"
                    id=""
                    placeholder="Enter Password..."
                    onChange={handleChange}
                />
                {/* <input required type="password" name="" id="" placeholder='Confirm Password...' /> */}
                <button type="submit" onClick={handleSubmit}>
                    Register
                </button>
                {err && <p style={{ textTransform: "capitalize" }}>{err}</p>}
                <span>
                    Have an account?{" "}
                    <Link to="/login" className="link">
                        Login
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Register;
