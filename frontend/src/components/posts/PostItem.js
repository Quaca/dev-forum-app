import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import avt1 from "../../images/avt1.jpg";
import logo from "../../images/logo.jpg";
import slider1 from "../../images/slide.jpg";
import icon1 from "../../images/icon1.jpg";
import icon2 from "../../images/icon2.jpg";

class PostItem extends Component {
  render() {
    return (
      <div className="post">
        <div className="row">
          <div className="col-10">
            <div className="row">
              <div className="col-2 user-info pull-left">
                <div className="avatar">
                  <img
                    src={avt1}
                    alt=""
                    height="36px"
                    width="36px"
                    className="fit-image"
                  />
                  <div className="status green">&nbsp;</div>
                </div>
                <div className="icons">
                  <img src={icon1} alt="" />
                  <img src={icon2} alt="" />
                </div>
              </div>
              <div className="col-10 post-text pull-left">
                <h2>10 Kids Unaware of Their Halloween Costume</h2>
                <p>
                  It's one thing to subject yourself to a Halloween costume
                  mishap because, hey, that's your prerogative.
                </p>
              </div>
            </div>
          </div>
          <div className="col-2 post-info pull-left">
            <div className="comments">
              <div className="comment-bg">
                560
                <div className="mark" />
              </div>
            </div>
            <div className="views">
              <i className="fa fa-eye" />
              &nbsp;1568
            </div>
            <div className="time">
              <i className="fa fa-clock-o" />
              &nbsp;24min
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(PostItem);
