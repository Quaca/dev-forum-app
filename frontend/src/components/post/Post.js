import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import CommentFeed from "./CommentFeed";
import CommentForm from "./CommentForm";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";

class Post extends Component {
  componentDidMount = () => {
    this.props.getPost(this.props.match.params.id);
  };

  render() {
    const { post, loading } = this.props;
    const { auth } = this.props;
    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostHeader post={post} auth={auth} />
          {/* <CommentFeed postId={post._id} comments={post.comments} /> */}
          <CommentForm postId={post._id} />
        </div>
      );
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-8">{postContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post.post,
  loading: state.post.loading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
