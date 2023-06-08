import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
// const posts = [
//     {
//         id: 1,
//         img: "googlelogo_light_color_272x92dp.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 2,
//         img: "googlelogo_light_color_272x92dp.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 3,
//         img: "googlelogo_light_color_272x92dp.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 4,
//         img: "googlelogo_light_color_272x92dp.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
//     {
//         id: 5,
//         img: "googlelogo_light_color_272x92dp.png",
//         title: "twsy",
//         desc: "TEST DESC",
//     },
// ];

const Home = () => {
    const [posts, setPosts] = useState([]);

    const cat = useLocation().search;
    // console.log(cat)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/posts${cat}`);
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [cat]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="home">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={post.blog_img_url} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`${API_URL}/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.description)}</p>
                            <Link className="link" to={`${API_URL}/post/${post.id}`}>
                                <button>Read More...</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
