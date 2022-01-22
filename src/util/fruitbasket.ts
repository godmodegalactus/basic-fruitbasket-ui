import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Account, Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Program, web3 } from "@project-serum/anchor";
import { Fruitbasket } from "./types/fruitbasket";

const connection = new Connection("http://localhost:8899", 'singleGossip');

const fruit_basket_program_id = "H5Bzc1FGnatrsFZC18WN1BoKduvwHdTiPuiQWEWv8Pi4";
const dex_id = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";

export const getBasketData = async() => {
  type FruitBasketGroup = anchor.IdlAccounts<Fruitbasket>["fruitBasketGroup"];
  type Basket = anchor.IdlAccounts<Fruitbasket>["basket"];
  type BasketComponent = anchor.IdlTypes<Fruitbasket>["BasketComponentDescription"];
}