import { combineReducers } from "redux";
import { loginReducers } from "./reducers/loginReducers";

const combinedReducers = combineReducers({
    login: loginReducers
})

export { combinedReducers }