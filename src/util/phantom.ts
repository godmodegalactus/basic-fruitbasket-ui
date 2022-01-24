import EventEmitter from 'eventemitter3';
import { PublicKey, Transaction } from '@solana/web3.js';
type PhantomEvent = 'disconnect' | 'connect';
type PhantomRequestMethod =
  | 'connect'
  | 'disconnect'
  | 'signTransaction'
  | 'signAllTransactions';

export interface PhantomProvider {
  publicKey: PublicKey;
  isConnected?: boolean;
  autoApprove?: boolean;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<any>;
  listeners: (event: PhantomEvent) => (() => void)[];
}

export function get_provider(): PhantomProvider | undefined {
    if ((window as any)?.solana?.isPhantom) {
        return (window as any).solana;
    }
    return undefined;
}

export const defaultProvider  = {
  publicKey : new PublicKey(0),
  isConnected: false,
  autoApprove: false,
  signTransaction : async(transaction: Transaction) => { return transaction; },
  signAllTransactions : async(transactions: Transaction[]) => { return transactions; },
  connect : async() => {},
  disconnect : async() => {},
  on : (event: PhantomEvent, handler: (args: any) => void) =>{},
  request : (method: PhantomRequestMethod, params: any) => {let x:any; return x;},
  listeners : (event: PhantomEvent) => { return [() => {}] },
}

export const connectPhantom = async() => {
    const provider = get_provider();
    if (!provider) {
        window.open('https://phantom.app/', '_blank');
        return "";
      }
    await provider?.connect();
    return provider?.publicKey?.toString() ?? "";
}