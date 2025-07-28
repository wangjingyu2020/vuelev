<template>
  <Header />

  <el-card>
    <!-- Header Section with Actions -->
    <template #header>
      <div class="card-header">
        <span>Monitoring Report</span>
        <div class="actions">
          <el-button type="primary" @click="refreshData">Refresh</el-button>
          <el-button type="success" @click="exportToExcel">Export</el-button>
        </div>
      </div>
    </template>

    <!-- Status Summary Tags -->
    <div class="summary">
      <el-tag type="success">Normal: {{ statusCount('Normal') }}</el-tag>
      <el-tag type="warning">Warning: {{ statusCount('Warning') }}</el-tag>
      <el-tag type="danger">Critical: {{ statusCount('Critical') }}</el-tag>
    </div>

    <!-- Data Table -->
    <el-table
      :data="store.monitorList"
      highlight-current-row
      @row-click="handleRowClick"
      style="margin-top: 16px"
    >
      <el-table-column prop="name" label="Item" width="180" />
      <el-table-column prop="status" label="Status" width="140">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updated" label="Last Updated" />
    </el-table>

    <!-- Selected Row Detail -->
    <div v-if="store.selectedItem" class="selected-info">
      <h4>Selected:</h4>
      <el-descriptions :column="1" border size="small">
        <el-descriptions-item label="Name">
          {{ store.selectedItem.name }}
        </el-descriptions-item>
        <el-descriptions-item label="Status">
          <el-tag :type="statusTagType(store.selectedItem.status)">
            {{ store.selectedItem.status }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Updated">
          {{ store.selectedItem.updated }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import { useMonitorStore } from '../stores/monitor'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'

const store = useMonitorStore()

// Handle table row click
function handleRowClick(row: typeof store.monitorList[0]) {
  store.selectItem(row)
}

// Map status to Element Plus tag type
function statusTagType(status: string): 'success' | 'warning' | 'danger' | 'info' {
  switch (status) {
    case 'Normal':
      return 'success'
    case 'Warning':
      return 'warning'
    case 'Critical':
      return 'danger'
    default:
      return 'info'
  }
}

// Count items by status
function statusCount(type: string): number {
  return store.monitorList.filter(item => item.status === type).length
}

// Simulate data refresh
function refreshData() {
  store.setLoading(true)
  setTimeout(() => {
    ElMessage.success('Data refreshed successfully')
    store.setLoading(false)
  }, 1000)
}

// Export current monitor list to Excel
function exportToExcel() {
  const data = store.monitorList.map(item => ({
    Name: item.name,
    Status: item.status,
    Updated: item.updated
  }))
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MonitoringReport')
  XLSX.writeFile(workbook, 'Monitoring_Report.xlsx')
}
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions {
  display: flex;
  gap: 8px;
}
.summary {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.selected-info {
  margin-top: 24px;
}
</style>
