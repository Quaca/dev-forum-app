import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick = () => {
    const { postId } = this.props;
    this.props.deleteComment(postId, this.props.comment._id);
  };

  render() {
    const { comment, user } = this.props;
    return (
      <div className="post">
        <div className="topinfo">
          <h6 className="topinfoheader">{comment.name}</h6>
        </div>
        <div className="topwrap">
          <div className="user-info float-left">
            <div className="avatar">
              <img
                src={comment.avatar}
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
            <p>{comment.text}</p>
          </div>
          <div className="clearfix" />
        </div>
        <div className="postinfo">
          {comment.user === user.id ? (
            <button
              type="button"
              onClick={this.onDeleteClick}
              className="btn btn-danger float-right"
            >
              {" "}
              Delete comment
            </button>
          ) : null}
          {/* <div className="likeblock float-left">
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
          <div className="clearfix" /> */}
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
