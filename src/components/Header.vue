<template>
  <el-menu mode="horizontal" router :default-active="$route.path">
    <el-menu-item index="/dashboard">Dashboard</el-menu-item>
    <el-menu-item index="/reports">Reports</el-menu-item>
    <el-menu-item index="/settings">Settings</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>
