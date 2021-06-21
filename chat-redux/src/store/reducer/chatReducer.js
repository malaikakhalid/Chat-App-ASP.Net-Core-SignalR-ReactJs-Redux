import * as actions from '../action/actionTypes';


const INTIAL_STATE = {
chats : []

};


function chatReducer(state = INTIAL_STATE, action){
    if(action.type === actions.GET_GROUPS){
      
        return {
           chats : action.payload 
        }
    }
    else if(action.type === actions.CREATE_ROOM){
        return {
            chats: action.payload
        }
    }

    else{
        return state
    }
}


export default chatReducer;