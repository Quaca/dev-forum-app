import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import CreateProfile from "./components/layout/CreateProfile";
import EditProfile from "./components/layout/EditProfile";
import AddExperience from "./components/career/AddExperience";
import AddEducation from "./components/career/AddEducation";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Feed from "././components/layout/Feed";
import NotFound from "./components/not-found/NotFound";
import PostForm from "./components/posts/PostForm";
import Post from "./components/post/Post";

import "./App.css";
import PrivateRoute from "./components/common/PrivateRoute";
import Landing from "./components/layout/landing";

import background1 from "./images/back1.jpg";
import background2 from "./images/back2.jpg";
import background3 from "./images/back3.jpg";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";

//Check form token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href("/login");
  }
}

class App extends Component {
  state = {
    background: background1,
    isActive: false
  };

  updateBackground = pic => {
    console.log(pic);
    if (pic === "back1") {
      this.setState({ background: background1 });
    } else if (pic === "back2") {
      this.setState({ background: background2 });
    } else if (pic === "back3") {
      this.setState({ background: background3 });
    }
  };

  triggerActive = () => {
    this.setState({ isActive: true });
    // console.log("set to true");
  };

  triggerInactive = () => {
    this.setState({ isActive: false });
    // console.log("set to false");
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar
              triggerBackground={this.updateBackground}
              isActive={this.state.isActive}
            />
            <Fragment>
              <Route
                exact
                path="/"
                component={() => (
                  <Landing
                    isActive={this.state.isActive}
                    background={this.state.background}
                    triggerActive={this.triggerActive}
                    triggerInactive={this.triggerInactive}
                  />
                )}
              />
            </Fragment>
            <section className="content">
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path="/reset-password/:token"
                  component={ResetPassword}
                />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute
                    exact
                    path="/create-profile"
                    component={CreateProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/edit-profile"
                    component={EditProfile}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>

                <Route exact path="/feed" component={Feed} />
                <Switch>
                  <PrivateRoute exact path="/post/:id" component={Post} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/new-topic" component={PostForm} />
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
              </div>
            </section>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
