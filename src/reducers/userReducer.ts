import { UserCurrent } from "../interfaces";
import { Action, ActionTypes } from "../actions";

export interface UserState {
  user: UserCurrent | null;
}

const initialState: UserState = {
  user: null
};

export const userReducer = (userState = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUserPayload: {
      if (!action.payload) {
        return { ...initialState };
      }

      return {
        user: action.payload
      };
    }

    default:
      return userState;
  }
};
