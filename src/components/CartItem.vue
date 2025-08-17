<script setup>
import { ref,computed } from 'vue'

const props = defineProps({
  cart: {
    type: Object,
    required: true
  }
});

const emits = defineEmits(['removeCart','updateCart']);
</script>

<template>
    <tr>
        <td>
            <button type="button" class="btn btn-sm" @click.prevent="emits('removeCart', props.cart)">x</button>
        </td>
        <td>{{props.cart.name}}</td>
        <td><small>{{props.cart.description}}</small></td>
        <td>
        <select class="form-select" v-model="props.cart.quantity" @change.prevent="emits('updateCart', props.cart)">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </td>
        <td>{{props.cart.price}}</td>
        <td>{{props.cart.prices}}</td>
    </tr>
</template>