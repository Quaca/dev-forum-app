import React from "react";
import logo from "../../images/logo.jpg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-1 col-md-2 col-3 logo">
            <a href="/">
              <img src={logo} alt="" />
            </a>
          </div>
          <div className="col-lg-7 col-md-5 col-9">
            Copyrights 2018, website.com
          </div>
          <div className="col-lg-4 col-md-5 col-12 sociocontent">
            <ul className="socialicons">
              <li>
                <a href="/">
                  <i className="fab fa-facebook-square" />
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fab fa-google-plus" />
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fab fa-dribbble" />
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fas fa-cloud" />
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="fas fa-rss" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
