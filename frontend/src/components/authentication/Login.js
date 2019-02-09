import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };
  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="post">
            <form className="form input-fields" onSubmit={this.onSubmit}>
              <div className="postinfotop">
                <h2>Log in to your account</h2>
              </div>

              <div className="posttext">
                <div
                  className={classnames("", {
                    "mb-4": !errors.email
                  })}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    className={classnames("form-control", {
                      "is-invalid": errors.email
                    })}
                    name="email"
                    value={this.state.email}
                    onChange={this.changeText}
                  />
                  {errors.email && (
                    <div className="invalid-feedback mb-2">{errors.email}</div>
                  )}
                </div>

                <div
                  className={classnames("", {
                    "mb-4": !errors.email
                  })}
                >
                  <input
                    type="password"
                    placeholder="Password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                    id="pass"
                    name="password"
                    value={this.state.password}
                    onChange={this.changeText}
                  />
                  {errors.password && (
                    <div className="invalid-feedback mb-2">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="clearfix" />
              </div>
              {/* Sign up */}
              <div className="postinfobot">
                <div className="float-right postreply">
                  <div className="float-left">
                    <button type="submit" className="btn btn-success">
                      Log in
                    </button>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
