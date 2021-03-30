import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';
import createRootReducer from "./reducers";
import { routerMiddleware } from 'connected-react-router';
import rootReducer from "./reducers";

export const history = createBrowserHistory();

const getUserData = () => {
    try {
        return localStorage.getItem('hirewheels-user') !== null ?
            JSON.parse(localStorage.getItem('hirewheels-user')) : undefined;
    } catch (error) {
        console.log("Cannot load user data");
        return undefined;
    }
}

export default createStore(createRootReducer(history), { login: getUserData() }, applyMiddleware(thunk, routerMiddleware(history)));