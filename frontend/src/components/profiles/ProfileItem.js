import React, { Component } from "react";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={profile.user.avatar}
              alt=""
              className="rounded-circle img-fluid"
            />
          </div>
          <div className="col-6">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span> at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View profile
            </Link>
          </div>
          <div className="col-4">
            <h4>Skill set</h4>
            <ul className="list-gorup" style={{ paddingLeft: "0px" }}>
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item pd-05">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
