<template>
  <div class="bg">
    <p class="title">Fruitbasket</p>
    <div>
      <div class="mb-1">
          <label for="">User public key</label>
           <div>{{ formState.publicKey ?? '--' }}</div>
          <input class="cursor-pointer bg-btn normal-font-size" type="submit" value="Connect Phantom" @click="connectPh">
      </div>
      <div class="mb-1">
          <label for="">Fruitbasket program id</label>
          <input class="display-block" type="text" id="" v-model="formState.programId">
      </div>
      <div class="mb-1">
          <label for="">Basket</label>
          <input class="display-block" type="text" v-model="formState.basketKey">
      </div>
      <div class="mb-1">
          <label for="">Amount</label>
          <input class="display-block" type="number" v-model="formState.amount">
      </div>
      <div class="mb-1">
          <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Buy Basket" @click="buyBasket">
          <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Sell Basket" @click="sellBasket">
      </div>
      <div class= "mb-1">
          <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Reset UI" @click="resetUI">
      </div>
    </div>
    <div>
      <div class="mb-1">
        Basket:
        <div>{{ basketState.basket_key ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Basket components:
        <div>{{ basketState.basket_components ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Basket Price:
        <div>{{ basketState.basket_price ?? '--' }} USDC</div>
      </div>
      <div class="mb-1">
        Current basket balance:
        <div>{{ basketState.current_balance ?? '--' }} Tokens</div> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { connectPhantom, defaultProvider } from "./util/phantom";

interface BasketState {
  basket_key : null | string;
  basket_components : null | string;
  basket_price : null | number;
  current_balance : null | number;
}

export default defineComponent({
  setup() {
    const formState = reactive({
      publicKey: "",
      programId: "",
      basketKey: "",
      amount: 0,
    })

    const basketState: BasketState = reactive({
      basket_key: null,
      basket_components: null,
      basket_price: null,
      current_balance: null,
    });

    const resetUI = () => {
      formState.publicKey = "";
      formState.programId = "";
      formState.basketKey = "";
      formState.amount = 0;
    }

    const connectPh = async () => {
      const publicKey = await connectPhantom();
      formState.publicKey = publicKey;
    }

    return {
      formState,
      resetUI,
      connectPh,
      basketState
    }
  }
})
</script>
