import React, { Component } from "react";
import logo from "../../images/logo.jpg";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  state = {
    background: "back1",
    home: ""
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearProfile();
  };

  onButtonClick = pic => e => {
    e.preventDefault();
    this.props.triggerBackground(pic);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div className="float-right">
        <div className="float-left">
          <Link to="/new-topic">
            <button type="button" className="btn btn-info mb-3 float-left">
              Create new topic
            </button>
          </Link>
        </div>
        <div className="env float-left">
          <i className="fa fa-envelope" />
        </div>

        <div className="avatar float-left dropdown">
          <a id="dropdownMenuLink" data-toggle="dropdown">
            <img
              height="36px"
              width="36px"
              className="fit-image"
              src={user.avatar}
              alt={user.name}
              title="You must have a Gravatar connected"
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
            <a className="dropdown-item" href="/" onClick={this.onLogoutClick}>
              Log out
            </a>
          </div>
          <b className="dropdown-toggle caret" />
        </div>
      </div>
    );

    const guestLinks = (
      <div className="float-right">
        <Link className="float-left mr-2" to="/login">
          <button className="btn btn-primary log-reg">Log in</button>
        </Link>
        <Link className="float-left" to="/register">
          <button className="btn btn-primary log-reg">Sign up</button>
        </Link>
      </div>
    );

    return (
      <div>
        <div className="headernav">
          <div className="container">
            <div className="row">
              <div className="col-lg-1 col-md-2 col-2 logo">
                <Link href="/" to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="col-lg-3 col-md-4 col-4 selecttopic">
                {this.props.isActive === true ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Dropdown
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu2"
                    >
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={this.onButtonClick("back1")}
                      >
                        Background(1)
                      </button>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={this.onButtonClick("back2")}
                      >
                        Background(2)
                      </button>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={this.onButtonClick("back3")}
                      >
                        Background(3)
                      </button>
                    </div>
                  </div>
                ) : null}
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
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearProfile }
)(withRouter(Navbar));
