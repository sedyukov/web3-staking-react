import {
  action, makeObservable, observable, runInAction,
} from 'mobx';
import { connectWallet } from '../web3';

interface IWallet {
  isConnected: boolean,
  isUpdating: boolean,
  messages: string[],
  chainId: string;
  error: string;
}

export class WalletStore {
  wallet: IWallet = {
    isConnected: false,
    isUpdating: true,
    messages: [],
    chainId: '',
    error: '',
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
      runInAction(() => {
        this.wallet.isConnected = true;
        this.wallet.chainId = r.data.toString();
      });
    } else {
      runInAction(() => {
        this.wallet.error = r.data.toString();
      });
    }
  }

  readError = () => {
    runInAction(() => {
      this.wallet.error = '';
    });
  }
}

export const WalletStoreInst = new WalletStore();
