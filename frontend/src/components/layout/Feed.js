import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import Posts from "../posts/Posts";
import { getPosts } from "../../actions/postActions";

class Feed extends Component {
  render() {
    const { posts, loading } = this.props.post;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <Posts posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">Amar</div>
          </div>
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Feed);
