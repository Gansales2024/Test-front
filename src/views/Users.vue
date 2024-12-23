<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="mt-10 ml-10">
    <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
    <el-breadcrumb-item>Управление пользователями</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="flex justify-center bg-white p-2 mt-10 w-[70%] m-auto drop-shadow-xl dark:bg-[#212121] rounded-md">
      <el-table :data="UsersStore.users" size="large">
        <el-table-column prop="id" label="ID" width="100" />
        <el-table-column prop="user_name" label="Логин" width="180" />
        <el-table-column prop="role_name" label="Роль" width="300" />
        <el-table-column prop="create_time" label="Дата создания" width="300" />
        <el-table-column  label="Управление"  align="right">
          <template  #default="scope">
            <div class="flex gap-2 justify-end">
              <el-icon size="large" class="cursor-pointer hover:opacity-75"><Edit /></el-icon>
              <el-icon size="large" class="cursor-pointer hover:opacity-75"><Delete /></el-icon>
            </div>
          </template>
        </el-table-column>

      </el-table>
  </div>
 </template>

<script setup>
import {useUsersStore} from "../store/UsersStore.js";
import {onMounted} from "vue";
import {ArrowRight, Edit} from "@element-plus/icons-vue";

const UsersStore = useUsersStore()

onMounted(()=> {
  UsersStore.getUsers()
})
</script>

<style scoped>

</style>
