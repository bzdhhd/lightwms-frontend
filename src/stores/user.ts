import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 假设您有一个封装好的 API 模块，如果没有，可以先注释掉导入，使用模拟逻辑
// import { loginApi, logoutApi, getUserInfoApi } from '@/api/user' 

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  // --- State (状态) ---
  const token = ref<string>(localStorage.getItem('wms_token') || '')
  const userInfo = ref<any>(JSON.parse(localStorage.getItem('wms_user_info') || 'null'))
  
  // --- Getters (计算属性) ---
  const isLogin = computed(() => !!token.value)
  const username = computed(() => userInfo.value?.username || '')
  const avatar = computed(() => userInfo.value?.avatar || '')

  // --- Actions (动作) ---

  /**
   * 登录动作
   * @param loginData 包含 username 和 password 的对象
   */
  const login = async (loginData: { username: string; password: string }) => {
    try {
      // 1. 调用后端登录接口 (实际项目中取消注释并使用真实 API)
      // const res = await loginApi(loginData)
      // const { token: newToken, user } = res.data
      
      // --- 模拟登录逻辑开始 ---
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (loginData.username === 'admin' && loginData.password === '123456') {
        var newToken = 'mock-token-' + Date.now()
        var user = {
          id: 1,
          username: loginData.username,
          nickname: '管理员',
          roles: ['admin']
        }
      } else {
        throw new Error('用户名或密码错误')
      }
      // --- 模拟登录逻辑结束 ---

      // 2. 保存 Token 和用户信息
      setToken(newToken)
      setUserInfo(user)

      ElMessage.success('登录成功')
      
      // 3. 跳转到首页或重定向页面
      // 如果路由中有 redirect 参数，则跳转过去，否则跳转首页
      const redirect = router.currentRoute.value.query.redirect as string
      router.push(redirect || '/')
      
    } catch (error: any) {
      ElMessage.error(error.message || '登录失败，请稍后重试')
      return Promise.reject(error)
    }
  }

  /**
   * 退出登录
   */
  const logout = async () => {
    try {
      // 1. 调用后端退出接口 (可选)
      // await logoutApi()
      
      // 2. 清除本地状态
      resetState()
      
      ElMessage.success('已退出登录')
      
      // 3. 跳转回登录页
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      // 即使接口失败，也要清除本地状态
      resetState()
      router.push('/login')
    }
  }

  /**
   * 获取用户详细信息 (通常在登录后或刷新页面时调用)
   */
  const fetchUserInfo = async () => {
    if (!token.value) return
    
    try {
      // 1. 调用后端获取用户信息接口
      // const res = await getUserInfoApi()
      // setUserInfo(res.data)
      
      // --- 模拟获取用户信息 ---
      // 如果本地已经有 userInfo，通常不需要再次请求，除非需要最新数据
      if (!userInfo.value) {
         // 模拟请求
         await new Promise(resolve => setTimeout(resolve, 500))
         setUserInfo({
           id: 1,
           username: 'admin',
           nickname: '管理员',
           roles: ['admin']
         })
      }
      // --- 模拟结束 ---
      
    } catch (error) {
      console.error('Fetch user info error:', error)
      // 如果获取用户信息失败（如 Token 过期），则强制退出
      logout()
    }
  }

  // --- Helper Functions (辅助函数) ---

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('wms_token', newToken)
  }

  const setUserInfo = (info: any) => {
    userInfo.value = info
    localStorage.setItem('wms_user_info', JSON.stringify(info))
  }

  const resetState = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('wms_token')
    localStorage.removeItem('wms_user_info')
  }

  return {
    // State
    token,
    userInfo,
    // Getters
    isLogin,
    username,
    avatar,
    // Actions
    login,
    logout,
    fetchUserInfo,
    setToken,
    setUserInfo,
    resetState
  }
})