import axios from "axios";
import { Dispatch } from "redux";
import { config } from "../config";
import { ActionTypes } from "./types";
import { UserCurrent } from "../interfaces";

export interface FetchUserPayloadAction {
  type: ActionTypes.UserPayload;
  payload: UserCurrent | null;
}

export const fetchUserPayload = () => async (
  dispatch: Dispatch<FetchUserPayloadAction>
) => {
  let user = null;
  try {
    const response = await axios.get<UserCurrent>(
      `${config.BACKEND_URL}/user/payload`,
      { withCredentials: true }
    );

    user = response.data;
  } catch (e) {
    console.log(e);
  }
  return dispatch<FetchUserPayloadAction>({
    type: ActionTypes.UserPayload,
    payload: user
  });
};
