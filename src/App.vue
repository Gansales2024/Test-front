<script setup>
import NavBar from "./components/NavBar/NavBar.vue";
import {onMounted} from "vue";
import {useAuthStore} from "./store/AuthStore.js";

const AuthStore = useAuthStore()
onMounted(() => {
  const theme = localStorage.getItem("data-theme")
  if (theme ==="dark") {
    document.querySelector('html').classList.add("dark")
  }
})
</script>

<template>
  <NavBar v-if="AuthStore.isUserAuthenticated" :name="AuthStore.user"/>
  <router-view/>
</template>

<style scoped>

</style>
