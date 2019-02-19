import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import PostItem from "./PostItem";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount = () => {
    this.props.getPosts();
  };

  render() {
    const { posts, loading } = this.props;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <Fragment>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </Fragment>
      );
    }

    return postContent;
  }
}

const mapStateToProps = state => ({
  posts: state.post.posts,
  loading: state.post.loading
});
export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
