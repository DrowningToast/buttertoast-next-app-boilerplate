import { User } from "firebase/auth";
import { UPDATE_USER_ID_TOKEN, UPDATE_USER_INFO } from "./actionTypes";

export interface initState {
  user: User | null;
  token: string | null;
  fitness: number;
}

let initialState: initState = {
  user: null,
  token: null,
  fitness: 0,
};

let Reducer = (state = initialState, action: any) => {
  // Force something to update
  switch (action.type) {
    case UPDATE_USER_INFO: {
      let status = false;
      if (action.user != null) {
        status = true;
      } else {
        status = false;
      }
      let user = action.user;
      let isLogin = status;
      let fitness = state.fitness + 1;
      return {
        ...state,
        user,
        isLogin,
        fitness,
      };
      break;
    }
    case UPDATE_USER_ID_TOKEN: {
      let fitness = state.fitness + 1;
      return {
        ...state,
        fitness,
        token: action.token,
      };
    }
    default:
      return state;
  }
};

export default Reducer;
