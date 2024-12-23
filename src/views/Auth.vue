<template>
  <div class="m-auto">
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-[300px] w-auto" src="../assets/auth.png" alt="Logo" />
        <h2 class=" text-center text-2xl/9 font-bold tracking-tight text-gray-500">Войдите в свой аккаунт</h2>
      </div>

      <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-6">
          <Input :type="'text'"
                 :label="'Login'"
                 :pr="'user_name'"
                 :value="user.user_name"
                 @update-data="updateData"
          />
          <Input
              :type="'password'"
              :label="'Password'"
              :pr="'password'"
              :value="user.password"
              @update-data="updateData"
          />
          <div>
            <button @click="login" :disabled="checkUser" class="  h-[3rem] flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-400">Войти</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "../components/Auth/Input.vue";
import {computed, reactive} from "vue";
import {useAuthStore} from "../store/AuthStore.js";
import {useRouter} from "vue-router";
const router = useRouter()
const AuthStore = useAuthStore()
const user = reactive({
  user_name:'',
  password:''
})

const updateData = (newValue, label) => {
  user[label] = newValue;
};

const checkUser = computed(() => {
  return !(user.user_name.toString().trim().length && user.password.toString().trim().length);
})

const login = () => {
  AuthStore.LogIn(user).then(() => {
    router.push({name:"Main"})
  })
}
</script>

<style scoped>

</style>
