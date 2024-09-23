import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userGetInfoService } from '@/api/user'

//用户模块 token setToken removeToken
const userUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() //请求获取数据
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)

export default userUserStore
// export const useUserStore = () => {
//   // Function implementation
// }
