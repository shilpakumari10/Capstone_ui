import {SET_CAR_DATA} from '../actionTypes';

const initialState = {
    carData: null,
    selectedVehicleIndex: null
};

const carDetails = (state = initialState, action) => {
    switch(action.type) {
        case SET_CAR_DATA: {
            return {
                ...state,
                ...action.payload
            } 
        }
        default:
            return state;
    }
};

export default carDetails;