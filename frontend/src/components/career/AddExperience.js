import React, { Component } from "react";
import classnames from "classnames";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  state = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  };

  changeText = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = () => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="post">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>

              <form onSubmit={this.onSubmit} className="form input-fields">
                <div className="postinfotop">
                  <h2>Add experience</h2>
                </div>
                <div className="posttext">
                  {/* Company */}
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
                  {/* Company */}
                  {/* Job title */}
                  <div
                    className={classnames("", {
                      "mb-4": !errors.title
                    })}
                  >
                    <input
                      type="text"
                      placeholder="Job title"
                      className={classnames("form-control", {
                        "is-invalid": errors.title
                      })}
                      name="title"
                      value={this.state.title}
                      onChange={this.changeText}
                    />
                    {errors.title && (
                      <div className="invalid-feedback mb-2">
                        {errors.title}
                      </div>
                    )}
                  </div>
                  {/* Job title */}
                  {/* Location */}
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
                  {/* Location */}
                  {/* From date */}
                  <div
                    className={classnames("", {
                      "mb-4": !errors.from
                    })}
                  >
                    <h6>From date</h6>
                    <input
                      type="date"
                      placeholder="From"
                      className={classnames("form-control", {
                        "is-invalid": errors.from
                      })}
                      name="from"
                      value={this.state.from}
                      onChange={this.changeText}
                    />
                    {errors.from && (
                      <div className="invalid-feedback mb-2">{errors.from}</div>
                    )}
                  </div>
                  {/* From date */}
                  {/* End date */}
                  <div
                    className={classnames("", {
                      "mb-4": !errors.to
                    })}
                  >
                    <h6>To date</h6>
                    <input
                      type="date"
                      placeholder="To date"
                      className={classnames("form-control", {
                        "is-invalid": errors.to
                      })}
                      name="to"
                      value={this.state.to}
                      onChange={this.changeText}
                      disabled={this.state.disabled ? "disabled" : ""}
                    />
                    {errors.to && (
                      <div className="invalid-feedback mb-2">{errors.to}</div>
                    )}
                  </div>
                  {/* End date */}
                  {/* End checkbox */}
                  <div
                    className={classnames("form-check", {
                      "mb-4": !errors.current
                    })}
                  >
                    <input
                      type="checkbox"
                      className={classnames("form-check-input", {
                        "is-invalid": errors.current
                      })}
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label htmlFor="current" className="form-check-label">
                      Current job?
                    </label>
                    {errors.current && (
                      <div className="invalid-feedback mb-2">
                        {errors.current}
                      </div>
                    )}
                  </div>
                  {/* End checkbox */}
                  {/* Textarea description */}
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.description
                      })}
                      placeholder="Job description"
                      name="description"
                      value={this.state.description}
                      onChange={this.changeText}
                    />

                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  {/* Textarea description */}
                  {/* Button */}
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                  {/* Button */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
