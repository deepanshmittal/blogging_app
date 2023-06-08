import React, { useEffect, useState } from "react";
import "./Write.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../../App";
import { Cookies } from "react-cookie";

const Write = () => {
    const state = useLocation().state;
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [title, setTitle] = useState(state?.title || "");
    const [desc, setDesc] = useState(state?.description || "");
    const [image, setImage] = useState(null);
    const [cat, setCat] = useState(state?.category || "");

    const uploadImage = async () => {
        if (image == null) return null;
        try {
            const imageRef = ref(storage, `Blogs/${image.name + v4()}`);
            await uploadBytes(imageRef, image);
            const blog_img_url = await getDownloadURL(imageRef);
            console.log(blog_img_url);
            return blog_img_url;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        const blog_img_url = await uploadImage();
        e.preventDefault();
        try {
            state
                ? await axios.put(`${API_URL}/post/${state.id}`, {
                      category: cat,
                      title: title,
                      description: desc,
                      blog_img_url: blog_img_url,
                      jwt: cookies.get("jwt") || null,
                  })
                : await axios.post(`${API_URL}/post`, {
                      category: cat,
                      title: title,
                      description: desc,
                      blog_img_url: blog_img_url,
                      jwt: cookies.get("jwt") || null,
                  });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setDesc(state?.description || "");
        setTitle(state?.title || "");
        setCat(state?.category || "");
    }, [state]);

    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={desc}
                        onChange={setDesc}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="art"
                            id="art"
                            required
                            checked={cat === "art"}
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="science"
                            id="science"
                            checked={cat === "science"}
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="technology"
                            id="technology"
                            checked={cat === "technology"}
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="cinema"
                            id="cinema"
                            checked={cat === "cinema"}
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="design"
                            id="design"
                            checked={cat === "design"}
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="food"
                            id="food"
                            checked={cat === "food"}
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;
