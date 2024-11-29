<template>
  <header class="header app__header bg-[#e5e5e5] dark:bg-[#212121]" >

    <p style="user-select: none; font-weight: bold">Test Project</p>
    <div class="header__right">
<!--      <el-avatar>{{props.name[0].toUpperCase()}}</el-avatar>-->
      <el-avatar>U</el-avatar>
      <el-dropdown trigger="click">
<!--        <p class="header__user">{{props.name}}  <el-icon> <arrow-down/></el-icon></p>-->
        <p class="header__user">User <el-icon> <arrow-down/></el-icon></p>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="dark?'Sunny':'Moon'" @click="changeTheme">Change Theme </el-dropdown-item>
            <el-dropdown-item :icon="SwitchButton" @click="logOutFunc">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup>

const router = useRouter()
const route = useRoute()
import {SwitchButton} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
const dark= ref(false)


const props = defineProps({
  name: String,
  type: String
})


const logOutFunc = () => {
  router.push({name: "auth"})

  // localStorage.clear()
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
