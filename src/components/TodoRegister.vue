<script setup>
    import { ref,inject, watch } from 'vue'
    import axios from 'axios';
    import site from '../assets/site.js';  // 使用 default import
    const { apiRootUrl, handleErrorMsgs,swFire,getCookie,clearCookie,emailPattern } = site;  // 解構出需要的函數和變數

    const routeName = inject('routeName');
    
    const email = ref("");
    const name = ref("");
    const password = ref("");
    const passwordCheck = ref("");

    const errorMessage = ref({
        email: '',
        name: '',
        password: '',
        passwordCheck: ''
    });
    
    watch(email,(newVal)=>{
        if(newVal===''){
           errorMessage.value.email = "Email 不能為空";
           return;
        }
        if(!emailPattern.test(newVal)){
            errorMessage.value.email = "Email 格式不正確";
            return;
        }
        errorMessage.value.email='';
    },{ immediate: false })

    watch(name,(newVal)=>{
        errorMessage.value.name = newVal === '' ? '暱稱不能為空' : '';
    },{ immediate: false });

    watch(password,(newVal)=>{
        if(newVal==='') {
            errorMessage.value.password = '密碼不能為空';
            return;
        }
        if(newVal.length < 6){
            errorMessage.value.password = '密碼長度需大於6';
            return;
        }
        errorMessage.value.password = '';
    },{ immediate: false });

    watch(passwordCheck,(newVal)=>{
        if(newVal==='') {
            errorMessage.value.passwordCheck = '密碼確認不能為空';
            return;
        }
        if(newVal !== password.value){
            errorMessage.value.passwordCheck = '密碼輸入不一致';
            return;
        }
        errorMessage.value.passwordCheck = '';
    },{ immediate: false });
    
    function goLogin(){
        routeName.value='Login';
    }
    async function doRegister(){
        if(errorMessage.value.email!=='' || errorMessage.value.name!==''
            || errorMessage.value.password!=='' || errorMessage.value.passwordCheck!==''
        ){
            swFire('註冊失敗','請修正輸入錯誤','error');
            return;
        }

        if(email.value=='' || name.value=='' || password.value=='' 
            || passwordCheck.value==''
        ){
            swFire('註冊失敗','請填寫相關資料','error');
            return;
        }

        let payload = {
            "email": email.value,
            "password": password.value,
            "nickname": name.value
        }

        try {
            const response = await axios.post(`${apiRootUrl}/users/sign_up`, payload)
            if(response.data.status) {
                swFire('註冊成功','前往登入頁面','success').then((result)=>{
                    if(result.isConfirmed){
                        routeName.value='Login';
                    }
                });
            } else {
                swFire('註冊失敗','請稍後再試','error');
            }
        } catch (error) {
            console.error('註冊失敗:', error)
            let msg = error.response?.data?.message;
            const errmsg = handleErrorMsgs(msg) || '註冊失敗，請稍後再試';
            swFire('註冊失敗',errmsg,'error');
        }  
    }
    
</script>

<template>
    <div>
      <form class="formControls">
        <h2 class="formControls_txt">註冊帳號</h2>

        <label class="formControls_label" for="email">Email</label>
        <input v-model.trim.lazy="email"
        class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required>
        <span v-if="errorMessage.email">{{errorMessage.email}}</span>

        <label class="formControls_label" for="name">您的暱稱</label>
        <input v-model.trim.lazy="name"
        class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱">
        <span v-if="errorMessage.name">{{errorMessage.name}}</span>

        <label class="formControls_label" for="pwd">密碼</label>
        <input v-model.trim.lazy="password"
        class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
        <span v-if="errorMessage.password">{{errorMessage.password}}</span>

        <label class="formControls_label" for="pwdCheck">再次輸入密碼</label>
        <input v-model.trim.lazy="passwordCheck"
        class="formControls_input" type="password" name="pwdCheck" id="pwdCheck" placeholder="請再次輸入密碼" required>
        <span v-if="errorMessage.passwordCheck">{{errorMessage.passwordCheck}}</span>

        <input class="formControls_btnSubmit" type="button" 
        @click.prevent="doRegister" value="註冊帳號">
        <a class="formControls_btnLink" type="button" @click.prevent="goLogin">登入</a>

      </form>
    </div>
</template>

<style scoped>
    /* @import "../assets/todo.css"; */
</style> 