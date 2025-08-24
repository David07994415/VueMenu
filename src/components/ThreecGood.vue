<script setup>
import { ref,computed,inject } from 'vue'

const props = defineProps({
  id: {type: Number,required: true},
  title: {type: String,required: true},
  description: {type: String,required: false,default:''},
  price: {type: Number,required: true},
  imageScr: {type: String,required: true},
})

const emits = defineEmits(['addToCart'])

const sendMessage = inject('sendMessage');

function addCartHandling(title){
  sendMessage(`已將 ${title} 加入購物車`);
  emits('addToCart', props)
}

</script>

<template>

        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <img :src="props.imageScr">
            <div class="card-body">
              <h5 class="card-title">{{title}}</h5>
              <p class="card-text">{{ description}}</p>
              <p class="fw-bold text-primary">$ {{price}}</p>
              <button type="button" @click.prevent="addCartHandling(title)" class="btn btn-success w-100"> 加入購物車 </button>
            </div>
          </div>
        </div>

</template>

<style scoped>

</style>
