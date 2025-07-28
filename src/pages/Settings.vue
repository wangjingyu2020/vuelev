<template>
  <Header />
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Settings</span>
        <el-button type="primary" @click="saveSettings">Save</el-button>
      </div>
    </template>

    <el-form label-width="150px" label-position="left">
      <el-form-item label="Monitoring Mode">
        <el-select v-model="mode" placeholder="Please select a mode">
          <el-option label="Basic Mode" value="basic" />
          <el-option label="Advanced Mode" value="advanced" />
        </el-select>
      </el-form-item>

      <el-form-item label="Enable Email Notifications">
        <el-switch v-model="emailNotifications" />
      </el-form-item>

      <el-form-item label="Enable System Alerts">
        <el-switch v-model="systemAlerts" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const mode = ref<'basic' | 'advanced'>('basic')
const emailNotifications = ref(true)
const systemAlerts = ref(false)

function saveSettings() {
  // You could persist this to localStorage or backend API
  ElMessage.success('Settings saved successfully!')
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
