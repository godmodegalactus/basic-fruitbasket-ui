<template>
  <div class="bg">
    <p class="title">Fruitbasket</p>
      <div>
        <p>Available Baskets</p>
        <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Load Baskets" @click="loadBaskets">
        <div class="mb-1">
          <div class="mb-1">
              <label for=""> Basket 1 : {{ basketList.basket_1?.name ?? '' }} </label>
              <div>address : {{ basketList.basket_1?.address ?? '' }}</div>
              <div>components : {{basketList.basket_1?.components ?? ''}}</div>
              <div>Price : {{basketList.basket_1?.price ?? ''}}</div>
          </div>
          <div class="mb-1">
            <label for=""> Basket 2 : {{ basketList.basket_2?.name ?? '' }} </label>
              <div>address : {{ basketList.basket_2?.address ?? '' }}</div>
              <div>components : {{basketList.basket_2?.components ?? ''}}</div>
              <div>Price : {{basketList.basket_2?.price ?? ''}}</div>
          </div>
          <div class="mb-1">
           <label for=""> Basket 3 : {{ basketList.basket_3?.name ?? '' }} </label>
              <div>address : {{ basketList.basket_3?.address ?? '' }}</div>
              <div>components : {{basketList.basket_3?.components ?? ''}}</div>
              <div>Price : {{basketList.basket_3?.price ?? ''}}</div>
          </div>
        </div>
      </div>
      <div>
      <div class="mb-1">
          <label for="">User public key</label>
           <div>{{ formState.publicKey ?? '--' }}</div>
          <input class="cursor-pointer bg-btn normal-font-size" type="submit" value="Connect Phantom" @click="connectPh">
      </div>
      <!--<div class="mb-1">
          <label for="">Fruitbasket program id</label>
          <input class="display-block" type="text" id="" v-model="formState.programId">
      </div>-->
      <div class="mb-1">
          <label for="">Basket</label>
          <input class="display-block" type="text" v-model="formState.basketIndex"  v-on:keyup.enter="setBasket">
      </div>
      <div class="mb-1">
          <label for="">Amount</label>
          <input class="display-block" type="number" v-model="formState.amount">
      </div>
      <div class="mb-1">
          <label for="">Max Price for Buy/Min Price for Sell</label>
          <input class="display-block" type="number" v-model="formState.price_max_or_min">
      </div>
      <div class="mb-1">
          <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Buy Basket" @click="buyBasket">
          <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Sell Basket" @click="sellBasket">
      </div>
      <div class= "mb-1">
          <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Refresh UI" @click="resetUI">
      </div>
    </div>
    <div>
      <div class="mb-1">
        Basket Key:
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
        User Basket Account:
        <div>{{ basketState.basket_account ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Current basket balance:
        <div>{{ basketState.current_balance ?? '--' }} Tokens</div> 
      </div>
      <div class="mb-1">
        USDC Account:
        <div>{{ userState.usdc_account ?? '--' }}</div>
      </div>
      <div class="mb-1">
        USDC Balance:
        <div>{{ userState.usdc_balance ?? '--' }} USDC</div>
      </div>
      <div class="mb-1">
        <p>Token Pools</p>
        <div>BTC : {{ poolState.btc_pool ?? '--' }} BTC</div>
        <div>Etherium : {{ poolState.eth_pool ?? '--' }} ETH</div>
        <div>Solana : {{ poolState.sol_pool ?? '--' }} SOL</div>
        <div>Serum : {{ poolState.srm_pool ?? '--' }} SRM</div>
        <div>Mango : {{ poolState.mngo_pool ?? '--' }} MNGO</div>
        <div>Graph : {{ poolState.grp_pool ?? '--' }} GRP</div>
        <div>ATLAS : {{ poolState.atlas_pool ?? '--' }} ATLAS</div>
      </div>
    </div>
    <div class="mb-1">
          <label for="">Transaction Id</label>
          <input class="display-block" type="number" v-model="formState.transaction_id">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { connectPhantom } from "./util/phantom";
import { getBasketData, updateTokenPool, UIContext, getUserUsdcAccountAndAmount, getBasketDataForUser, buyBasketFb, sellBasketFb } from "./util/fruitbasket";

interface BasketState {
  basket_key : null | string;
  basket_components : null | string;
  basket_price : null | number;
  basket_account : null | string;
  current_balance : null | number;
}

interface UserState {
  usdc_account : null | string,
  usdc_balance : null | number,
}

interface PoolState{
  btc_pool : null | number,
  eth_pool : null | number,
  sol_pool : null | number,
  srm_pool : null | number,
  mngo_pool : null | number,
  grp_pool : null | number,
  atlas_pool : null | number,
}

interface BasketData {
  name : string,
  desc : string,
  address : string,
  mint : string,
  components : string,
  price : number,
}

interface BasketList {
  basket_1 : null | BasketData,
  basket_2 : null | BasketData,
  basket_3 : null | BasketData,
}

export default defineComponent({
  setup() {
    const context = new UIContext();

    const formState = reactive({
      publicKey: "",
      programId: "",
      basketIndex: 0,
      amount: 0,
      price_max_or_min: 0,
      transaction_id: 0,
    })

    const basketState: BasketState = reactive({
      basket_key: null,
      basket_account: null,
      basket_components: null,
      basket_price: null,
      current_balance: null,
    });

    const basketList : BasketList = reactive({
      basket_1: null,
      basket_2: null,
      basket_3: null,
    })

    const poolState : PoolState = reactive({
      btc_pool : null,
      eth_pool : null,
      sol_pool : null,
      srm_pool : null,
      mngo_pool : null,
      grp_pool : null,
      atlas_pool : null,
    })

    const userState : UserState = reactive({
      usdc_account : null,
      usdc_balance : null,
    })

    const resetUI = async() => {
      await updatePools();
      await loadUserData();
      await setBasket();
    }

    const loadUserData = async() => {
      const dat = await  getUserUsdcAccountAndAmount(context, formState.publicKey);
      userState.usdc_account = dat.key;
      userState.usdc_balance = dat.balance.toNumber() / (10 ** 6);
    };

    const connectPh = async () => {
      const publicKey = await connectPhantom();
      formState.publicKey = publicKey;
      loadUserData();
    }

    const loadBasket = async(x : number) => {
      try{
        return getBasketData(context, x);
      }
      catch(err) {
        return null;
      }
    }

    const setBasket = async() => {
      if (formState.basketIndex > 0 && formState.basketIndex < 4) {
        const index = formState.basketIndex - 1;
        const basket = await loadBasket(index);
        if(basket)
        {
          basketState.basket_key = basket.address;
          basketState.basket_components = basket.components;
          basketState.basket_price = basket.price;
          if(formState.publicKey != "")
          {
            const userData = await getBasketDataForUser(context, index , formState.publicKey);
            basketState.basket_account = userData.key;
            basketState.current_balance = userData.balance.toNumber() / (10 ** 6);
          }
        }
      }
    }

    const updatePools = async() => {
      const dat = await updateTokenPool(context);
      poolState.btc_pool = (await dat.btc_pool).toNumber() / (10 ** 6);
      poolState.eth_pool = (await dat.eth_pool).toNumber() / (10 ** 6);
      poolState.sol_pool = (await dat.sol_pool).toNumber() / (10 ** 6);
      poolState.srm_pool = (await dat.srm_pool).toNumber() / (10 ** 6);
      poolState.mngo_pool = (await dat.mngo_pool).toNumber() / (10 ** 6);
      poolState.grp_pool = (await dat.grp_pool).toNumber() / (10 ** 6);
      poolState.atlas_pool = (await dat.atlas_pool).toNumber() / (10 ** 6);
    }

    const loadBaskets = async() => {
      basketList.basket_1 = await loadBasket(0);
      basketList.basket_2 = await loadBasket(1);
      basketList.basket_3 = await loadBasket(2);
      await updatePools();
    }

    const buyBasket = async() => {
      if (formState.basketIndex > 0 && formState.basketIndex < 4) {
        const index = formState.basketIndex - 1;
        await buyBasketFb(context, index, formState.publicKey, formState.amount * (10 ** 6), formState.price_max_or_min * (10**6), formState.transaction_id);
        await loadUserData();
        await setBasket();
        await updatePools();
      }
    }

    const sellBasket = async() => {
      if (formState.basketIndex > 0 && formState.basketIndex < 4) {
        const index = formState.basketIndex - 1;
        await sellBasketFb(context, index, formState.publicKey, formState.amount * (10 ** 6), formState.price_max_or_min * (10**6), formState.transaction_id);
        await setBasket();
        await loadUserData();
        await updatePools();
      }
    }

    return {
      formState,
      resetUI,
      connectPh,
      loadBaskets,
      setBasket,
      buyBasket,
      sellBasket,
      basketState,
      basketList,
      poolState,
      userState,
    }
  }
})
</script>
