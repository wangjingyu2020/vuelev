import { defineStore } from 'pinia'

export interface MonitorItem {
  name: string
  status: string
  updated: string
}

export const useMonitorStore = defineStore('monitor', {
  state: () => ({
    loading: false,
    selectedItem: null as MonitorItem | null,
    monitorList: [
  { name: 'CPU Usage', status: 'Normal', updated: '2025-07-27 12:00' },
  { name: 'Memory Usage', status: 'Warning', updated: '2025-07-27 12:01' },
  { name: 'Network Connection', status: 'Critical', updated: '2025-07-27 12:02' }
] as MonitorItem[]
  }),
  actions: {
    setLoading(val: boolean) {
      this.loading = val
    },
    selectItem(item: MonitorItem) {
      this.selectedItem = item
    },
    updateStatus(index: number, status: string) {
      this.monitorList[index].status = status
    }
  }
})
