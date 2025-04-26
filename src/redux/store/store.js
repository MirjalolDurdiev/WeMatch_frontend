import { createStore } from "redux";
import { combinedReducers } from "../rootReducers";
const store = createStore(combinedReducers)
export { store }