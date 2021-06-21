import * as actions from '../action/actionTypes';


const INTIAL_STATE = {
messages : [],
users : [],
chats : [],


};


function msgReducer(state = INTIAL_STATE, action){
    if(action.type === actions.GET_MESSAGES){
      
        return {
            ...state,
           messages : action.payload 
        }
    }

    else if(action.type === actions.SEARCH_USERS){
        return {
            ...state,
            users: action.payload
        }
    }

    else if(action.type === actions.ADD_MESSAGE){
        return {
            ...state,
            chats:action.payload

        }
    }

    else{
        return state
    }
}


export default msgReducer;




