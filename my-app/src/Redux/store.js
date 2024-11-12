





import { legacy_createStore } from "redux";
import {reducer as admin} from "./Admin/reducer"

import { deletereducer } from './Admin/reducer';

import { update } from './Admin/reducer';
import { thunk } from "redux-thunk";
import { combineReducers } from "redux";
import { applyMiddleware } from "redux";



const rootReducer = combineReducers({ admin ,deletereducer,update
});



export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
