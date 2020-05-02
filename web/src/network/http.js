import Axios from 'axios'
import router from '../router'

let http = Axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/web/api/v1'
})

http.interceptors.response.use(res=>{
    return res
},err=>{
    // const message = err.response.data.message
    // alert(message)
    if(err.response.status == 401){
        router.push('/')
    }
    return Promise.reject(err)
})

http.interceptors.request.use(req=>{
    if(localStorage.token){
        req.headers.Authorization ='Bearer '+localStorage.token
    }
    return req
},err=>{
    return Promise.reject(err)
})


export default http