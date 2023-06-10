import React, { useEffect, useState } from "react";
import "./Home.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";
import GridLoader from "react-spinners/GridLoader";

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
    const [loader, setLoader] = useState(false);
    const cat = useLocation().search;
    // console.log(cat)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoader(true);
                const response = await axios.get(`${API_URL}/posts${cat}`);
                setPosts(response.data);
                setLoader(false);
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
                {loader ? (
                    <div className="GridLoader">
                        <GridLoader
                            color="#36d6cd"
                            margin={30}
                            size={50}
                            speedMultiplier={1}
                            width={100}
                        />
                        <h1>Loading Data from Server...</h1>
                        <p>It might take upto 2 minutes for server to start</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={post.blog_img_url} alt="" />
                            </div>
                            <div className="content">
                                <Link className="link" to={`/post/${post.id}`}>
                                    <h1>{post.title}</h1>
                                </Link>
                                <p>
                                    <span className="limit">
                                        {getText(post.description)}
                                    </span>
                                </p>

                                <Link className="link" to={`/post/${post.id}`}>
                                    <button>Read More...</button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
