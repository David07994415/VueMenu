<script setup>
    import { ref,inject, watch } from 'vue'
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import site from '../assets/site.js';  // 使用 default import
    const { apiRootUrl, handleErrorMsgs,swFire,getCookie,clearCookie,emailPattern } = site;  // 解構出需要的函數和變數

    const router = useRouter();
    const routeName = inject('routeName');
    const email =ref('');
    const password =ref('');
    const emailError =ref('');
    const passwordError =ref('');

    watch(email,(newVal)=>{
        if(newVal===''){
           emailError.value = "Email 不能為空";
           return;
        }

        if(!emailPattern.test(newVal)){
            emailError.value = "Email 格式不正確";
            return;
        }
        emailError.value='';
    },{ immediate: false })

    watch(password,(newVal)=>{
        if(newVal==='') {
            passwordError.value = '密碼不能為空';
            return;
        }
        if(newVal.length < 6){
            passwordError.value = '密碼長度需大於6';
            return;
        }
        passwordError.value = '';
    },{ immediate: false });

    function goRegister(){
        routeName.value='Register';
    }
    async function doLogin(){
        if(emailError.value!=='' || passwordError.value!==''){
            swFire('登入失敗','請修正輸入錯誤','error');
            return;
        }

        if(email.value=='' || password.value==''){
            swFire('登入失敗','請填寫相關資料','error');
            return;
        }

        let payload = {
            "email": email.value,
            "password": password.value,
        }

        try {
            const response = await axios.post(`${apiRootUrl}/users/sign_in`, payload)
            if(response.data.status) {
                // 儲存 token 到 cookie
                document.cookie = `todolistToken=${response.data.token}; path=/; max-age=${response.data.exp}`

                // 登入成功後導向
                router.push({ path: '/TodoList' }); // 或使用 path: '/home'
                
            } else {
                swFire('登入失敗','請稍後再試','error');
            }
        } catch (error) {
            console.error('登入失敗:', error)
            let msg = error.response?.data?.message;
            const errmsg = handleErrorMsgs(msg) || '登入失敗，請稍後再試';
            swFire('登入失敗',errmsg,'error');
        }  
    }
</script>

<template>
    <div>
        <form class="formControls">
            <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
            
            <label class="formControls_label" for="email">Email</label>
            <input v-model.lazy.trim = "email" class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required>
            <span v-if="emailError">{{emailError}}</span>

            <label class="formControls_label" for="pwd">密碼</label>
            <input v-model.lazy.trim="password" class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
            <span v-if="passwordError">{{passwordError}}</span>

            <input class="formControls_btnSubmit" type="button"
            @click.prevent="doLogin" value="登入">

            <a class="formControls_btnLink" type="button" @click.prevent="goRegister">註冊帳號</a>
        </form>
    </div>
</template>

<style scoped>
    /* @import "../assets/todo.css"; */
</style>   