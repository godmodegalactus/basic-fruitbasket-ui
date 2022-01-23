<template>
  <div class="bg">
    <p class="title">Fruitbasket</p>
      <div>
        <p>Available Baskets</p>
        <input style="margin-right: 5px;" class="cursor-pointer bg-btn normal-font-size" type="submit" value="Load Baskets" @click="loadBaskets">
        <div class="mb-1">
          <div class="mb-1">
              <label for=""> Basket {{ basketList.basket_1?.name ?? '' }} </label>
              address : {{ basketList.basket_1?.address ?? '' }}
              components : {{basketList.basket_1?.components ?? ''}}
          </div>
          <div class="mb-1">
            <label for=""> Basket {{ basketList.basket_2?.name ?? '' }} </label>
              address : {{ basketList.basket_2?.address ?? '' }}
              components : {{basketList.basket_2?.components ?? ''}}
          </div>
          <div class="mb-1">
           <label for=""> Basket {{ basketList.basket_3?.name ?? '' }} </label>
              address : {{ basketList.basket_3?.address ?? '' }}
              components : {{basketList.basket_3?.components ?? ''}}
          </div>
        </div>
      </div>
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
        User Basket Account:
        <div>{{ basketState.basket_account ?? '--' }}</div>
      </div>
      <div class="mb-1">
        Current basket balance:
        <div>{{ basketState.current_balance ?? '--' }} Tokens</div> 
      </div>
      <div class="mb-1">
        USDC Account:
        <div>{{ userState.usdc_account ?? '--' }} USDC</div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { connectPhantom } from "./util/phantom";
import { getBasketData } from "./util/fruitbasket";

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
  components : string
}

interface BasketList {
  basket_1 : null | BasketData,
  basket_2 : null | BasketData,
  basket_3 : null | BasketData,
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

    const loadBasket = async(x : number) => {
      try{
        return getBasketData(x);
      }
      catch(err) {
        return null;
      }
    }

    const loadBaskets = async() => {
      basketList.basket_1 = await loadBasket(0);
      basketList.basket_2 = await loadBasket(1);
      basketList.basket_3 = await loadBasket(2);
    }

    return {
      formState,
      resetUI,
      connectPh,
      loadBaskets,
      basketState,
      basketList,
      poolState,
      userState,
    }
  }
})
</script>
