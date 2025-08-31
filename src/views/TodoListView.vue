<script setup>
import { ref,onMounted, computed} from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import TodoItem from '../components/TodoItem.vue'

const router = useRouter();
const userInfor = ref({
    nickname: '',
    uid:'',
    token:''
});
const todos = ref([]);
const newtodo = ref('');
const tabName = ref('all');

const notfinishedTodoCount = computed(() => {
    return todos.value.filter(item => item.status === false).length;
});

function changeTab(name){
    tabName.value=name;
}

function LoginOut(){
    clearCookie();
    router.push('/TodoLanding');
}

function GoListPage(){
    router.push('/TodoList');
}

async function addTodo(){
    if(newtodo.value===''){
        swFire('新增失敗','請輸入待辦事項','error');
        return;
    }

    let payload = {
        "content": newtodo.value,
    }

    try {
        const response = await axios.post(`${apiRootUrl}/todos`, payload,{
            headers: {
                Authorization: `${userInfor.value.token}`
            }
        })
        if(response.data.status) {
            swFire('新增成功','新增待辦事項成功','success');
            newtodo.value='';
            await loadTodoList(userInfor.value.token);
        } else {
            console.error(response);
            swFire('新增失敗','請稍後再試','error');
        }
    } catch (error) {
        console.error('新增失敗:', error)
        const msg = error.response?.data?.message?.join(',') || '新增失敗，請稍後再試'
        swFire('新增失敗',msg,'error');
    }
}

async function deleteTodo(item){

    try {
        const response = await axios.delete(`${apiRootUrl}/todos/${item.id}`,{
            headers: {
                Authorization: `${userInfor.value.token}`
            }
        })
        if(response.data.status) {
            swFire('刪除成功','刪除待辦事項成功','success');
            await loadTodoList(userInfor.value.token);
        } else {
            console.error(response);
            swFire('刪除失敗','請稍後再試','error');
        }
    } catch (error) {
        console.error('刪除失敗:', error)
        const msg = error.response?.data?.message?.join(',') || '刪除失敗，請稍後再試'
        swFire('刪除失敗',msg,'error');
    }
}

async function updateTodo(item){
    try {
        const response = await axios.patch(`${apiRootUrl}/todos/${item.id}/toggle`,{},{
            headers: {
                Authorization: `${userInfor.value.token}`
            }
        })
        if(response.data.status) {
            swFire('狀態更新成功','待辦事項更新成功','success');
            await loadTodoList(userInfor.value.token);
        } else {
            console.error(response);
            swFire('狀態更新失敗','請稍後再試','error');
        }
    } catch (error) {
        console.error('狀態更新失敗:', error)
        const msg = error.response?.data?.message?.join(',') || '狀態更新失敗，請稍後再試'
        swFire('狀態更新失敗',msg,'error');
    }
}


onMounted(async() => {
  const cookieStr = getCookie();
  if(cookieStr===''){
    clearCookie();
    router.push('/TodoLanding');
    return;
  }
  let token = cookieStr.split('=')[1];
  await checkToken(token);
  await loadTodoList(userInfor.value.token);
});

async function checkToken(token) {
    try {
      const response = await axios.get(`${apiRootUrl}/users/checkout`,{
        headers: {
            Authorization: `${token}`
        }
      })

      if(response.data.status) {
        userInfor.value = {
            nickname: response.data.nickname,
            uid: response.data.uid,
            token: token
        }
      } else {
            console.error(response);
            // clearCookie();
            // router.push('/TodoLanding');
      }
    } catch (error) {
      console.error('驗證失敗:', error)
    }
}

async function loadTodoList(token){
    try {
      const response = await axios.get(`${apiRootUrl}/todos`,{
        headers: {
            Authorization: `${token}`
        }
      })
      if(response.data.status) {
        todos.value = response.data.data;
      } else {
            console.error(response);
            // clearCookie();
            // router.push('/TodoLanding');
      }
    } catch (error) {
      console.error('loadTodoList API 失敗:', error)
    }
}

</script>

<template>
    <div id="todoListPage" class="bg-half">
        <nav>
            <h1><a type="button" @click.prevent="GoListPage">ONLINE TODO LIST</a></h1>
            <ul>
            <li class="todo_sm"><a type="button" @click.prevent="GoListPage"><span>{{userInfor.nickname}}的代辦</span></a></li>
            <li><a type="button" @click.prevent="LoginOut">登出</a></li>
            </ul>
        </nav>
        <div class="conatiner todoListPage vhContainer">
            <div class="todoList_Content">
            <div class="inputBox">
                <input v-model.trim.lazy="newtodo" type="text" placeholder="請輸入待辦事項">
                <a type="button" @click.prevent="addTodo">
                <i class="fa fa-plus text-white"></i>
                </a>
            </div>
            <div class="todoList_list">
                <ul class="todoList_tab">
                    <li>
                        <a type="button" 
                        @click.prevent="changeTab('all')" 
                        :class="tabName==='all'?'active':''">
                        全部
                        </a>
                    </li>
                    <li>
                        <a type="button" 
                        @click.prevent="changeTab('notFinished')"
                        :class="tabName==='notFinished'?'active':''">
                        待完成</a>
                    </li>
                    <li>
                        <a type="button" 
                        @click.prevent="changeTab('finished')"
                        :class="tabName==='finished'?'active':''">
                        已完成</a>
                    </li>
                </ul>
                <div class="todoList_items">
                <ul class="todoList_item" v-if="todos.length>0">
                    <TodoItem 
                    v-for="(item,index) in todos" :key="index"
                    :todo="item" :tabName="tabName"
                    @updateTodoEmit="updateTodo"
                    @deleteTodoEmit="deleteTodo"
                    />
                </ul>
                <ul class="todoList_item justify-content-center" v-else>
                    <li>
                        <span >目前尚無待辦事項</span>
                    </li>
                </ul>
                <div class="todoList_statistics" v-if="todos.length>0">
                    <p> {{notfinishedTodoCount}} 個待完成項目</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<style >  
    /* @import "../assets/todo.css"; */
</style>
