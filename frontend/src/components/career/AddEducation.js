import React, { Component } from "react";
import classnames from "classnames";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
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

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="add-education">
        <div className="row">
          <div className="col-md-8 m-auto">
            <div className="post">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>

              <form onSubmit={this.onSubmit} className="form input-fields">
                <div className="postinfotop">
                  <h2>Add education</h2>
                </div>
                <div className="posttext">
                  {/* School */}
                  <div
                    className={classnames("", {
                      "mb-4": !errors.school
                    })}
                  >
                    <input
                      type="text"
                      placeholder="School"
                      className={classnames("form-control", {
                        "is-invalid": errors.school
                      })}
                      name="school"
                      value={this.state.school}
                      onChange={this.changeText}
                    />
                    {errors.school && (
                      <div className="invalid-feedback mb-2">
                        {errors.school}
                      </div>
                    )}
                  </div>
                  {/* School */}
                  {/* Degree */}
                  <div
                    className={classnames("", {
                      "mb-4": !errors.degree
                    })}
                  >
                    <input
                      type="text"
                      placeholder="Degree"
                      className={classnames("form-control", {
                        "is-invalid": errors.degree
                      })}
                      name="degree"
                      value={this.state.degree}
                      onChange={this.changeText}
                    />
                    {errors.degree && (
                      <div className="invalid-feedback mb-2">
                        {errors.degree}
                      </div>
                    )}
                  </div>
                  {/* Degree */}
                  {/* Field of study */}
                  <div
                    className={classnames("", {
                      "mb-4": !errors.fieldofstudy
                    })}
                  >
                    <input
                      type="text"
                      placeholder="Field of study"
                      className={classnames("form-control", {
                        "is-invalid": errors.fieldofstudy
                      })}
                      name="fieldofstudy"
                      value={this.state.fieldofstudy}
                      onChange={this.changeText}
                    />
                    {errors.fieldofstudy && (
                      <div className="invalid-feedback mb-2">
                        {errors.fieldofstudy}
                      </div>
                    )}
                  </div>
                  {/* Field of study */}
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
                      placeholder="Program description"
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
