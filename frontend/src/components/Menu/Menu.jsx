import React, { useEffect, useState } from "react";
import "./Menu.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import blog_img from "../../assets/blog_img.png";
import { API_URL } from "../../App";
// const posts = [
//     {
//         id: 1,
//         img: "chrome://branding/content/about-logo.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 2,
//         img: "chrome://branding/content/about-logo.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 3,
//         img: "chrome://branding/content/about-logo.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 4,
//         img: "chrome://branding/content/about-logo.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 5,
//         img: "chrome://branding/content/about-logo.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
// ];
const Menu = ({ cat }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts?cat=${cat}`);
                setPosts(response.data);
                // console.log(posts)
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);
    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    {post.blog_img_url ? (
                        <img src={post.blog_img_url} alt="" />
                    ) : (
                        <img src={blog_img} alt="" />
                    )}
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.id}`}>
                        <button>Read More...</button>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Menu;
