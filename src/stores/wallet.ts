import { action, makeObservable, observable } from 'mobx';
import { connectWallet } from '../web3';

interface IWallet {
  isConnected: boolean,
  isUpdating: boolean,
  messages: string[],
  chainId: string;
}

export class WalletStore {
  wallet: IWallet = {
    isConnected: false,
    isUpdating: true,
    messages: [],
    chainId: '',
  }

  constructor() {
    makeObservable(this, {
      wallet: observable,
      connectWallet: action,
    });
  }

    connectWallet = async (): Promise<void> => {
      const r = await connectWallet();
      if (r.ok) {
        this.wallet.isConnected = true;
        this.wallet.chainId = r.data.toString();
      }
    }
}

export const WalletStoreInst = new WalletStore();
