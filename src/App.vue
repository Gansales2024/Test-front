<script setup>
import NavBar from "./components/NavBar/NavBar.vue";
import {onMounted} from "vue";

onMounted(() => {
  const theme = localStorage.getItem("data-theme")
  if (theme ==="dark") {
    document.querySelector('html').classList.add("dark")
  }
})
</script>

<template>
  <NavBar/>
  <router-view/>
</template>

<style scoped>

</style>
