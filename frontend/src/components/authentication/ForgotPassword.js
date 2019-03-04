import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import validator from "validator";
import axios from "axios";

class ForgotPassword extends Component {
  state = {
    email: "",
    confirmed: "",
    error: false
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/feed");
    }
  };

  changeText = e => {
    this.validate(e.target.value);
    this.setState({ email: e.target.value });
  };

  sendMail = e => {
    e.preventDefault();

    const newEmail = {
      email: this.state.email
    };

    axios
      .post("/api/users/forgotPassword", newEmail)
      .then(res => {
        if (res.data === "Email is not in database") {
          this.setState({ error: res.data });
        } else if (res.data === "Recovery mail sent") {
          this.setState({ confirmed: res.data });
        }
      })
      .catch(err => console.log(err));
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

  renderConfirmed = () => {
    return (
      <div className="alert alert-success" role="alert">
        <h4 className="alert-heading">Well done!</h4>
        <p>Aww yeah, we sent you an email to the address you have provided.</p>
      </div>
    );
  };

  render() {
    const { error, confirmed } = this.state;

    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="post">
            {confirmed === "" ? (
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
                        disabled={error || !this.state.email}
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
            ) : (
              this.renderConfirmed()
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authenticated
});
export default connect(mapStateToProps)(ForgotPassword);
