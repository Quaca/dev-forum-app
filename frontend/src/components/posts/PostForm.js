import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../../actions/postActions";

import avt1 from "../../images/avt1.jpg";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";

class PostForm extends Component {
  state = {
    title: "",
    description: "",
    errors: {}
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      title: this.state.title,
      description: this.state.description,
      name: user.name,
      avatar: user.avatar
    };
    console.log(newPost);

    this.props.createPost(newPost, this.props.history);
    this.setState({ title: "", description: "" });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row">
        <div className="col-lg-8 col-12">
          <div className="post">
            <form action="" className="form newtopic" onSubmit={this.onSubmit}>
              <div className="topwrap">
                <div className="user-info float-left">
                  <div className="avatar">
                    <img
                      src={avt1}
                      alt=""
                      height="36px"
                      width="36px"
                      className="fit-image"
                    />
                  </div>

                  <div className="icons">
                    <img src={icon1} alt="" />
                    <img src={icon2} alt="" />
                  </div>
                </div>
                <div className="post-text float-left">
                  <input
                    type="text"
                    placeholder="Enter Topic Title"
                    className="form-control"
                    name="title"
                    value={this.state.title}
                    onChange={this.changeText}
                  />
                  {errors.title && (
                    <div className="invalid-feedback mb-2">{errors.title}</div>
                  )}
                  {/* <div className="row">
                    <div className="col-md-6">
                      <select
                        name="category"
                        id="category"
                        className="form-control"
                      >
                        <option value disabled selected>
                          Select category
                        </option>
                        <option value="opt1">Option 1</option>
                        <option value="opt2">Option 2</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <select
                        name="subcategory"
                        id="subcategory"
                        className="form-control"
                      >
                        <option value disabled selected>
                          Select subcategory
                        </option>
                        <option value="opt1">Option 1</option>
                        <option value="opt2">Option 2</option>
                      </select>
                    </div>
                  </div> */}
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.changeText}
                    name="description"
                    id="description"
                  />
                </div>
                <div className="clearfix" />
              </div>
              <div className="postinfobot">
                <div className="postreply float-right">
                  <button type="submit" className="btn btn-info">
                    Post
                  </button>
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

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(PostForm);
