import axios from "axios";
import { Dispatch } from "redux";
import { config } from "../config";
import { ActionTypes } from "./types";
import { UserCurrent } from "../interfaces";

export interface LoginAction {
  type: ActionTypes.UserPayload;
  payload: UserCurrent | null;
}

export interface SignupAction {
  type: ActionTypes.UserPayload;
  payload: UserCurrent | null;
}

export const login = (
  user: { email: string; password: string },
  callback: (error?: any) => void
) => async (dispatch: Dispatch<LoginAction>) => {
  let userCurrent = null;
  try {
    const response = await axios.post<UserCurrent>(
      `${config.BACKEND_URL}/auth/login/local`,
      user
    );

    userCurrent = response.data;
    dispatch<LoginAction>({
      type: ActionTypes.UserPayload,
      payload: userCurrent
    });
    callback();
  } catch (e) {
    callback(e.response.data);
  }
};

export const signup = (
  user: { name: string; email: string; password: string },
  callback: (error?: any) => void
) => async (dispatch: Dispatch) => {
  let userCurrent = null;
  try {
    const response = await axios.post<UserCurrent>(
      `${config.BACKEND_URL}/auth/signup/local`,
      user
    );

    userCurrent = response.data;
    dispatch<SignupAction>({
      type: ActionTypes.UserPayload,
      payload: userCurrent
    });
    callback();
  } catch (e) {
    callback(e.response.data);
  }
};

export const loginGoogle = () => {
  const url = `${config.BACKEND_URL}/auth/login/google?from=${window.location.href}`;
  window.location.href = url;
};

export const signupGoogle = () => {
  const url = `${config.BACKEND_URL}/auth/signup/google?from=${window.location.href}`;
  window.location.href = url;
};

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${config.BACKEND_URL}/auth/logout`, {
      withCredentials: true
    });
    dispatch({
      type: ActionTypes.logout
    });
  } catch (e) {
    console.log(e);
  }
};
