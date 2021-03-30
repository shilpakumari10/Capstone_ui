import { SET_LOGIN_DATA, SET_STEP_DATA, HANDLE_LOGIN, SET_CAR_DATA, GET_USER_VEHICLES, CLEAR_LOGIN_DATA } from './actionTypes';
import { fetchAllVehicles, fetchVehicles } from '../service/vehicle/vehicleService';

export const handleLogin = isLoginOpen => ({
    type: HANDLE_LOGIN,
    payload: {
        isLoginOpen: isLoginOpen
    }
});

export const setLoginData = loginData => ({
    type: SET_LOGIN_DATA,
    payload: {
        loginData: loginData
    }
});

export const clearLoginData = () => {
    return async (dispatch) => {
        localStorage.removeItem("hirewheels-user");
        dispatch({
            type: CLEAR_LOGIN_DATA,
            payload: {}
        });
    }
};

export const getVehicles = (jwtToken) => {
    return async (dispatch) => {
        let vehicles = await fetchAllVehicles(jwtToken);
        dispatch({
            type: GET_USER_VEHICLES,
            payload: {
                vehicles: vehicles['statusCode'] == 200 ? vehicles['data'] : []
            }
        });
    }
};

export const setStepData = event => ({
    type: SET_STEP_DATA,
    payload: {
        [event.target.id]: event.target.value
    }
});

export const setCarData = carData => ({
    type: SET_CAR_DATA,
    payload: {
        carData: carData
    }
});

export const setSelectedVehicleIndex = index => ({
    type: SET_CAR_DATA,
    payload: {
        selectedVehicleIndex: index
    }
});
