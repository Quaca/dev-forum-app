import React from "react";
import logo from "../../images/logo.jpg";
import avt1 from "../../images/avt1.jpg";

const Navbar = () => {
  return (
    <div>
      <div className="headernav">
        <div className="container">
          <div className="row">
            <div className="col-lg-1 col-md-2 col-2 logo">
              <a href="index.html">
                <img src={logo} alt="" />
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-4 selecttopic">
              <div className="dropdown">
                <div
                  className="dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                >
                  Borderlands
                </div>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="/">
                    Borderlands 1
                  </a>
                  <a className="dropdown-item" href="/">
                    Borderlands 2
                  </a>
                  <a className="dropdown-item" href="/">
                    Borderlands 3
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 search d-none d-lg-block">
              <div className="wrap">
                <form action="/" method="post" className="form">
                  <div className="float-left txt">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search topics"
                    />
                  </div>
                  <div className="float-right">
                    <button className="btn btn-default" type="button">
                      <i className="fa fa-search" />
                    </button>
                  </div>
                  <div className="clearfix" />
                </form>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-10 avt">
              <div className="float-right">
                <div className="float-left">
                  <form action="" method="post" className="form">
                    <button className="btn btn-primary">Start new topic</button>
                  </form>
                </div>
                <div className="env float-left">
                  <i className="fa fa-envelope" />
                </div>

                <div className="avatar float-left dropdown">
                  <a href="#" id="dropdownMenuLink" data-toggle="dropdown">
                    <img
                      height="36px"
                      width="36px"
                      className="fit-image"
                      src={avt1}
                      alt=""
                    />
                  </a>
                  <div className="status green">&nbsp;</div>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a className="dropdown-item" href="/">
                      My profile
                    </a>
                    <a className="dropdown-item" href="/">
                      Inbox
                    </a>
                    <a className="dropdown-item" href="/">
                      Log out
                    </a>
                    <a className="dropdown-item" href="/">
                      Create account
                    </a>
                  </div>
                  <b className="dropdown-toggle caret" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
