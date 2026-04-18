<template>
  <div class="login-container">
    <!-- 左侧装饰区域 -->
    <div class="login-banner">
      <div class="banner-content">
        <h1 class="system-title">LightWMS</h1>
        <p class="system-desc">智能仓库管理系统</p>
        <div class="illustration">
          <div class="box-icon"></div>
        </div>
      </div>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="login-form-wrapper">
      <div class="login-form-content">
        <div class="form-header">
          <h2>欢迎登录</h2>
          <p>请输入您的账号和密码以访问系统</p>
        </div>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          @keyup.enter="handleLogin"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
              size="large"
              clearable
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              size="large"
              show-password
              clearable
            />
          </el-form-item>

          <!-- 记住我 & 忘记密码 -->
          <div class="form-options">
            <el-checkbox v-model="loginForm.rememberMe">记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码?</el-link>
          </div>

          <!-- 登录按钮 -->
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登 录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="footer-text">
          © 2024 LightWMS. All rights reserved.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/user'
import type { FormInstance, FormRules } from 'element-plus'

// 初始化 Store
const userStore = useUserStore()

// 表单引用
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

// 表单数据
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 表单验证规则
const loginRules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

// 登录处理函数
const handleLogin = async () => {
  // 1. 校验表单
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        // 2. 调用 Store 中的 login 方法
        // Store 内部已经处理了 API 请求、Token 保存、错误提示和路由跳转
        await userStore.login({
          username: loginForm.username,
          password: loginForm.password
        })
        
        // 注意：如果登录成功，Store 内部已经执行了 router.push
        // 所以这里不需要再写跳转逻辑
        
      } catch (error) {
        // Store 内部已经捕获错误并显示了 ElMessage
        // 这里可以添加额外的日志记录或其他处理
        console.error('Login component error:', error)
      } finally {
        // 3. 无论成功失败，都结束加载状态
        // 注意：如果登录成功并跳转了页面，这个 finally 可能不会在当前页面执行完，但这没关系
        loading.value = false
      }
    } else {
      return false
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
}

/* 左侧 Banner 样式 */
.login-banner {
  flex: 1;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  
  .banner-content {
    text-align: center;
    
    .system-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 10px;
      letter-spacing: 2px;
    }
    
    .system-desc {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 40px;
    }
    
    .illustration {
      .box-icon {
        width: 120px;
        height: 120px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 20px;
        margin: 0 auto;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        
        &::before {
          content: '📦';
          font-size: 60px;
        }
      }
    }
  }
}

/* 右侧表单样式 */
.login-form-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  
  .login-form-content {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    
    .form-header {
      margin-bottom: 40px;
      
      h2 {
        font-size: 24px;
        color: #303133;
        margin-bottom: 10px;
      }
      
      p {
        color: #909399;
        font-size: 14px;
      }
    }
    
    .login-form {
      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      
      .login-btn {
        width: 100%;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
    
    .footer-text {
      margin-top: 40px;
      text-align: center;
      color: #c0c4cc;
      font-size: 12px;
    }
  }
}

/* 响应式适配：小屏幕隐藏左侧 Banner */
@media (max-width: 768px) {
  .login-banner {
    display: none;
  }
  
  .login-form-wrapper {
    flex: 1;
  }
}
</style>