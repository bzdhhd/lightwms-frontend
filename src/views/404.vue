<template>
  <div class="not-found-container">
    <div class="content-wrapper">
      <!-- 404 插图/图标 -->
      <div class="error-code">404</div>
      <div class="error-icon">
        <el-icon :size="100" color="#409EFF"><Search /></el-icon>
      </div>
      
      <!-- 错误信息 -->
      <h1 class="error-title">页面未找到</h1>
      <p class="error-desc">抱歉，您访问的页面不存在或已被移除。</p>
      
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" size="large" @click="goHome">
          返回首页
        </el-button>
        <el-button size="large" @click="goBack">
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
.not-found-container {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  overflow: hidden;
}

.content-wrapper {
  text-align: center;
  padding: 40px;
  
  .error-code {
    font-size: 120px;
    font-weight: bold;
    color: #e6e8eb;
    line-height: 1;
    margin-bottom: -40px;
    z-index: 0;
    position: relative;
  }
  
  .error-icon {
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
    animation: float 3s ease-in-out infinite;
  }
  
  .error-title {
    font-size: 24px;
    color: #303133;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  .error-desc {
    font-size: 14px;
    color: #909399;
    margin-bottom: 40px;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
}

// 简单的浮动动画
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
</style>