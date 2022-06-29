import { UPDATE_USER_INFO } from "./actionTypes";
/**
 *
 * @param {Object} user
 * @returns
 */
export const updateUserInfo = (user) => {
  return {
    type: UPDATE_USER_INFO,
    user: user,
  };
};
