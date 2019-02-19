import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";
import { addComment } from "../../actions/postActions";

class CommentForm extends Component {
  state = {
    text: "",
    errors: {}
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { postId } = this.props;
    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };
  render() {
    const { errors } = this.state;
    const { post } = this.props;
    const { user } = this.props.auth;
    return (
      <div className="post">
        <form onSubmit={this.onSubmit} className="form">
          <div className="topwrap">
            <div className="user-info float-left">
              <div className="avatar">
                <img
                  src={user.avatar}
                  alt=""
                  height="36px"
                  width="36px"
                  className="fit-image"
                />
                {/* <div className="status green">&nbsp;</div> */}
              </div>
              <div className="icons">
                <img src={icon1} alt="" />
                <img src={icon2} alt="" />
              </div>
            </div>
            <div className="post-text float-left">
              <div
                className={classnames("", {
                  "mb-4": !errors.text
                })}
              >
                <textarea
                  className={classnames("form-control", {
                    "is-invalid": errors.text
                  })}
                  placeholder="Make a comment"
                  value={this.state.text}
                  onChange={this.changeText}
                  name="text"
                  id="text"
                />
                {errors.text && (
                  <div className="invalid-feedback mb-2">{errors.text}</div>
                )}
              </div>
            </div>
            <div className="clearfix" />
          </div>
          <div className="postinfo">
            <div className="postsubmit">
              <button type="submit" className="btn btn-info">
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CommentForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
