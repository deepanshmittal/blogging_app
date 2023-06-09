import React, { useContext, useEffect, useState } from "react";
import "./Single.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import axios from "axios";
import moment from "moment/moment";
import delete_img from "../../assets/delete.png";
import edit_img from "../../assets/edit.png";
import profile_img from "../../assets/profile_img.png";
import blog_img from "../../assets/blog_img.png";
import { AuthContext } from "../../context/authContext";
import DOMPurify from "dompurify";
import { API_URL } from "../../App";
import { Cookies } from "react-cookie";

const Single = () => {
    const [post, setPost] = useState({});
    const cookies = new Cookies();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    const postId = location.pathname.split("/")[2];

    const { currentUser } = useContext(AuthContext);

    const handleDelete = async () => {
        try {
            console.log(cookies.get("jwt"));
            await axios.delete(`${API_URL}/post/${postId}`, {
                data: { jwt: cookies.get("jwt") || null },
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/post/${postId}`);
                setPost(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postId]);

    return (
        <div className="single">
            <div className="content">
                {post.blog_img_url ? (
                    <img src={post.blog_img_url} alt="" />
                ) : (
                    <img src={blog_img} alt="" />
                )}
                <div className="user">
                    {post.user_profile_img_url ? (
                        <img src={post.user_profile_img_url} alt="" />
                    ) : (
                        <img src={profile_img} alt="" />
                    )}
                    <div className="info">
                        <span style={{ textTransform: "capitalize" }}>
                            {post.user_name}
                        </span>
                        <p>Posted {moment(post.updated_on).fromNow()}</p>
                    </div>
                    {currentUser.id === post.user_id && (
                        <div className="edit">
                            <Link to={`/write?edit=${postId}`} state={post}>
                                <img src={edit_img} alt="" />
                            </Link>
                            <img
                                src={delete_img}
                                alt=""
                                onClick={handleDelete}
                            />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.description),
                    }}
                ></p>
            </div>
            <div className="menu">
                <Menu cat={post.category} />
            </div>
        </div>
    );
};

export default Single;
