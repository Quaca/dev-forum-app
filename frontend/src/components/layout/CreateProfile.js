import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    console.log(errors);
    console.log(displaySocialInputs);

    const options = [
      { label: "Select Professional Status", value: 0 },
      { label: "Developer", value: "developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student", value: "Student" },
      { label: "Instructor", value: "Instructor" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    const selectOptions = options.map(option => (
      <option key={option.label} value={option.label}>
        {option.label}
      </option>
    ));

    let socialLinks;

    if (displaySocialInputs) {
      socialLinks = (
        <div>
          {/* Twitter */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-twitter" />
              </span>
            </div>
            <input
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.twitter
              })}
              placeholder="Twitter"
              name="twitter"
              value={this.state.twitter}
              onChange={this.changeText}
            />
            {errors.twitter && (
              <div className="invalid-feedback">{errors.twitter}</div>
            )}
          </div>
          {/* Twitter */}
          {/* Facebook */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-facebook" />
              </span>
            </div>
            <input
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.facebook
              })}
              placeholder="Facebook"
              name="facebook"
              value={this.state.facebook}
              onChange={this.changeText}
            />
            {errors.facebook && (
              <div className="invalid-feedback">{errors.facebook}</div>
            )}
          </div>
          {/* Facebook */}
          {/* Linkedin */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-linkedin" />
              </span>
            </div>
            <input
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.linkedin
              })}
              placeholder="Linkedin"
              name="linkedin"
              value={this.state.linkedin}
              onChange={this.changeText}
            />
            {errors.linkedin && (
              <div className="invalid-feedback">{errors.linkedin}</div>
            )}
          </div>
          {/* Linkedin */}
          {/* Instagram */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-instagram" />
              </span>
            </div>
            <input
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.instagram
              })}
              placeholder="Instagram"
              name="instagram"
              value={this.state.instagram}
              onChange={this.changeText}
            />
            {errors.instagram && (
              <div className="invalid-feedback">{errors.instagram}</div>
            )}
          </div>
          {/* Instagram */}
          {/* Youtube */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fab fa-youtube" />
              </span>
            </div>
            <input
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.youtube
              })}
              placeholder="Youtube"
              name="youtube"
              value={this.state.youtube}
              onChange={this.changeText}
            />
            {errors.youtube && (
              <div className="invalid-feedback">{errors.youtube}</div>
            )}
          </div>
          {/* Youtube */}
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="post">
            <form className="form input-fields" onSubmit={this.onSubmit}>
              <div className="postinfotop">
                <h2>Create New Profile</h2>
              </div>
              <div className="posttext">
                <div
                  className={classnames("", {
                    "mb-4": !errors.handle
                  })}
                >
                  <input
                    type="text"
                    placeholder="Profile handle"
                    className={classnames("form-control", {
                      "is-invalid": errors.handle
                    })}
                    name="handle"
                    value={this.state.handle}
                    onChange={this.changeText}
                  />
                  {errors.handle && (
                    <div className="invalid-feedback mb-2">{errors.handle}</div>
                  )}
                </div>
                <div
                  className={classnames("", {
                    "mb-4": !errors.status
                  })}
                >
                  <select
                    placeholder="Status"
                    className={classnames("form-control", {
                      "is-invalid": errors.status
                    })}
                    name="status"
                    value={this.state.status}
                    onChange={this.changeText}
                  >
                    {selectOptions}
                  </select>
                  {errors.status && (
                    <div className="invalid-feedback mb-2">{errors.status}</div>
                  )}
                </div>
                <div
                  className={classnames("", {
                    "mb-4": !errors.company
                  })}
                >
                  <input
                    type="text"
                    placeholder="Company"
                    className={classnames("form-control", {
                      "is-invalid": errors.company
                    })}
                    name="company"
                    value={this.state.company}
                    onChange={this.changeText}
                  />
                  {errors.company && (
                    <div className="invalid-feedback mb-2">
                      {errors.company}
                    </div>
                  )}
                </div>
                <div
                  className={classnames("", {
                    "mb-4": !errors.website
                  })}
                >
                  <input
                    type="text"
                    placeholder="Website"
                    className={classnames("form-control", {
                      "is-invalid": errors.website
                    })}
                    name="website"
                    value={this.state.website}
                    onChange={this.changeText}
                  />
                  {errors.website && (
                    <div className="invalid-feedback mb-2">
                      {errors.website}
                    </div>
                  )}
                </div>
                <div
                  className={classnames("", {
                    "mb-4": !errors.location
                  })}
                >
                  <input
                    type="text"
                    placeholder="Location"
                    className={classnames("form-control", {
                      "is-invalid": errors.location
                    })}
                    name="location"
                    value={this.state.location}
                    onChange={this.changeText}
                  />
                  {errors.location && (
                    <div className="invalid-feedback mb-2">
                      {errors.location}
                    </div>
                  )}
                </div>
                <div
                  className={classnames("", {
                    "mb-4": !errors.skills
                  })}
                >
                  <input
                    type="text"
                    placeholder="Skills"
                    className={classnames("form-control", {
                      "is-invalid": errors.skills
                    })}
                    name="skills"
                    value={this.state.skills}
                    onChange={this.changeText}
                  />
                  {errors.skills && (
                    <div className="invalid-feedback mb-2">{errors.skills}</div>
                  )}
                </div>
                <div
                  className={classnames("", {
                    "mb-4": !errors.githubusername
                  })}
                >
                  <input
                    type="text"
                    placeholder="Github Username"
                    className={classnames("form-control", {
                      "is-invalid": errors.githubusername
                    })}
                    name="githubusername"
                    value={this.state.githubusername}
                    onChange={this.changeText}
                  />
                  {errors.githubusername && (
                    <div className="invalid-feedback mb-2">
                      {errors.githubusername}
                    </div>
                  )}
                </div>

                {/* Textarea bio */}
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.bio
                    })}
                    placeholder="Short bio"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.changeText}
                  />

                  {errors.bio && (
                    <div className="invalid-feedback">{errors.bio}</div>
                  )}
                </div>
                {/* Textarea bio */}

                {/* Social link */}
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {/* Social-links-field */}
                {socialLinks}
                {/* Social-links-field */}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile }
)(CreateProfile);
