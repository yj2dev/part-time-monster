import { AUTH_USER } from "../_actions/types.js";

const initialState = {
  isSignin: {
    success: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, isSignin: action.payload };
    default:
      return state;
  }
}
