<script setup>
import { ref,inject } from 'vue'

const message = inject('message');

function closeToast(){
    message.value = '';
}

</script>

<template>
  <div class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
    <div class="toast show align-items-center text-white bg-success border-0">
      <div class="d-flex">
        <div class="toast-body">{{message}}</div>
        <button type="button" @click.prevent="closeToast" class="btn-close btn-close-white me-2 m-auto"></button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
