import { GET_PROFILE } from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
