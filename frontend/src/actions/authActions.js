import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to localstorage
      const { token } = res.data;
      //Set token to localstorage
      localStorage.setItem("jwtToken", token);
      //Set token to authentication header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logget user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Logout user
export const logoutUser = () => dispatch => {
  //Remove from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header
  setAuthToken(false);
  //Set current user to empty object
  dispatch(setCurrentUser({}));
};
