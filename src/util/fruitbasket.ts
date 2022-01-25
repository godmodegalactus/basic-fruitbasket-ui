import { AccountLayout, Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  Account,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { AccountClient, Program, web3 } from "@project-serum/anchor";
import { Fruitbasket } from "./types/fruitbasket";
import data from "./data.json";
import * as phantom from "./phantom";
import { basename } from "path";

const fruit_basket_program_id = "H5Bzc1FGnatrsFZC18WN1BoKduvwHdTiPuiQWEWv8Pi4";
const fruit_basket_idl = "5aWnu7CDmrL26ZXpSECZq3q9gkjLn6zt1hVZ2hveJmoA";
const dex_id = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";
const connection = new Connection("http://localhost:8899", "singleGossip");

export const getBasketData = async (ctx: UIContext, basketIndex: number) => {
  type FruitBasketGroup = anchor.IdlAccounts<Fruitbasket>["fruitBasketGroup"];
  const basket = data.baskets[basketIndex];
  let component_string = "";
  for (let i = 0; i < basket.basket_components.length; ++i) {
    component_string =
      component_string +
      "{Token: " +
      basket.basket_components[i].name +
      " Amount: " +
      basket.basket_components[i].amount +
      "}, ";
  }
  const program = await ctx.getProgram();
  //type Basket = anchor.IdlAccounts<Fruitbasket>["basket"];
  //let basketInfo : Basket = (await program?.account.basket.fetch(new PublicKey(basket.basket_address))) as Basket;
  return {
    name: basket.name,
    desc: basket.desc,
    address: basket.basket_address,
    mint: basket.basket_mint_address,
    components: component_string,
    price: basket.price / 10 ** 6,
  };
};

export class UIContext {
  public provider: anchor.Provider;
  public owner: web3.Keypair;
  public tokens: Token[];
  public usdc: Token;
  public basket_mints: Token[];
  constructor() {
    const options = anchor.Provider.defaultOptions();
    const phProvider = phantom.get_provider();
    if (phProvider) {
      this.provider = new anchor.Provider(connection, phProvider, options);
    } else {
      this.provider = anchor.Provider.env();
    }
    anchor.setProvider(this.provider);
    this.owner = web3.Keypair.generate();
    this.tokens = data.tokens.map((x) => {
      return new Token(
        this.provider.connection,
        new web3.PublicKey(x.mint_address),
        TOKEN_PROGRAM_ID,
        this.owner
      );
    });

    this.usdc = new Token(
      this.provider.connection,
      new web3.PublicKey(data.quote_token_mint),
      TOKEN_PROGRAM_ID,
      this.owner
    );
    this.basket_mints = data.baskets.map((x) => {
      return new Token(
        this.provider.connection,
        new web3.PublicKey(x.basket_mint_address),
        TOKEN_PROGRAM_ID,
        this.owner
      );
    });
  }
  private program: anchor.Program | null = null;
  private loadProgram = async () => {
    const idl = await Program.fetchIdl(fruit_basket_program_id, this.provider);
    if (!idl) {
      throw new Error("Program lacks an IDL account.");
    }
    this.program = new Program(idl, fruit_basket_program_id, this.provider);
  };

  public getProgram = async () => {
    if (!this.program) {
      await this.loadProgram();
    }
    return this.program;
  };
}

const getTokenAmountFromMint = async (token: Token, account: PublicKey) => {
  return (await token.getAccountInfo(new web3.PublicKey(account))).amount;
};

const getTokenAmountInPool = async (ctx: UIContext, index: number) => {
  const token_data = data.tokens[index];
  return (
    await ctx.tokens[index].getAccountInfo(new web3.PublicKey(token_data.pools))
  ).amount;
};

export const getBasketDataForUser = async (
  ctx: UIContext,
  index: number,
  _userKey: string
) => {
  let account = data.basket_accounts[index];
  return {
    key: account,
    balance: await getTokenAmountFromMint(
      ctx.basket_mints[index],
      new web3.PublicKey(account)
    ),
  };
};

export const getUserUsdcAccountAndAmount = async (
  ctx: UIContext,
  userKey: string
) => {
  let account = data.usdc_account;
  return {
    key: account,
    balance: await getTokenAmountFromMint(
      ctx.usdc,
      new web3.PublicKey(account)
    ),
  };
};

export const updateTokenPool = async (ctx: UIContext) => {
  return {
    btc_pool: getTokenAmountInPool(ctx, 0),
    eth_pool: getTokenAmountInPool(ctx, 1),
    sol_pool: getTokenAmountInPool(ctx, 2),
    srm_pool: getTokenAmountInPool(ctx, 3),
    mngo_pool: getTokenAmountInPool(ctx, 4),
    grp_pool: getTokenAmountInPool(ctx, 5),
    atlas_pool: getTokenAmountInPool(ctx, 6),
  };
};
const ContextSide = {
  Buy: {
    buy: {},
  },
  Sell: {
    sell: {},
  },
};
const tradeBasket = async (
  ctx: UIContext,
  basketIndex: number,
  user: String,
  amount: number,
  price_min_or_max: number,
  transaction_id: number,
  is_buy_side: Boolean
) => {
  const program = await ctx.getProgram();
  if (!program) {
    throw new Error("Program is null");
  }
  const userKey = new PublicKey(user);
  const buy_side = ContextSide.Buy;
  const sell_side = ContextSide.Sell;
  const quote_token_acc = new PublicKey(data.usdc_account);
  const basket_token_acc = new PublicKey(data.basket_accounts[basketIndex]);
  let basket = data.baskets[basketIndex];
  type Basket = anchor.IdlAccounts<Fruitbasket>["basket"];
  type BasketComponent =
    anchor.IdlTypes<Fruitbasket>["BasketComponentDescription"];
  //const basket_info : Basket = (await program.account.basket.fetch(new PublicKey(basket.basket_address))) as Basket;
  //const components : [BasketComponent]  = (basket_info.components) as [BasketComponent];

  const [trade_context, trade_context_bump] =
    await web3.PublicKey.findProgramAddress(
      [
        Buffer.from("fruitbasket_context"),
        userKey.toBuffer(),
        Buffer.from([transaction_id]),
      ],
      new PublicKey(fruit_basket_program_id)
    );
  let tx1 = await program.transaction.initTradeContext(
    transaction_id,
    trade_context_bump,
    is_buy_side ? buy_side : sell_side,
    new anchor.BN(amount), // buy 1 basket
    new anchor.BN(price_min_or_max),
    {
      accounts: {
        group: new PublicKey(data.group),
        user: userKey,
        basket: new PublicKey(basket.basket_address),
        cache: new PublicKey(data.cache),
        quoteTokenAccount: quote_token_acc,
        basketTokenAccount: basket_token_acc,
        basketTokenMint: new PublicKey(basket.basket_mint_address),
        quoteTokenMint: new PublicKey(data.quote_token_mint),
        tradeContext: trade_context,
        quoteTokenTransactionPool: new PublicKey(
          data.quote_token_transaction_pool
        ),
        fruitBasketAuthority: new PublicKey(data.fruitbasket_authority),
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      },
    }
  );
  {
    tx1.feePayer = await ctx.provider.wallet.publicKey;
    let blockhashObj = await ctx.provider.connection.getRecentBlockhash();
    tx1.recentBlockhash = await blockhashObj.blockhash;
    const signedTransaction = await ctx.provider.wallet.signTransaction(tx1);
    var test = signedTransaction.serialize();
    await ctx.provider.connection.sendRawTransaction(test);
  }
  const owner = Keypair.generate();
  await ctx.provider.connection.confirmTransaction(
    await ctx.provider.connection.requestAirdrop(owner.publicKey, 100000000000),
    "confirmed"
  );
  // process all the transactions
  await Promise.all(
    basket.tokens.map(async (x) => {
      const token = data.tokens[x];
      for (let i = 0; i < 10; ++i) {
        const ttx = program.transaction.processTokenForContext({
          accounts: {
            fruitbasketGroup: new PublicKey(data.group),
            tradeContext: trade_context,
            tokenMint: new PublicKey(token.mint_address),
            quoteTokenMint: new PublicKey(data.quote_token_mint),
            basketTokenMint: new PublicKey(
              data.baskets[basketIndex].basket_mint_address
            ),
            fruitbasket: new PublicKey(
              data.baskets[basketIndex].basket_address
            ),
            market: new PublicKey(token.market_address),
            openOrders: new PublicKey(token.openOrders),
            requestQueue: new PublicKey(token.requestQueue),
            eventQueue: new PublicKey(token.eventQueue),
            bids: new PublicKey(token.bids),
            asks: new PublicKey(token.asks),
            tokenVault: new PublicKey(token.tokenVault),
            quoteTokenVault: new PublicKey(token.quoteTokenVault),
            vaultSigner: new PublicKey(token.vaultSigner),
            tokenPool: new PublicKey(token.pools),
            quoteTokenTransactionPool: new PublicKey(
              data.quote_token_transaction_pool
            ),
            fruitBasketAuthority: new PublicKey(data.fruitbasket_authority),
            dexProgram: new PublicKey(dex_id),
            tokenProgram: TOKEN_PROGRAM_ID,
            rent: web3.SYSVAR_RENT_PUBKEY,
          },
        });

        ttx.feePayer = await owner.publicKey;
        let blockhashObj = await ctx.provider.connection.getRecentBlockhash();
        ttx.recentBlockhash = await blockhashObj.blockhash;

        await web3.sendAndConfirmTransaction(connection, ttx, [owner], {
          commitment: "confirmed",
        });
      }
    })
  );

  const ftx = program.transaction.finalizeContext({
    accounts: {
      fruitbasketGroup: new PublicKey(data.group),
      tradeContext: trade_context,
      fruitbasket: new PublicKey(data.baskets[basketIndex].basket_address),
      quoteTokenAccount: quote_token_acc,
      basketTokenAccount: basket_token_acc,
      quoteTokenTransactionPool: new PublicKey(
        data.quote_token_transaction_pool
      ),
      fruitBasketAuthority: new PublicKey(data.fruitbasket_authority),
      quoteTokenMint: new PublicKey(data.quote_token_mint),
      basketTokenMint: new PublicKey(basket.basket_mint_address),
      user: userKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: web3.SystemProgram.programId,
    },
  });

  ftx.feePayer = await owner.publicKey;
  let blockhashObj = await ctx.provider.connection.getRecentBlockhash();
  ftx.recentBlockhash = await blockhashObj.blockhash;
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    ftx,
    [owner],
    { commitment: "confirmed" }
  );
};

export const buyBasketFb = async (
  ctx: UIContext,
  basketIndex: number,
  user: String,
  amount: number,
  price_min_or_max: number,
  transaction_id: number
) => {
  tradeBasket(
    ctx,
    basketIndex,
    user,
    amount,
    price_min_or_max,
    transaction_id,
    true
  );
};

export const sellBasketFb = async (
  ctx: UIContext,
  basketIndex: number,
  user: String,
  amount: number,
  price_min_or_max: number,
  transaction_id: number
) => {
  tradeBasket(
    ctx,
    basketIndex,
    user,
    amount,
    price_min_or_max,
    transaction_id,
    false
  );
};
