import React, { Component } from "react";
import classnames from "classnames";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";

class CommentItem extends Component {
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

export default CommentItem;
