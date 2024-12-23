<template>
  <header class="header app__header bg-[#e5e5e5] dark:bg-[#212121]" >

    <p style="user-select: none; font-weight: bold" class="text-indigo-500">Test Project</p>
    <div class="header__right">
      <el-avatar>{{props.name[0].toUpperCase()}}</el-avatar>
      <el-dropdown trigger="click">
        <p class="header__user">{{props.name}}  <el-icon> <arrow-down/></el-icon></p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="QuestionFilled">Добавить вопрос</el-dropdown-item>
            <el-dropdown-item :icon="Folder">Добавить тематику</el-dropdown-item>
            <el-dropdown-item :icon="EditPen" >Модерация вопросов</el-dropdown-item>
            <el-dropdown-item :icon="User" @click="goToUsers">Управление пользователями</el-dropdown-item>
            <el-dropdown-item :icon="dark?'Sunny':'Moon'" @click="changeTheme">Сменить тему </el-dropdown-item>
            <el-dropdown-item :icon="SwitchButton" @click="logOutFunc">Выйти</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>


import {EditPen, Folder, QuestionFilled, SwitchButton, User} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import {useAuthStore} from "../../store/AuthStore.js";
const dark= ref(false)
const router = useRouter()
const route = useRoute()
const AuthStore = useAuthStore()
const props = defineProps({
  name: String,
  type: String
})

const goToUsers = () => {
  router.push({name:"Users"})
}

const logOutFunc = () => {
  router.push({name: "Auth"})
  AuthStore.logOut()
}

const changeTheme = () => {
  const theme = localStorage.getItem("data-theme")
  const html = document.querySelector('html')
  html.classList.toggle("dark")
  if (theme==="dark") {
    dark.value = false
    localStorage.setItem('data-theme', 'light')
    document.documentElement.removeAttribute("data-theme")
  } else {
    localStorage.setItem('data-theme', 'dark')
    dark.value = true
    document.documentElement.setAttribute("data-theme", "dark")
  }

}
</script>

<style scoped>

.app__header {
  padding: 0 20px;
  border-radius: 0 0 15px 15px ;
  box-shadow:  0 5px 20px 0 rgba(0,0,0, 0.1);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
}



.header__right {
  display: flex;
  align-items: center;
}

.header__user {
  margin: 0 10px;
  cursor: pointer;
}
</style>
