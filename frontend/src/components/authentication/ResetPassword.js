import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import classnames from "classnames";
import validator from "validator";
import axios from "axios";

class ResetPassword extends Component {
  state = {
    id: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
    axios
      .get("/api/users/reset", {
        params: {
          resetPasswordToken: this.props.match.params.token
        }
      })
      .then(res => {
        this.setState({ id: res.data.id });
      })
      .catch(err => {
        this.props.history.push("/login");
        alert("Token does't exist");
      });
  };

  validatePassword = () => {
    if (validator.isEmpty(this.state.password)) {
      this.setState({
        errors: { ...this.state.errors, password: "New password is required" }
      });
    } else if (!validator.isLength(this.state.password, { min: 6, max: 30 })) {
      this.setState({
        errors: {
          ...this.state.errors,
          password: "Password must be between 6 and 30 characters"
        }
      });
    } else {
      this.setState({ errors: {} });
    }
  };
  validateRepeatPassword = () => {
    if (validator.isEmpty(this.state.password2)) {
      this.setState({
        errors: {
          ...this.state.errors,
          password2: "Repeat password is required"
        }
      });
    } else if (this.state.password !== this.state.password2) {
      this.setState({
        errors: { ...this.state.errors, password2: "Passwords are not equal" }
      });
    } else {
      this.setState({
        errors: {}
      });
    }
  };

  changeTextPassword = e => {
    this.setState({ password: e.target.value }, () => {
      this.validatePassword();
    });
  };

  changeTextRepeatPassword = e => {
    this.setState({ password2: e.target.value }, () => {
      this.validateRepeatPassword();
    });
  };

  updatePassword = e => {
    e.preventDefault();
    const newPass = {
      id: this.state.id,
      password: this.state.password,
      resetPasswordToken: this.props.match.params.token
    };

    axios
      .put("/api/users/updatePassword", newPass)
      .then(res => this.props.history.push("/login"))
      .catch(err => console.log(err));
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="post">
            <form className="form input-fields" onSubmit={this.updatePassword}>
              <div className="postinfotop">
                <h2>Reset password</h2>
              </div>
              <div className="posttext">
                <div
                  className={classnames("", {
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
                    onChange={this.changeTextPassword}
                  />
                  {errors.password && (
                    <div className="invalid-feedback mb-2">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div
                  className={classnames("", {
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
                    onChange={this.changeTextRepeatPassword}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback mb-2">
                      {errors.password2}
                    </div>
                  )}
                </div>
              </div>
              <div className="postinfobot">
                <div className="float-right postreply">
                  <div className="float-left">
                    <button
                      disabled={
                        !isEmpty(errors) ||
                        !this.state.password ||
                        !this.state.password2
                      }
                      type="submit"
                      className="btn btn-success"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(ResetPassword);
