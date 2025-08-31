<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import NavRouter from '../components/NavRouter.vue'

  const apiRootUrl = "https://todolist-api.hexschool.io"

  const registerAccount = ref('')
  const registerPassword = ref('')
  const registerNickName = ref('')
  const registerResultObj = ref({isValid: false, message: ''})

  const loginAccount = ref('')
  const loginPassword = ref('')
  const loginResultObj = ref({isValid: false, message: ''})

  const verifyResultObj = ref({isValid: false, message: ''})

  async function register() {

    if(registerAccount.value===''){
        registerResultObj.value = { isValid: false, message: '帳號不能為空' }
        return
    }else if(registerPassword.value===''){
        registerResultObj.value = { isValid: false, message: '密碼不能為空' }
        return
    }else if(registerNickName.value===''){
        registerResultObj.value = { isValid: false, message: '暱稱不能為空' }
        return
    }
   
    let payload = {
      "email": registerAccount.value,
      "password": registerPassword.value,
      "nickname": registerNickName.value
    }

    try {
      const response = await axios.post(`${apiRootUrl}/users/sign_up`, payload)
      if(response.data.status) {
        registerResultObj.value = { isValid: true, message: `註冊成功，uid:${response.data.uid}` }
      } else {
        registerResultObj.value = { isValid: false, message: '註冊失敗，請稍後再試' }
      }
    } catch (error) {
      console.error('註冊失敗:', error)
      const msg = error.response?.data?.message?.join(',') || '註冊失敗，請稍後再試'
      registerResultObj.value = { isValid: false, message: msg }
    }
  }

  async function login() {

    if(loginAccount.value===''){
        loginResultObj.value = { isValid: false, message: '帳號不能為空' }
        return
    }else if(loginPassword.value===''){
        loginResultObj.value = { isValid: false, message: '密碼不能為空' }
        return
    }
   
    let payload = {
      "email": loginAccount.value,
      "password": loginPassword.value,
    }

    try {
      const response = await axios.post(`${apiRootUrl}/users/sign_in`, payload)
      if(response.data.status) {
        loginResultObj.value = { isValid: true, message: `登入成功，token:${response.data.token}`}

        // 儲存 token 到 cookie
        document.cookie = `todolistToken=${response.data.token}; path=/; max-age=${response.data.exp}`
      } else {
        loginResultObj.value = { isValid: false, message: '登入失敗，請稍後再試' }
      }
    } catch (error) {
      console.error('登入失敗:', error)
      const msg = error.response?.data?.message || '登入失敗，請稍後再試'
      loginResultObj.value = { isValid: false, message: msg }
    }
  }

  async function verify() {

    // 從 cookie 中取得 token，cookie 名稱為 todolistToken
    const token = document.cookie.split(';').find(row => row.startsWith('todolistToken='))

    if (!token) {
      verifyResultObj.value = { isValid: false, message: '請先登入' }
      return
    }

    const tokenValue = token.split('=')[1]
    if (!tokenValue) {
      verifyResultObj.value = { isValid: false, message: '無效的 token' }
      return
    }

    try {
      const response = await axios.get(`${apiRootUrl}/users/checkout`,{
        headers: {
            Authorization: `${tokenValue}`
        }
      })

      if(response.data.status) {
        verifyResultObj.value = { isValid: true, message: `驗證成功，uid:${response.data.uid}`}
      } else {
        verifyResultObj.value = { isValid: false, message: '驗證失敗，請稍後再試' }
      }
    } catch (error) {
      console.error('驗證失敗:', error)
      const msg = error.response?.data?.message?.join(',') || '驗證失敗，請稍後再試'
      verifyResultObj.value = { isValid: false, message: msg }
    }
  }

</script>

<template>
  <NavRouter />
  <h2>Week 2: Register</h2>
  <div class="d-flex justify-content-start flex-column gap-3">
    <div>
        <h3>註冊</h3>
        <div class="d-flex justify-content-start gap-2">
            <input type="text" v-model.trim="registerAccount" placeholder="請填寫帳號" />
            <input type="text" v-model.trim="registerPassword" placeholder="請填寫密碼" />
            <input type="text" v-model.trim="registerNickName" placeholder="請填寫暱稱" />
            <button class="btn btn-primary" type="button" @click="register">進行註冊</button>
        </div>
        <span :class="registerResultObj.isValid?'text-primary':'text-danger'">
            {{ registerResultObj.message }}
        </span>
    </div>
    <div>
        <h3>登入</h3>
        <div class="d-flex justify-content-start gap-2">
            <input type="text" v-model.trim="loginAccount" placeholder="請填寫帳號" />
            <input type="text" v-model.trim="loginPassword" placeholder="請填寫密碼" />
            <button class="btn btn-primary" type="button" @click="login">進行登入</button>
        </div>
        <span :class="loginResultObj.isValid?'text-primary':'text-danger'">
            {{ loginResultObj.message }}
        </span>
    </div>
    <div>
        <h3>驗證</h3>
        <div class="d-flex justify-content-start gap-2">
            <button class="btn btn-primary" type="button" @click="verify">進行驗證</button>
        </div>
        <span :class="verifyResultObj.isValid?'text-primary':'text-danger'">
            {{ verifyResultObj.message }}
        </span>
    </div>
  </div>

</template>

<style scoped>
  
</style>
