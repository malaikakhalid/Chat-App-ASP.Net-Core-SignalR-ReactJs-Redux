import * as actions from './actionTypes';
import * as services from '../services/authServices';

export  function userLogin(model){
    return async dispatch => {
        const payload = await services.loginServices(model);
        dispatch({
            type: actions.LOGIN,
            payload
        })
    }
}


export function userRegister(model){
    return async dispatch => {
        const payload = await services.registerServices(model);
        dispatch({
            type: actions.REGISTER,
            payload
        })
    }
}


export function getUsername(){
    return async dispatch => {
        const payload  = await services.getUsernameServices();
        dispatch({
            type: actions.GET_USERNAME, payload
        })
    }
}