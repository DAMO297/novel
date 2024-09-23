<script setup>
import { userRegisterService, userLoginService } from '@/api/user.js'
import userUserStore from '@/stores/user'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
// import { userUserStore } from '@/stores/index'
const isRegister = ref(true)
const form = ref()
//注册
//整个的用于提交的form数据对象
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 整个表单的校验规则
// 1.非空校验 required :true message消息提示, trigger触发校验时机 blur change
// 2.长度校验 min:xx ,max: xx
// 3.正则校验 pattern: 正则校验
// 4.自定义校验 =>自己写逻辑 (校验函数)
// validator: (rule,value,callback)
// 1.rule 当前校验规则相关的信息
// 2.value 所校验的表单元素目前的表单值
// 3.callback
//   -callback() 校验成功
//   -callback(new Error(错误信息)) 校验失败

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位的字符', trigger: 'blur' }

  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur'},
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位非空',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        //判断value 和当前form中收集的password是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback() //就算校验成功,也需要callback
        }
      }
    }
  ]
}

const register = async () => {
  //注册成功之前,先进行校验,校验 成功进行请求,失败会自动提示
  await form.value.validate()
  await userRegisterService(formModel.value)
  alert('注册成功')
  isRegister.value = false
}
const userStore = userUserStore()
const router = useRouter()

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  if (res.data && res.data.token) {
    userStore.setToken(res.data.token)
    ElMessage.success('登录成功')
    router.push('/')
  } else {
    console.error('Token not found in response:', res)
    ElMessage.error('登录失败，请重试。')
  }
}


//切换的的时候,重置表单内容
// eslint-disable-next-line no-undef
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<!-- el-form 整个表单组件
 el-form-item 表单的一行 (一个表单域)
 el-input 表单元素(输入框) -->

<!-- el-form => :model="ruleForm"       绑定的整个form的数据对象 {xxx, xxx, xxx}
      el-form => :riles="rules"          绑定的整个rules规则对象 { xxx , xxx, xxx}
      表单元素 => v-model="ruleForm.xxx"  给表单元素,绑定form的子属性
      el-form-item => prop配置生效的是哪个校验规则(和rules中的字段要匹配)-->
<template>
  <!-- 字 -->
  <div class="title">
    <h1>
      "备受赞誉的RPG游戏之一"
      <br />
      "已完成迈向新世代的进化"
      <br />
    </h1>
  </div>
  <div class="login-page">
    <div class="bg"></div>
    <div class="logo"></div>
    <el-row class="form-container">
      <el-col :span="12" class="form">
        <!-- 注册相关表单 -->
        <el-form
          :model="formModel"
          :rules="rules"
          ref="form"
          size="large"
          autocomplete="off"
          v-if="isRegister"
        >
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="formModel.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="formModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>

          <el-form-item prop="repassword">
            <el-input
              v-model="formModel.repassword"
              :prefix-icon="Lock"
                    type="password"
                    placeholder="请输入再次密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    @click="register"
                    class="button"
                    type="primary"
                    auto-insert-space
                  >
                    注册
                  </el-button>
                </el-form-item>
                <el-form-item class="flex">
                  <el-link type="info" :underline="false" @click="isRegister = false">
                    返回
                  </el-link>
                </el-form-item>
              </el-form>
              <el-form ref="form" size="large" autocomplete="off" v-else>
                <el-form-item>
                  <h1>登录</h1>
                </el-form-item>
      
                <el-form-item>
                  <el-input
                    v-model="formModel.username"
                    :prefix-icon="User"
                    placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
      
                <el-form-item>
                  <el-input
                    v-model="formModel.password"
                    name="password"
                    :prefix-icon="Lock"
                    type="password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
      
                <el-form-item class="flex">
                  <div class="flex">
                    <el-checkbox class="remenber">记住我</el-checkbox>
                    <el-link type="primary" :underline="false">忘记密码?</el-link>
                  </div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    @click="login"
                    class="button"
                    type="primary"
                    auto-insert-space
                  >
                    登录
                  </el-button>
                </el-form-item>
                <el-form-item class="flex">
                  <el-link type="info" :underline="false" @click="isRegister=true">
                    注册
                  </el-link>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
</template>


<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}

.remenber {
  font-size: 12px;

}

.login-page {
  height: 100vh;
  background: url('@/assets/巫师夕阳.jpg') no-repeat center center/cover;
  background-color: #fff;
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/巫师三.svg') no-repeat left top;
    opacity: 0.32; // 设置透明度
    z-index: 0;
  }

  .logo {
    position: absolute;
    top: 10px;
    left: 430px;
    width: 40%;
    height: 80%;
    background: url('@/assets/巫师logo.png') no-repeat left top;
    background-size: contain;
    z-index: 1; // 提高层级，确保显示在前
  }

  .form-container {
    position: relative;
    z-index: 2; // 提高层级，确保显示在前
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form {
    max-width: 400px;
    width: 120%;
    padding: 20px;
    height: 400px;
    border-radius: 10px;
    margin-right: -970px;
    color: #111010;
    font-family: 'MedievalSharp', cursive; // 使用游戏风格字体

    .title {
      margin: 0 auto;
      color: #ffd700;
    }
    .button {
      width: 100%;
      background-color: #988e8e; // 深红色按钮
      border-color: #706c6c;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .el-input {
        margin-bottom: 20px;
        input {
          background-color: rgba(255, 255, 255, 0.8); // 输入框背景色
          color: #000; // 输入文字颜色
        }
      }
    }
  }
}

.title {
  position: absolute;
  top: 420px;
  left: 135px;
  width: 80%;
  text-align: center;
  z-index: 3; // 提高层级，确保显示在前
}

.title h1 {
  font-size: 42px;
  color: #fbfbfb;
  font-family: 'Arial', sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 10px;
}
</style>