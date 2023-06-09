import React from "react";
import "./Footer.scss";
import blog_logo from "../../assets/blog.png";
import linkedin from "../../assets/linkedin.png";
import codeforces from "../../assets/codeforces.png";
import leetcode from "../../assets/leetcode.png";
import github from "../../assets/github.png";

const Footer = () => {
    return (
        <footer>
            <img src={blog_logo} alt="" />
            <div className="social-links">
                <a href="https://www.linkedin.com/in/deepansh-mittal-17bba51bb/">
                    <img src={linkedin} alt="" />
                </a>
                <a href="https://codeforces.com/profile/deepansh09">
                    <img src={codeforces} alt="" />
                </a>
                <a href="https://leetcode.com/deepanshmittal09/">
                    <img src={leetcode} alt="" />
                </a>
                <a href="https://github.com/deepanshmittal/blogging_app">
                    <img src={github} alt="" />
                </a>
            </div>
            <span>
                Developed by <b>Deepansh Mittal</b>
            </span>
        </footer>
    );
};

export default Footer;
