<template>
  <div class="dashboard-container">
    <!-- 欢迎语 -->
    <div class="welcome-banner">
      <h2>欢迎回来，{{ userStore.username || '管理员' }}！</h2>
      <p>今天是 {{ currentDate }}，祝您工作愉快。</p>
    </div>

    <!-- 关键指标卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-blue">
              <el-icon><Box /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">1,234</div>
              <div class="stat-label">总库存数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-green">
              <el-icon><Download /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">56</div>
              <div class="stat-label">今日入库单</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-orange">
              <el-icon><Upload /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">42</div>
              <div class="stat-label">今日出库单</div>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-content">
            <div class="stat-icon bg-red">
              <el-icon><Warning /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">8</div>
              <div class="stat-label">库存预警</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>出入库趋势图</span>
            </div>
          </template>
          <div class="chart-placeholder">
            <v-chart class="chart" :option="chartOption" autoresize />
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>仓库容量占比</span>
            </div>
          </template>
          <div class="chart-placeholder">
             <!-- 这里可以放饼图，暂时用文字占位 -->
             <div style="height: 300px; display: flex; justify-content: center; align-items: center; color: #909399;">
               图表组件加载中...
             </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <!-- 待办事项 -->
    <el-card shadow="hover" class="todo-list">
      <template #header>
        <div class="card-header">
          <span>待办事项</span>
          <el-button type="primary" link>查看全部</el-button>
        </div>
      </template>
      <el-table :data="todoList" style="width: 100%" :show-header="false">
        <el-table-column prop="title" label="Title" />
        <el-table-column prop="status" label="Status" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '紧急' ? 'danger' : 'info'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { Box, Download, Upload, Warning } from '@element-plus/icons-vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

// 注册 ECharts 组件
use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const userStore = useUserStore()

// 获取当前日期
const currentDate = computed(() => {
  const date = new Date()
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})

// 模拟待办数据
const todoList = ref([
  { title: '审核入库单 RK20240501001', status: '紧急' },
  { title: '处理出库异常 OC20240501005', status: '普通' },
  { title: '盘点仓库 A 区', status: '普通' },
])

// ECharts 配置
const chartOption = ref({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '入库',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: { color: '#409EFF' }
    },
    {
      name: '出库',
      type: 'bar',
      data: [60, 100, 80, 50, 40, 60, 90],
      itemStyle: { color: '#67C23A' }
    }
  ]
})
</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 0;
}

.welcome-banner {
  margin-bottom: 20px;
  h2 {
    margin: 0 0 10px 0;
    color: #303133;
  }
  p {
    margin: 0;
    color: #909399;
  }
}

.stats-row {
  margin-bottom: 20px;
  
  .stat-card {
    border: none;
    
    .stat-content {
      display: flex;
      align-items: center;
      
      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        color: #fff;
        margin-right: 15px;
        
        &.bg-blue { background: linear-gradient(135deg, #409eff, #66b1ff); }
        &.bg-green { background: linear-gradient(135deg, #67c23a, #85ce61); }
        &.bg-orange { background: linear-gradient(135deg, #e6a23c, #ebb563); }
        &.bg-red { background: linear-gradient(135deg, #f56c6c, #f78989); }
      }
      
      .stat-info {
        .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
          margin-bottom: 5px;
        }
        .stat-label {
          font-size: 14px;
          color: #909399;
        }
      }
    }
  }
}

.chart-row {
  margin-bottom: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
  
  .chart-placeholder {
    height: 300px;
    width: 100%;
    
    .chart {
      height: 100%;
      width: 100%;
    }
  }
}

.todo-list {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
  }
}
</style>