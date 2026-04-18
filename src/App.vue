<script setup lang="ts">
import { RouterView } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress (可选)
NProgress.configure({ 
  showSpinner: false, // 不显示右上角的旋转图标
  speed: 500,         // 动画速度
  minimum: 0.3        // 最小百分比
})
</script>

<template>
  <!-- router-view 是路由出口，匹配到的组件将渲染在这里 -->
  <router-view v-slot="{ Component }">
    <!-- 使用 transition 添加页面切换动画 (可选) -->
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
/* 全局样式重置或基础样式 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* NProgress 自定义样式 (可选) */
#nprogress .bar {
  background: #409eff !important; /* Element Plus 主题色 */
  height: 3px !important;
}

/* 页面切换淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>