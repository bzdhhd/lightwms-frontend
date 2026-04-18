import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'
import NProgress from 'nprogress' // 确保已安装: npm install nprogress

// 定义路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: '登录 - LightWMS',
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/Index.vue'),
    redirect: '/dashboard',
    children: [
      // 1. 仪表盘
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: {
          title: '仪表盘',
          icon: 'Odometer',
          requiresAuth: true
        }
      },
      
      // 2. 仓库管理模块
      {
        path: 'warehouse',
        name: 'Warehouse',
        redirect: '/warehouse/list',
        meta: {
          title: '仓库管理',
          icon: 'OfficeBuilding',
          requiresAuth: true
        },
        children: [
          {
            path: 'list',
            name: 'WarehouseList',
            component: () => import('@/views/warehouse/List.vue'), // 需创建对应文件
            meta: { title: '仓库列表', requiresAuth: true }
          },
          {
            path: 'area',
            name: 'WarehouseArea',
            component: () => import('@/views/warehouse/Area.vue'), // 需创建对应文件
            meta: { title: '库区管理', requiresAuth: true }
          }
        ]
      },

      // 3. 库存管理模块
      {
        path: 'inventory',
        name: 'Inventory',
        redirect: '/inventory/query',
        meta: {
          title: '库存管理',
          icon: 'Box',
          requiresAuth: true
        },
        children: [
          {
            path: 'query',
            name: 'InventoryQuery',
            component: () => import('@/views/inventory/Query.vue'), // 需创建对应文件
            meta: { title: '库存查询', requiresAuth: true }
          },
          {
            path: 'alert',
            name: 'InventoryAlert',
            component: () => import('@/views/inventory/Alert.vue'), // 需创建对应文件
            meta: { title: '库存预警', requiresAuth: true }
          }
        ]
      },

      // 4. 入库管理模块
      {
        path: 'inbound',
        name: 'Inbound',
        redirect: '/inbound/order',
        meta: {
          title: '入库管理',
          icon: 'Download',
          requiresAuth: true
        },
        children: [
          {
            path: 'order',
            name: 'InboundOrder',
            component: () => import('@/views/inbound/Order.vue'), // 需创建对应文件
            meta: { title: '入库单', requiresAuth: true }
          },
          {
            path: 'task',
            name: 'InboundTask',
            component: () => import('@/views/inbound/Task.vue'), // 需创建对应文件
            meta: { title: '入库任务', requiresAuth: true }
          }
        ]
      },

      // 5. 出库管理模块
      {
        path: 'outbound',
        name: 'Outbound',
        redirect: '/outbound/order',
        meta: {
          title: '出库管理',
          icon: 'Upload',
          requiresAuth: true
        },
        children: [
          {
            path: 'order',
            name: 'OutboundOrder',
            component: () => import('@/views/outbound/Order.vue'), // 需创建对应文件
            meta: { title: '出库单', requiresAuth: true }
          },
          {
            path: 'task',
            name: 'OutboundTask',
            component: () => import('@/views/outbound/Task.vue'), // 需创建对应文件
            meta: { title: '出库任务', requiresAuth: true }
          }
        ]
      },

      // 6. 系统设置
      {
        path: 'system',
        name: 'System',
        component: () => import('@/views/system/Index.vue'), // 需创建对应文件
        meta: {
          title: '系统设置',
          icon: 'Setting',
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start() // 开始进度条
  
  document.title = (to.meta.title as string) ? `${to.meta.title} - LightWMS` : 'LightWMS'

  const userStore = useUserStore() 
  const token = userStore.token || localStorage.getItem('wms_token')

  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (to.path === '/login' && token) {
      next({ path: '/' })
    } else {
      next()
    }
  }
})

// 全局后置钩子
router.afterEach(() => {
  NProgress.done() // 结束进度条
})

export default router