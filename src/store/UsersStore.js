import {defineStore} from "pinia";
import {useLocalStorage} from "@vueuse/core";
import {getUsers} from "../api/api.js";

export const useUsersStore = defineStore('usersStore', {
    state: () => ({
        users:[]
    }),

    getters: {
    },
    actions: {
        setError(err) {
            this.errText = err
        },



        async getUsers() {
            this.errText = undefined
            await getUsers()
                .then(res => {
                    this.users=res.data
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
