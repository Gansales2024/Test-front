import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";
import {logIn} from "../api/api.js";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        access_token:           useLocalStorage('access_token',null),
        refresh_token:    useLocalStorage('refresh_token',null),
        user:            useLocalStorage('user',null),
        errText:         undefined,
        isUserAuthenticated:  useLocalStorage('isUserAuthenticated',false),
        role: useLocalStorage('role',null),

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
            this.isUserAuthenticated = true
            this.role = data.role

        },

        logOut() {
            localStorage.removeItem("access_token")
            localStorage.removeItem("user")
            localStorage.removeItem("isUserAuthenticated")
            localStorage.removeItem("role")
            this.access_token = ''
            this.refresh_token = ''
            this.user = ''
            this.isUserAuthenticated=''
            this.errText = undefined
            this.role = ''

        },

        async LogIn(user) {
            this.errText = undefined
            await logIn(user)
                .then(res => {
                    this.setUserInfo(res.data)
                    axios.defaults.headers.common['Authorization'] = `Bearer ` + this.access_token
                })
                .catch(err => {

                    if(err.response) {
                        this.setError(err.response.data.detail)
                    } else {
                        this.setError(err.message)
                    }

                })
        },

    }

})
