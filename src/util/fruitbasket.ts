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
        this.provider = anchor.Provider.local();
        this.owner = web3.Keypair.generate();
    }
}

