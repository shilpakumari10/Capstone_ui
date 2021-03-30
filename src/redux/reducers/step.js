import {SET_STEP_DATA} from '../actionTypes';
import {getTodaysDate} from "../../steps/utility";

const initialState = {
    pickUpDate : getTodaysDate(),
    location: "",
    dropOffDate: getTodaysDate()
};

const step = (state = initialState, action) => {
    switch(action.type) {
        case SET_STEP_DATA: {
            return {
                ...state,
                ...action.payload
            } 
        }
        default:
            return state;
    }
};

export default step;