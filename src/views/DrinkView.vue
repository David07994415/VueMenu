<script setup>
import { ref,computed } from 'vue'
import NavRouter from '../components/NavRouter.vue'
import DrinkItem from '../components/DrinkItem.vue'
import CartItem from '../components/CartItem.vue'

const data = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
  },
];

const drinks = ref(data);
const carts = ref([]);
const cartDescription = ref('');
const orderDescription = ref('');
const orders = ref([]);

const totalCart = computed(() => {
  let sum = 0;
  carts.value.forEach((item) => {
    sum += item.price * item.quantity;
  })
  return sum;
});

const totalOrder = computed(() => {
  let sum = 0;
  orders.value.forEach((item) => {
    sum += item.prices;
  })
  return sum;
});

const addToCart = (drink) => {
    let existInCarts = carts.value.find((item) => item.id === drink.id);
    if(existInCarts){
        alert("已經加入購物車，請勿重複加入");
        return
    }
    carts.value.push({
        ...drink,
        quantity: 1,
        prices: drink.price * 1
    });
};

const updateCart = (cart) => {
    let existInCarts = carts.value.find((item) => item.id === cart.id);
    if (!existInCarts) {
      console.error('找不到該品項');
      return;
    }
    const newQuantity = parseInt(cart.quantity)
    existInCarts.quantity = isNaN(newQuantity) ? 1 : newQuantity;
    existInCarts.prices = existInCarts.price * (isNaN(newQuantity) ? 1 : newQuantity);
    
    // carts.value = carts.value.map((item) => {
    // if (item.id === cart.id) {
    //   const quantity = parseInt(cart.quantity);
    //   let newCart = {
    //     ...item,
    //     quantity: isNaN(quantity) ? 1 : quantity,
    //     prices: item.price * (isNaN(quantity) ? 1 : quantity),
    //   };
    //   return newCart;
    // }
    // return item;
    //});
};

const removeCart = (cart) => {
  const index = carts.value.findIndex((item) => item.id === cart.id);
  if (index !== -1) {
    carts.value.splice(index, 1);
  }else {
    console.error('找不到該品項');
  }
};

const createOrder = () => {
  orders.value = [];
  orderDescription.value = '';
  carts.value.forEach((item) => {
    orders.value.push({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      prices: item.prices,
    });
  });
  orderDescription.value = cartDescription.value;
};


</script>

<template>
  <NavRouter />
  <h2>Week 3: Drink</h2>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4">
        <div class="list-group">
          <DrinkItem 
            v-for="drink in drinks" 
            :key="drink.id" 
            :drink="drink" 
            @addToCart="addToCart"/>
        </div>
      </div>
      <div class="col-md-8" v-if="carts.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" width="50">操作</th>
              <th scope="col">品項</th>
              <th scope="col">描述</th>
              <th scope="col" width="90">數量</th>
              <th scope="col">單價</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            <CartItem 
              v-for="cart in carts" 
              :key="cart.id" 
              :cart="cart"
              @updateCart="updateCart"
              @removeCart="removeCart"/>
          </tbody>
        </table>
        <div class="text-end mb-3">
          <h5>總計: <span>${{totalCart}}</span></h5>
        </div>
        <textarea
          class="form-control mb-3"
          rows="3"
          placeholder="備註"
          v-model.trim="cartDescription"
        ></textarea>
        <div class="text-end">
          <button class="btn btn-primary" @click.prevent="createOrder">送出</button>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center" v-if="orders.length > 0">
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <div class="card-title">
              <h5>訂單</h5>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">品項</th>
                    <th scope="col">數量</th>
                    <th scope="col">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.id">
                    <td>{{order.name}}</td>
                    <td>{{order.quantity}}</td>
                    <td>{{order.prices}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-end">備註: <span>{{orderDescription}}</span></div>
              <div class="text-end">
                <h5>總計: <span>${{totalOrder}}</span></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>

