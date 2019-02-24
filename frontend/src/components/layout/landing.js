import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount = () => {
    if (!this.props.isActive) {
      this.props.triggerActive();
    }
    if (this.props.isAuthenticated) {
      this.props.history.push("/feed");
    }
  };

  componentWillUnmount = () => {
    if (this.props.isActive) {
      this.props.triggerInactive();
    }
  };

  render() {
    return (
      <div
        className="landing background"
        style={{ backgroundImage: `url(${this.props.background})` }}
      >
        <div className="dark-overlay landing-inner text-light">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Developer Connector</h1>
              <p className="lead">
                {" "}
                Create a developer profile/portfolio, share posts and get help
                from other developers
              </p>
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-light mr-2">
                Login
              </Link>
              <Link to="/feed" className="btn btn-lg btn-success mr-2">
                Posts
              </Link>
              <Link to="/profiles" className="btn btn-lg btn-primary mr-2">
                Profiles
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(withRouter(Landing));
