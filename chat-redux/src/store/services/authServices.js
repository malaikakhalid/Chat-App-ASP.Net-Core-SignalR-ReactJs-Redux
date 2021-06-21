import useToken from "../../useToken";
import axios from  'axios'

export async function loginServices(model) {

    return await fetch('https://localhost:44369/api/Account/Login', {
      method: 'POST',
      headers: {
        // "Authorization" : `Bearer + ${tokens}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    })
    .then(response => 
        
        response.json()
        
    )
    .then(res => {
        sessionStorage.setItem("token", JSON.stringify(res));

    })
    }



export async function registerServices(model){
    return await fetch('https://localhost:44369/api/Account/Register', {
      method: 'POST',
      headers: {
        
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(model)
    })
      .then(res => {
          console.log(res);
          
      })
}


export async function getUsernameServices(){
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    const str = "Bearer " + userToken.token;
    console.log("Bearer " + userToken.token)

    return await axios.get("https://localhost:44369/api/Home/Test",
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