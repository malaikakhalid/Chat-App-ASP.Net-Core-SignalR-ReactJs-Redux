// const INITIAL_STATE = {
//     username: "Malaika",
//     email: "malaika@hotmail.com",
//     data : []
// }

// export default (state = INITIAL_STATE, action) => {
//     // console.log("action", action)
//  return state
// }


import * as actions from '../action/actionTypes';



const INTIAL_STATE = {
// username: ''

};


function authReducer(state = INTIAL_STATE, action){
    if(action.type === actions.LOGIN){
        return [
            state,
            {
                username: action.payload
            }
        ]
    }

    else if(action.type === actions.REGISTER){
        return [
            state, {
                username: action.payload,
                email: action.payload,
                fullname: action.payload
            }
        ]
    }

    else if(action.type === actions.GET_USERNAME){
        const username = action.payload
        return {

            ...state,
            username

        }
    }



    else{
        return state
    }
}


export default authReducer;