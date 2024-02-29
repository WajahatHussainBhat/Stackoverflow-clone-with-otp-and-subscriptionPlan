import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser"
import questionReducer from "./question"
import usersReducer from "./users";
import themeReducer from "./theme";


const rootReducer = combineReducers({
    authReducer,
    currentUserReducer,
    questionReducer,
    usersReducer,
    themeReducer,
});

export default rootReducer;