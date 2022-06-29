import { UPDATE_USER_ID_TOKEN, UPDATE_USER_INFO } from "./actionTypes";
/**
 *
 * @param {import("firebase/auth").User | null} user
 * @returns
 */
export const updateUserInfo = (user) => {
  return {
    type: UPDATE_USER_INFO,
    user: user,
  };
};

export const updateUserIdToken = (token) => {
  return {
    type: UPDATE_USER_ID_TOKEN,
    token,
  };
};
