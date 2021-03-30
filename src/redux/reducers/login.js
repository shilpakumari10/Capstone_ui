import { SET_LOGIN_DATA, CLEAR_LOGIN_DATA } from '../actionTypes';

const initialState = {
    "userId": undefined,
    "firstName": undefined,
    "lastName": undefined,
    "email": undefined,
    "password": undefined,
    "mobileNo": undefined,
    "walletMoney": undefined,
    "roleName": undefined,
    "jwtToken": undefined
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN_DATA: {
            const { loginData } = action.payload;
            return {
                ...state,
                "userId": loginData.userId,
                "firstName": loginData.firstName,
                "lastName": loginData.lastName,
                "email": loginData.email,
                "password": loginData.password,
                "mobileNo": loginData.mobileNo,
                "walletMoney": loginData.walletMoney,
                "roleName": loginData.roleName,
                "jwtToken": loginData.jwtToken
            }
        }
        case CLEAR_LOGIN_DATA: {
            return Object.assign({},state,initialState);
        }
        default:
            return state;
    }
};

export default login;