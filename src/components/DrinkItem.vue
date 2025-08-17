<script setup>
import { ref,computed } from 'vue'

const props = defineProps({
  drink: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['addToCart'])
// 如何將 emit 傳入到父組件
// 這裡的 addToCart 是父組件 DrinkView.vue 中定義的事件名稱 

</script>

<template>
    <a href="#" 
        class="list-group-item list-group-item-action"
        @click.prevent="emits('addToCart', props.drink)"
    >
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{props.drink.name}}</h5>
        <small>{{props.drink.price}}</small>
        </div>
        <p class="mb-1">{{props.drink.description}}</p>
    </a>
</template>