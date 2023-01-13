import axios from 'axios';

// export default axios.create({
//     baseURL: "http://localhost:8080",
//     headers: {
//         Authorization: 'Bearer ' + sessionStorage.getItem("token")
//     }
// })

class loggedInApi {
    constructor(){
        return axios.create({
            baseURL: "http://localhost:8080",
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }});
    }
}

export default loggedInApi;