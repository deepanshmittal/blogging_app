import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import { useCookies } from "react-cookie";
export const AuthContext = createContext();
axios.defaults.withCredentials = true;



export const AuthContextProvider = ({ children }) => {
    const [cookie, setCookie] = useCookies(['jwt']);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const response = await axios.post(`${API_URL}/login`, inputs);
        setCookie('jwt',response.data.jwt,{path:'/'})
        setCurrentUser(response.data);
    };

    const logout = async () => {
        await axios.post(`${API_URL}/logout`);
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
