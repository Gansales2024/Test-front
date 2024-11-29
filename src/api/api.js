import axios from "axios";
import {useAuthStore} from "../store/AuthStore.js";
import router from "../router/index.js";



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const token = localStorage.getItem('access_token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ` + token
}

axios.interceptors.response.use(response => {
        return response
    },
    error => {

        const originalRequest = error.config
        if (error.response.status === 401  && !originalRequest.url.includes('/refresh')) {
            originalRequest._rety = true
            return  axios
                .get('/auth/refresh?token='+localStorage.getItem('refresh_token'))
                .then(res => {
                    if (res.status === 200) {
                        useAuthStore().setUserInfo(res.data)
                        originalRequest.headers["Authorization"] = 'Bearer ' + res.data.access_token
                        axios.defaults.headers.common['Authorization'] = `Bearer ` + res.data.refresh_token
                        return axios(originalRequest)

                    } else {
                        useAuthStore().logOut()
                        router.push({name:'Auth'})
                        return  Promise.reject(error)
                    }
                }).catch(() => {
                    useAuthStore().logOut()
                    router.push({name:'Auth'})
                    return  Promise.reject(error)
                })
        }
        return  Promise.reject(error)
    }
)

export  const logIn =  async (data) => {
    return  await axios.post(`/auth/token`, data,
        {headers: {"Content-Type":"application/x-www-form-urlencoded"}})
}