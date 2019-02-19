import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="post">
            <form className="form input-fields" onSubmit={this.onSubmit}>
              <div className="postinfotop">
                <h2>Create New Account</h2>
              </div>

              <div className="posttext">
                <div
                  className={classnames("", {
                    "mb-4": !errors.name
                  })}
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className={classnames("form-control", {
                      "is-invalid": errors.name
                    })}
                    name="name"
                    value={this.state.name}
                    onChange={this.changeText}
                  />
                  {errors.name && (
                    <div className="invalid-feedback mb-2">{errors.name}</div>
                  )}
                </div>
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
                <div className="row">
                  <div
                    className={classnames("col-lg-6 col-md-6", {
                      "mb-4": !errors.password
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
                  <div
                    className={classnames("col-lg-6 col-md-6", {
                      "mb-4": !errors.password2
                    })}
                  >
                    <input
                      type="password"
                      placeholder="Retype Password"
                      className={classnames("form-control", {
                        "is-invalid": errors.password2
                      })}
                      id="pass2"
                      name="password2"
                      value={this.state.password2}
                      onChange={this.changeText}
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback mb-2">
                        {errors.password2}
                      </div>
                    )}
                  </div>
                </div>
                <div className="clearfix" />
              </div>
              {/* Sign up */}
              <div className="postinfobot">
                <div className="agreebox float-left">
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    className="form-control"
                  />
                </div>

                <div className="float-left">
                  <label htmlFor="check">
                    I agree with the Terms and Conditions of this site
                  </label>
                </div>

                <div className="float-right postreply">
                  <div className="float-left smile">
                    <i className="far fa-smile" />
                  </div>

                  <div className="float-left">
                    <button type="submit" className="btn btn-success">
                      Sign Up
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
