import * as actions from './actionTypes';
import * as services from '../services/chatServices';



export function loadChats(data){
    return {
        type: actions.GET_GROUPS,
        payload: data
    }
}


export function createRoom(model){
    return async dispatch => {
        const payload = await services.CreateRoom(model)
        dispatch(
            {
                type:actions.CREATE_ROOM,
                payload
            }
        )
    }
}



