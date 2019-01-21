import React, { Component } from "react";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);
  };
  render() {
    return (
      <div className="post">
        <form className="form newuser" onSubmit={this.onSubmit}>
          <div className="postinfotop">
            <h2>Log in to your account</h2>
          </div>

          <div className="posttext">
            <div>
              <input
                type="text"
                placeholder="Email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.changeText}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                id="pass"
                name="password"
                value={this.state.password}
                onChange={this.changeText}
              />
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
    );
  }
}
export default Login;
