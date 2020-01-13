import { UserCurrent } from "../interfaces";
import { Action, ActionTypes } from "../actions";

export interface UserState {
  user: UserCurrent | null;
  loggedIn: boolean | null;
}

const initialState: UserState = {
  user: null,
  loggedIn: null
};

export const userReducer = (userState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.UserPayload: {
      if (!action.payload) {
        return { ...initialState, loggedIn: false };
      }

      return {
        user: action.payload,
        loggedIn: true
      };
    }
    case ActionTypes.logout:
      return { ...initialState, loggedIn: false };
    default:
      return userState;
  }
};
