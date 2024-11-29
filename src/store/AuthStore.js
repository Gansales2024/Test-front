import {defineStore} from "pinia";
// import {logIn} from "../api/api.js";
import {useLocalStorage} from "@vueuse/core";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        access_token:           useLocalStorage('access_token',1111111111),
        refresh_token:    useLocalStorage('refresh_token',null),
        user:            useLocalStorage('user',null),
        errText:         undefined,

    }),

    getters: {
        getFirstLetter() {
            return this.user[0].toUpperCase()
        },
    },
    actions: {
        setError(err) {
            this.errText = err
        },

        setUserInfo(data)  {
            this.user = data.user
            this.access_token = data.access_token
            this.refresh_token = data.refresh_token
        },

        logOut() {
            localStorage.removeItem("access_token")
            localStorage.removeItem("user")
            localStorage.removeItem("refresh_token")

            this.access_token = ''
            this.refresh_token = ''
            this.user = ''
            this.errText = undefined

        },

        async LogIn(user) {
            this.errText = undefined
            // await logIn(user)
            //     .then(res => {
            //         this.setUserInfo(res.data)
            //         axios.defaults.headers.common['Authorization'] = `Bearer ` + this.access_token
            //     })
            //     .catch(err => {
            //
            //         if(err.response) {
            //             this.setError(err.response.data.detail)
            //         } else {
            //             this.setError(err.message)
            //         }
            //
            //     })
        },

    }

})
