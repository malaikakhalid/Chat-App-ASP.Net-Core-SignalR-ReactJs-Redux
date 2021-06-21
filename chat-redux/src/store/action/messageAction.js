import * as actions from './actionTypes';
import * as services from '../services/chatServices';



export function loadUsers(data){
    return {
        type: actions.SEARCH_USERS,
        payload: data
    }
}



export  function getMsg(id){
    return async dispatch => {
        const payload = await services.getMessageServices(id);
        dispatch({
            type: actions.GET_MESSAGES,
            payload
        })
    }
}


export function CreateMessage(model){
    return async dispatch => {
        const payload = await services.CreateMessageService(model)
        dispatch( {
            type:actions.ADD_MESSAGE,
            payload
        })
    }
}








