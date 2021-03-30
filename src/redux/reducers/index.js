import { combineReducers } from "redux";
import header from './header';
import login from './login';
import step from './step';
import carDetails from "./carDetails";
import user from './user';
import { connectRouter } from 'connected-react-router';


const createRootReducer = (history) => combineReducers({ header, login, step, carDetails, user, router: connectRouter(history) });

export default createRootReducer;