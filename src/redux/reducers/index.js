import { combineReducers } from "redux";
import Auth from "./Auth";
import Message from "./Message";

const reducers = combineReducers({
  auth: Auth,
  message: Message,
});

export default reducers;
