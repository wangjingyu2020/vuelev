<template>
  <Header />

  <!-- System Overview -->
  <el-card class="mb-4">
    <h2>System Overview</h2>
    <el-alert title="System is running normally" type="success" show-icon />
  </el-card>

  <!-- Summary Statistics -->
  <el-row :gutter="20" class="mb-4">
    <el-col :span="6" v-for="(value, label) in summaryStats" :key="label">
      <el-card>
        <div class="stat-title">{{ label }}</div>
        <div class="stat-value">{{ value }}</div>
      </el-card>
    </el-col>
  </el-row>

  <!-- Chart Area -->
  <el-row :gutter="20" class="mb-4">
    <el-col :span="12">
      <el-card>
        <h3>Device Uptime Distribution</h3>
        <VueECharts class="chart" :option="barChartOption" autoresize />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
        <h3>Device Status Pie</h3>
        <VueECharts class="chart" :option="pieChartOption" autoresize />
      </el-card>
    </el-col>
  </el-row>

  <!-- Device Table -->
  <el-card>
    <h3>Device Status Table</h3>
    <el-table :data="deviceList" style="width: 100%" border>
      <el-table-column prop="name" label="Device Name" width="180" />
      <el-table-column prop="status" label="Status" width="120" />
      <el-table-column prop="ip" label="IP Address" />
      <el-table-column prop="uptime" label="Uptime" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import Header from '../components/Header.vue'
import { ref, computed } from 'vue'
import VueECharts from 'vue-echarts'
import { use } from 'echarts/core'
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart,
  PieChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

// Register only necessary ECharts components
use([
  CanvasRenderer,
  BarChart,
  PieChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])

// Dummy device data
const deviceList = ref([
  { name: 'Device A', status: 'Online', ip: '192.168.0.1', uptime: '5d 12h' },
  { name: 'Device B', status: 'Offline', ip: '192.168.0.2', uptime: '-' },
  { name: 'Device C', status: 'Online', ip: '192.168.0.3', uptime: '3d 4h' },
  { name: 'Device D', status: 'Critical', ip: '192.168.0.4', uptime: '1d' },
  { name: 'Device E', status: 'Online', ip: '192.168.0.5', uptime: '6d 2h' },
  { name: 'Device F', status: 'Offline', ip: '192.168.0.6', uptime: '-' }
])

// Summary stats
const summaryStats = computed(() => {
  const total = deviceList.value.length
  const online = deviceList.value.filter(d => d.status === 'Online').length
  const alerts = deviceList.value.filter(d => d.status !== 'Online').length
  const avgCpu = 38.6
  const net = 12.3
  return {
    'Total Devices': total,
    'Online Devices': online,
    'Active Alerts': alerts,
    'Avg CPU Load (%)': avgCpu,
  }
})

// Bar chart (uptime in days)
const barChartOption = computed(() => ({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: deviceList.value.map(d => d.name)
  },
  yAxis: { type: 'value', name: 'Uptime (days)' },
  series: [
    {
      data: deviceList.value.map(d => {
        const match = d.uptime.match(/(\d+)d/)
        return match ? parseInt(match[1]) : 0
      }),
      type: 'bar',
      name: 'Uptime'
    }
  ]
}))

// Pie chart (status breakdown)
const pieChartOption = computed(() => {
  const counts: Record<string, number> = {}
  deviceList.value.forEach(d => {
    counts[d.status] = (counts[d.status] || 0) + 1
  })
  return {
    tooltip: { trigger: 'item' },
    legend: { bottom: 10, left: 'center' },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: Object.entries(counts).map(([name, value]) => ({ name, value })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped>
.stat-title {
  font-size: 14px;
  color: #888;
}
.stat-value {
  font-size: 20px;
  font-weight: bold;
  margin-top: 4px;
}
.mb-4 {
  margin-bottom: 1rem;
}
.chart {
  height: 300px;
  width: 100%;
}
</style>
