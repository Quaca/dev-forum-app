import React, { Component } from "react";
import Posts from "../posts/Posts";

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Posts />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feed;
