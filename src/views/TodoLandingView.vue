<script setup>
import { ref,provide } from 'vue'
import TodoLogin from '../components/TodoLogin.vue'
import TodoRegister from '../components/TodoRegister.vue'
const routeName = ref('Login');
provide('routeName', routeName);

</script>

<template>
    <div id="loginPage" class="bg-yellow">
        <div class="conatiner loginPage vhContainer ">
            <div class="side">
                <a href="#"><img class="logoImg" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png" alt=""></a>
                <img class="d-m-n" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png" alt="workImg">
            </div>
            <TodoLogin    v-if="routeName=='Login'"  />
            <TodoRegister v-if="routeName=='Register'"  />
        </div>
    </div>
</template>

<style scoped>
    /* @import "../assets/todo.css"; */
</style>