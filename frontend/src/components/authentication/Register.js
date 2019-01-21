import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
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
    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="post">
        <form className="form newuser" onSubmit={this.onSubmit}>
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
                  <div className="invalid-feedback mb-2">{errors.password}</div>
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
                <a href="">
                  <i className="far fa-smile" />
                </a>
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
    );
  }
}
export default Register;
