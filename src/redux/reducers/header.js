import {HANDLE_LOGIN} from '../actionTypes';

const initialState = {
    isLoginOpen : false
};

const header = (state = initialState,action) => {
    switch(action.type) {
        case HANDLE_LOGIN: {
            const {isLoginOpen}  = action.payload;
            return {
                ...state,
                isLoginOpen : isLoginOpen
            } 
        }
        default:
            return state;
    }
};

export default header;