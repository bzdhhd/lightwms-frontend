<template>
  <el-container class="layout-container">
    <!-- 左侧侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '220px'" class="layout-aside">
      <div class="logo-container">
        <img v-if="!isCollapse" src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="logo-img" />
        <span v-if="!isCollapse" class="logo-title">LightWMS</span>
        <span v-else class="logo-mini">L</span>
      </div>
      
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><Odometer /></el-icon>
          <template #title>仪表盘</template>
        </el-menu-item>
        
        <el-sub-menu index="/warehouse">
          <template #title>
            <el-icon><OfficeBuilding /></el-icon>
            <span>仓库管理</span>
          </template>
          <el-menu-item index="/warehouse/list">仓库列表</el-menu-item>
          <el-menu-item index="/warehouse/area">库区管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/inventory">
          <template #title>
            <el-icon><Box /></el-icon>
            <span>库存管理</span>
          </template>
          <el-menu-item index="/inventory/query">库存查询</el-menu-item>
          <el-menu-item index="/inventory/alert">库存预警</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/inbound">
          <template #title>
            <el-icon><Download /></el-icon>
            <span>入库管理</span>
          </template>
          <el-menu-item index="/inbound/order">入库单</el-menu-item>
          <el-menu-item index="/inbound/task">入库任务</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/outbound">
          <template #title>
            <el-icon><Upload /></el-icon>
            <span>出库管理</span>
          </template>
          <el-menu-item index="/outbound/order">出库单</el-menu-item>
          <el-menu-item index="/outbound/task">出库任务</el-menu-item>
        </el-sub-menu>
        
        <el-menu-item index="/system">
          <el-icon><Setting /></el-icon>
          <template #title>系统设置</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 右侧主体区域 -->
    <el-container class="main-container">
      <!-- 顶部导航栏 -->
      <el-header class="layout-header">
        <div class="header-left">
          <el-icon class="collapse-icon" @click="toggleCollapse">
            <Expand v-if="isCollapse" />
            <Fold v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>仪表盘</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <div class="header-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="user-info">
              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              <span class="username">{{ userStore.username || '管理员' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { 
  Odometer, OfficeBuilding, Box, Download, Upload, Setting, 
  Expand, Fold, ArrowDown 
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 侧边栏折叠状态
const isCollapse = ref(false)

// 当前激活的菜单项
const activeMenu = computed(() => route.path)

// 切换侧边栏折叠
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 处理下拉菜单命令
const handleCommand = (command: string) => {
  if (command === 'logout') {
    userStore.logout()
  } else if (command === 'profile') {
    // TODO: 跳转到个人中心
    console.log('跳转到个人中心')
  }
}
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  width: 100%;
}

.layout-aside {
  background-color: #304156;
  transition: width 0.3s;
  overflow-x: hidden;
  
  .logo-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b3a4c;
    color: #fff;
    
    .logo-img {
      height: 32px;
      margin-right: 10px;
    }
    
    .logo-title {
      font-size: 18px;
      font-weight: bold;
    }
    
    .logo-mini {
      font-size: 20px;
      font-weight: bold;
    }
  }
  
  .el-menu {
    border-right: none;
  }
}

.main-container {
  display: flex;
  flex-direction: column;
}

.layout-header {
  background-color: #fff;
  border-bottom: 1px solid #dfe6ec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  
  .header-left {
    display: flex;
    align-items: center;
    
    .collapse-icon {
      font-size: 20px;
      cursor: pointer;
      margin-right: 20px;
      &:hover {
        color: #409EFF;
      }
    }
  }
  
  .header-right {
    .user-info {
      display: flex;
      align-items: center;
      cursor: pointer;
      
      .username {
        margin: 0 10px;
        font-size: 14px;
      }
    }
  }
}

.layout-main {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>