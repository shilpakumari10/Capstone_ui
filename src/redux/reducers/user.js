import { GET_USER_VEHICLE, GET_USER_VEHICLES } from '../actionTypes';

let initialState = {
    vehicles: []
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_VEHICLES: {
            return Object.assign({}, state, { vehicles: action.payload.vehicles });
        }
        default:
            return state;
    }
}

export default user;