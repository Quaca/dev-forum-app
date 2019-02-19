import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { addLike, removeLike } from "../../actions/postActions";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";

class PostHeader extends Component {
  onLikeClick = () => {
    // console.log("liked");
    this.props.addLike(this.props.post._id);
  };
  onUnlikeClick = () => {
    // console.log("unliked");
    this.props.removeLike(this.props.post._id);
  };

  findUserLike = likes => {
    const { auth } = this.props;
    if (likes)
      if (likes.filter(like => like.user === auth.user.id).length > 0) {
        return true;
      } else {
        return false;
      }
  };

  render() {
    const { post } = this.props;

    return (
      <div className="post">
        <div className="topwrap">
          <div className="user-info float-left">
            <div className="avatar">
              <img
                src={post.avatar}
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
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
          <div className="clearfix" />
        </div>
        <div className="postinfo">
          {/* <button type="button" className="btn btn-light">
                <i className="text-info far fa-thumbs-up" />
                <span className="badge badge-light">
                  {post.likes !== undefined ? post.likes.length : null}
                </span>
              </button> */}
          <div className="likeblock float-left">
            <div
              onClick={this.onLikeClick}
              className={classnames("up", {
                liked: this.findUserLike(post.likes)
              })}
            >
              <i className="far fa-thumbs-up" />
              {post.likes !== undefined ? post.likes.length : null}
            </div>
            <div onClick={this.onUnlikeClick} className="down">
              <i className="far fa-thumbs-down" />
            </div>
          </div>
          <div className="other float-left" />
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

PostHeader.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLike, removeLike }
)(PostHeader);
