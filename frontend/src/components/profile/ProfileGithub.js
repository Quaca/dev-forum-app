import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  state = {
    clientID: "b69838bc4047b4c1f0f7",
    clientSecret: "b85dc9c3741c4d36af1b939f0dd2da123e532593",
    count: 5,
    sort: "created: asc",
    repos: []
  };

  componentDidMount = () => {
    const { username } = this.props;
    const { count, sort, clientID, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { repos } = this.state;
    console.log(repos);
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="posttext">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    ));

    console.log(repoItems);
    return (
      <div className="post" ref="myRef">
        <div className="postinfotop">
          <h3 className="text-info">Github repositories</h3>
        </div>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGithub;
