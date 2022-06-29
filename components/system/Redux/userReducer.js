import { UPDATE_USER_INFO } from "./actionTypes";

let initialState = {
  user: null,
  fitness: 0,
};

let Reducer = (state = initialState, action) => {
  // Force something to update
  switch (action.type) {
    case UPDATE_USER_INFO:
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
      return {
        ...state,
        Gameplay: {
          ...state.Gameplay,
          details: {},
        },
      };
    default:
      return state;
  }
};

export default Reducer;
