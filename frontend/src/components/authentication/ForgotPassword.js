import React, { Component } from "react";
import classnames from "classnames";
import validator from "validator";

class ForgotPassword extends Component {
  state = {
    email: "",
    error: false
  };

  changeText = e => {
    this.validate(e.target.value);
    this.setState({ email: e.target.value });
    // console.log(this.state);
  };

  sendMail = e => {
    e.preventDefault();
    const newEmail = {
      email: this.state.email
    };
    console.log(newEmail);
  };

  validate = email => {
    this.setState({
      error: validator.isEmpty(email)
        ? "Email is required"
        : !validator.isEmail(email)
        ? "Not valid email"
        : false
    });
  };

  render() {
    const { error } = this.state;
    console.log(error);

    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="post">
            <form className="form input-fields" onSubmit={this.sendMail}>
              <div className="postinfotop">
                <h2>Forgot password</h2>
              </div>
              <div className="posttext">
                <p>
                  Enter the email address or username associated with your
                  account
                </p>
                <div
                  className={classnames("", {
                    "mb-4": !error
                  })}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    className={classnames("form-control", {
                      "is-invalid": error
                    })}
                    name="email"
                    value={this.state.email}
                    onChange={this.changeText}
                  />
                  {error && (
                    <div className="invalid-feedback mb-2">{error}</div>
                  )}
                </div>
              </div>
              <div className="postinfobot">
                <div className="float-right postreply">
                  <div className="float-left">
                    <button
                      disabled={error}
                      type="submit"
                      className="btn btn-success"
                    >
                      Reset
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

export default ForgotPassword;
