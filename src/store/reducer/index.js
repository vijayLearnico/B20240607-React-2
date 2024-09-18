import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { taskReducer } from "./TaskReducer";

const rootReducer = combineReducers({
    user:userReducer,
    task:taskReducer
});

export default rootReducer;