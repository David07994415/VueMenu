<script setup>
  import { ref } from 'vue'

  let drinksArray = [
    { name: '珍珠奶茶', description: '香濃奶茶搭配QQ珍珠', price: 50, stock: 20,isEdit: false },
    { name: '冬瓜檸檬', description: '清新冬瓜配上新鮮檸檬', price: 45, stock: 18 ,isEdit: false},
    { name: '翡翠檸檬', description: '綠茶與檸檬的完美結合', price: 55, stock: 34,isEdit: false },
    { name: '四季春茶', description: '香醇四季春茶，回甘無比', price: 45, stock: 10 ,isEdit: false},
    { name: '阿薩姆奶茶', description: '阿薩姆紅茶搭配香醇鮮奶', price: 50, stock: 25 ,isEdit: false},
    { name: '檸檬冰茶', description: '檸檬與冰茶的清新組合', price: 45, stock: 20 ,isEdit: false},
    { name: '芒果綠茶', description: '芒果與綠茶的獨特風味', price: 55, stock: 18,isEdit: false },
    { name: '抹茶拿鐵', description: '抹茶與鮮奶的絕配', price: 60, stock: 20 ,isEdit: false}
  ]

  const drinks =ref(drinksArray);

  const minus = (drink) => {
    if (drink.stock > 0) {
      drink.stock--
    }
    else {
      alert('庫存已經為0，無法減少庫存')
    }
  }

  const plus = (drink) => {
    drink.stock++
  }

  const edit = (drink) => {
    drink.tempObj = {...drink}
    drink.isEdit = true
  }

  const confirm = (drink) => {

    if(drink.tempObj.name.trim() === '') {
      alert('品項名稱不能為空')
        drink.tempObj.name = drink.name
      return
    }

    drink.name = drink.tempObj.name
    drink.isEdit = false
    drink.tempObj = null
  }

  const cancel = (drink) => {
    drink.isEdit = false
    drink.tempObj.name = drink.name
    drink.tempObj = null
  }

</script>

<template>
  <h2>Week 1: Menu</h2>
  <table>
    <thead>
      <tr>
        <th scope="col">品項</th>
        <th scope="col">描述</th>
        <th scope="col">價格</th>
        <th scope="col">庫存</th>
        <th scope="col">功能</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="drink in drinks" :key="drink.name">
        <td v-if="drink.isEdit==true">
          <input type="text" v-model="drink.tempObj.name" placeholder="請輸入名稱"/>
        </td>
        <td v-else>
          <span>{{ drink.name }}</span>
        </td>
        <td><small>{{ drink.description }}</small></td>
        <td>{{ drink.price }}</td>
        <td>
          <button type="button" @click="minus(drink)" :disabled="drink.stock==0">-</button>
          {{drink.stock}}
          <button type="button" @click="plus(drink)">+</button>
        </td>
        <td>
          <button v-show="drink.isEdit==false"  type="button" @click="edit(drink)">編輯</button>
          <button v-show="drink.isEdit==true" type="button" @click="confirm(drink)">確認</button>
          <button v-show="drink.isEdit==true" type="button" @click="cancel(drink)">取消</button>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<style scoped>
  
</style>
