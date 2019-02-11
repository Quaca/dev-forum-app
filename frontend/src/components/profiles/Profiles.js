import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  componentDidMount = () => {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div>
        <div className="profiles">
          <div className="row">
            <div className="col-md-12 m-auto">
              <div className="post">
                <div className="postinfotop">
                  <h2>Profiles</h2>
                </div>
                <div className="posttext">{profileItems}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
