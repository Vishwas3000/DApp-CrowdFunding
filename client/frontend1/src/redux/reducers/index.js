import { combineReducers } from "redux";

import { fundrsReducer , fundrReducer , authReducer } from "./reducer"; 

export const reducers =  combineReducers({
     allFundrs : fundrsReducer,
     fundr : fundrReducer,
     auth : authReducer,
});