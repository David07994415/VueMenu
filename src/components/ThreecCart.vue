<script setup>
const props = defineProps({
  id: {type: Number,required: true},
  title: {type: String,required: true},
  prices: {type: Number,required: true},
  quantity: {type: Number,required: true},
})

const emits = defineEmits(['removeCart'])

function removeCartHandling(){
  emits('removeCart',props.id)
}

</script>

<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
        <h6 class="my-0">{{title}}</h6>
        <small class="text-muted">數量：{{quantity}}</small>
        </div>
        <div>
        <span class="text-muted">${{prices}}</span>
        <button type="button" @click="removeCartHandling" class="btn btn-sm btn-outline-danger ms-2"> 移除 </button>
        </div>
    </li>
</template>

<style scoped>

</style>
