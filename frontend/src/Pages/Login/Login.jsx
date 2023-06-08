import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.post("/login", inputs);
            // console.log(response);
            // await axios.post("/login", inputs);
            await login(inputs);
            navigate("/");
        } catch (error) {
            setErr(error.response.data.detail);
            console.log(error);
        }
    };

    return (
        <div className="auth">
            <h1>Log In</h1>
            <form action="">
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
                <button type="submit" onClick={handleSubmit}>
                    Login
                </button>
                {err && <p>{err}</p>}
                <span>
                    New here?{" "}
                    <Link to="/register" className="link">
                        Register now
                    </Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
