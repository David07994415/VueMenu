<script setup>
import { ref,computed, onMounted, provide } from 'vue'
import NavRouter from '../components/NavRouter.vue'
import ThreecGood from '../components/ThreecGood.vue'
import ThreecCart from '../components/ThreecCart.vue'
import ThreecNofity from '../components/ThreecNotify.vue'

const goods = ref([]);
const carts = ref([]);
const message = ref('');
function sendMessage(msg){
    if(msg){
        // messages.value.push(msg);
        message.value = msg;
        setTimeout(() => {
            // messages.value.shift();
            message.value = '';
        }, 3000);
    }
}

provide('message', message);
provide('sendMessage', sendMessage);

const data = [
  {
    id: 1,
    name: '耳罩式藍牙耳機',
    description: '舒適配戴，支援降噪技術',
    price: 2490,
    imageScr:'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
{
    id: 2,
    name:'智慧手機',
    description:'6.8吋 AMOLED 螢幕，支援 S Pen，搭載 Snapdragon 8 Gen 3',
    price: 38900,
    imageScr:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    name: '筆記型電腦',
    description: '13吋 Retina 顯示器，搭載 Apple M2 晶片，輕薄高效',
    price: 34900,
    imageScr:'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=1207&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    name: '智慧手錶',
    description: '支援血氧偵測與心率監測，全天候顯示螢幕',
    price: 13900,
    imageScr: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 5,
    name: '平板電腦',
    description:'10.9吋 Liquid Retina 顯示器，支援 Apple Pencil 第二代',
    price: 19900,
    imageScr:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  
];

onMounted(() => {
  goods.value = data; 
})

const totalCarts = computed(() => {
  let sum = 0;
  carts.value.forEach((item) => {
    sum += item.prices;
  });
  return sum;
});

const addToCart = (good) => {
    let existInCarts = carts.value.find((item) => item.id === good.id);
    if(existInCarts){
        // alert("已經加入購物車，請勿重複加入");
        return
    }
    carts.value.push({
        ...good,
        quantity: 1,
        prices: good.price * 1
    });
};

const removeCart = (id) => {
  const index = carts.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    let cartTitle = carts.value[index].name;
    sendMessage(`已將 ${cartTitle} 從購物車移除`);
    carts.value.splice(index, 1);
  }else {
    console.error('找不到該品項');
  }
};



</script>

<template>
  <NavRouter />
  <h2>Week 4-Extented: 3C Goods</h2>
  <div id="app" class="container py-4">
  <div class="row">
    <!-- 商品列表區 -->
    <div class="col-md-8">
        <h2 class="mb-3">商品列表</h2>
        <div class="row">
            <ThreecGood v-for="good in goods" :key="good.id"
                :id="good.id"
                :title="good.name"
                :description="good.description"
                :price="good.price"
                :imageScr="good.imageScr"
                @addToCart="addToCart(good)"
            />
        </div>
    </div>
    <!-- 購物車區 -->
        <div class="col-md-4" v-if="carts.length > 0">
            <h2 class="mb-3">購物車</h2>
            <ul class="list-group mb-3">
                <ThreecCart v-for="cart in carts" :key="cart.id" 
                    :id="cart.id"
                    :title="cart.name"
                    :prices="cart.prices"
                    :quantity="cart.quantity"
                    @removeCart="removeCart"
                />
            </ul>
            <p class="text-end fs-5">總金額：<span class="fw-bold text-primary">${{totalCarts}}</span></p>
        </div>
  </div>

  <!-- 通知元件 -->
   <template v-if="message !== ''">
        <ThreecNofity />
   </template>

</div>
</template>


<style scoped>

</style>

