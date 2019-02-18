import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import avt1 from "../../images/avt1.jpg";
import logo from "../../images/logo.jpg";
import slider1 from "../../images/slide.jpg";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";

class PostItem extends Component {
  render() {
    const { post, auth } = this.props;
    return (
      <div className="post">
        <div className="row">
          <div className="col-10">
            <div className="row">
              <div className="col-2 user-info pull-left">
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
              <div className="col-10 post-text pull-left">
                <h2>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h2>
                <p>{post.description}</p>
              </div>
            </div>
          </div>
          <div className="col-2 post-info pull-left">
            <div className="comments">
              <div className="comment-bg">
                {post.comments.length}
                <div className="mark" />
              </div>
            </div>
            <div className="views">
              <i className="fa fa-eye" />
              &nbsp;1568
            </div>
            <div className="time">
              <i className="fa fa-clock-o" />
              &nbsp;24min
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
