import axios from 'axios'

import * as actions from '../action/actionTypes';
import {loadChats} from '../action/chatAction'
import { loadUsers } from '../action/messageAction';

// export async function GroupChatServices(){
//     const tokenString = sessionStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     const str = "Bearer " + userToken.token;
//     console.log("Bearer " + userToken.token)

//     return await axios.get("https://localhost:44369/api/Home/GroupChat",
//             {
//                 headers: {
//                     'Authorization': str,
//                 }
//             }).then((res) => {

//                 console.log("running",res.data);
//                 // this.setState({ docs: res.data })
                
//                 // dispatch(groupChat(res.data))

//             });
//         console.log("running")
    
        
// }


// const tokenString = sessionStorage.getItem('token');
// const userToken = JSON.parse(tokenString);
// const str = "Bearer " + userToken.token;
// console.log("Bearer " + userToken.token)




export const GroupChatServices = () => {
    const tokenString = sessionStorage.getItem('token');
const userToken = JSON.parse(tokenString);
const str = "Bearer " + userToken.token;
console.log("Bearer " + userToken.token)
           
    return async function(dispatch) {
        const response = await  axios.get("https://localhost:44369/api/Home/GroupChat",
                        {
                            headers: {
                                'Authorization': str,
                            }
                        });
        const chats =  response.data;
        console.log("running",chats)
        dispatch(loadChats(chats));


                
    }
}


export async function getMessageServices(id){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const str = "Bearer " + userToken.token;
    console.log("Bearer " + userToken.token)

    return await axios.get("https://localhost:44369/api/Home/" + +id,
    {
        headers: {
            'Authorization': str,
        }
    }).then((res) => {
        console.log(res.data);
        return res.data
        // this.setState({ docs: res.data })

    });
   
}




export const FindChatServices = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const str = "Bearer " + userToken.token;
    console.log("Bearer " + userToken.token)
return async function(dispatch) {
const response = await  axios.get("https://localhost:44369/api/Home/Find",
                {
                    headers: {
                        'Authorization': str,
                    }
                });
const chats =  response.data;
console.log("running",chats)
dispatch(loadUsers(chats));      
}
}



export async function CreateRoom(model) {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const str = "Bearer " + userToken.token;
    console.log("Bearer " + userToken.token)
    return await fetch('https://localhost:44369/api/Home/Room', {
      method: 'POST',
      headers: {
        'Authorization': str,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    })
    .then(response => 
        
        response.json()
        
    )
    .then(res => {
    console.log("dataa", res);
    })
    }


    export async function CreateMessageService(model) {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const str = "Bearer " + userToken.token;
        console.log("Bearer " + userToken.token)
        return await fetch('https://localhost:44369/api/Home/CreateMessage', {
          method: 'POST',
          headers: {
            'Authorization': str,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(model)
        })
        .then(response => 
            
            response.json()
            
        )
        .then(res => {
        console.log("dataa", res);
        })
        }
