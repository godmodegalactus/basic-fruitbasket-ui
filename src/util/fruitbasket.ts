import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Account, Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { AccountClient, Program, web3 } from "@project-serum/anchor";
import { Fruitbasket } from "./types/fruitbasket";
import data from './data.json'
import * as phantom from './phantom'
import { basename } from "path";

const fruit_basket_program_id = "H5Bzc1FGnatrsFZC18WN1BoKduvwHdTiPuiQWEWv8Pi4";
const dex_id = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";
const connection = new Connection("http://localhost:8899", 'singleGossip');

export const getBasketData = async( basketIndex : number ) => {
  type FruitBasketGroup = anchor.IdlAccounts<Fruitbasket>["fruitBasketGroup"];
  type Basket = anchor.IdlAccounts<Fruitbasket>["basket"];
  type BasketComponent = anchor.IdlTypes<Fruitbasket>["BasketComponentDescription"];
  const basket = data.baskets[basketIndex];
  let component_string = '';
  for (let i = 0; i < basket.basket_components.length; ++i) {
    component_string = component_string + '{Token: ' + basket.basket_components[i].name + " Amount: " + basket.basket_components[i].amount + "}, ";
  }
  return {
      name : basket.name,
      desc : basket.desc,
      address : basket.basket_address,
      mint : basket.basket_mint_address,
      components : component_string,
  };
}

export class UIContext {
    public provider : anchor.Provider;
    public owner : web3.Keypair;
    constructor()
    {
      const options = anchor.Provider.defaultOptions();
      const phProvider = phantom.get_provider();
      if(phProvider){
        this.provider = new anchor.Provider( connection, phProvider, options);
      }
      else
      {
        this.provider = anchor.Provider.env();
      }
      anchor.setProvider(this.provider);
      this.owner = web3.Keypair.generate();
    }
}

const getTokenAmountInPool = async(ctx : UIContext, index : number) => {
    const token_data = data.tokens[index];
    const token = new Token(
        ctx.provider.connection,
        new web3.PublicKey(token_data.mint_address),
        TOKEN_PROGRAM_ID,
        ctx.owner,
      );
    return (await token.getAccountInfo(new web3.PublicKey(token_data.pools))).amount;
}

export const updateTokenPool = async( ctx : UIContext ) => {
    return {
      btc_pool : getTokenAmountInPool(ctx, 0),
      eth_pool : getTokenAmountInPool(ctx, 1),
      sol_pool : getTokenAmountInPool(ctx, 2),
      srm_pool : getTokenAmountInPool(ctx, 3),
      mngo_pool : getTokenAmountInPool(ctx, 4),
      grp_pool : getTokenAmountInPool(ctx, 5),
      atlas_pool : getTokenAmountInPool(ctx, 6),
    };
}
