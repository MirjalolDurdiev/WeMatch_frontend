import { LOGIN_ADMIN } from "../action/login";

const initialState = {
  admin: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isLogged: false,
};

const loginReducers = (state = initialState, action) => {
    console.log(action);
  switch (action.type) {
    case LOGIN_ADMIN:
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      default:
          return state
  }
};
export { loginReducers };
