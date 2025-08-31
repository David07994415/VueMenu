<script setup>
import { defineProps,defineEmits } from 'vue';
const props = defineProps({
    todo: {
        type: Object,
        required: true
    },
    tabName: {
        type: String,
        required: true
    }
});

const emits = defineEmits(['updateTodoEmit','deleteTodoEmit']);

function handelUpdate(){
    emits('updateTodoEmit',props.todo);
}
function handleDelete(){
    emits('deleteTodoEmit',props.todo);
}

</script>

<template>
    <li v-if="(tabName==='all') || (tabName==='notFinished' && !todo.status) || (tabName==='finished' && todo.status )">
        <label class="todoList_label">
            <input 
            class="todoList_input" 
            type="checkbox" 
            v-model="todo.status" 
            :checked="todo.status"
            @change.prevent="handelUpdate"
            >
            <span>{{todo.content}}</span>
        </label>
        <a type="button" @click.prevent="handleDelete">
            <i class="fa fa-times"></i>
        </a>
    </li>
    
</template>

<style scoped>
</style>