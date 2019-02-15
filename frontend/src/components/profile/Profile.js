import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";
import ProfileHeader from "./ProfileHeader";
import ProfileCredentials from "./ProfileCredentials";
import ProfileAbout from "./ProfileAbout";
import ProfileGithub from "./ProfileGithub";

import Spinner from "../common/Spinner";

class Profile extends Component {
  componentDidMount = () => {
    const param = this.props.match.params.handle;
    if (param) {
      this.props.getProfileByHandle(param);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.profile.profile === null && nextProps.profile.loading) {
      this.props.history.push("/not-found");
    }
  };

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCredentials
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
