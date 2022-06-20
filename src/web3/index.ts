import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const isMainNet = process.env.REACT_APP_IS_MAINNET === 'true';

let web3Wallet: Web3;
let web3Guest: Web3;
let userAddress: string;
let chainId: number;

BigNumber.config({ EXPONENTIAL_AT: 60 });

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

interface resultWrapper {
  ok: boolean,
  data: string | number | Web3,
  errorDetails?: unknown,
}

const wrapResult = (
  ok: boolean,
  data: string | number | Web3,
  errorDetails?: unknown,
): resultWrapper => ({
  ok,
  data,
  errorDetails,
});

export const MAINNET_INDEX = 1;
export const RINKEBY_INDEX = 4;
export const getWeb3 = (): Web3 => web3Wallet || web3Guest;

export const connectNode = (): resultWrapper => {
  try {
    const network = isMainNet ? 'mainnet' : 'rinkeby';
    const url = `wss://${network}.infura.io/ws/v3/${process.env.REACT_APP_INFURA_KEY}`;
    const provider = new Web3.providers.WebsocketProvider(url);
    web3Guest = new Web3(provider);
    return wrapResult(true, 'Infura connected');
  } catch (e) {
    return wrapResult(false, 'Infura connection error');
  }
};

export const connectWallet = async (): Promise<resultWrapper> => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return wrapResult(false, 'Ethereum is not installed');
    }
    web3Wallet = new Web3(ethereum);
    userAddress = await web3Wallet.eth.getCoinbase();
    if (userAddress === null) {
      await ethereum.enable();
      userAddress = await web3Wallet.eth.getCoinbase();
    }
    chainId = await web3Wallet.eth.net.getId();
    if (isMainNet && +chainId !== 4) {
      return wrapResult(false, 'Invalid chain, change to rinkeby');
    } if (isMainNet && +chainId !== MAINNET_INDEX) {
      return wrapResult(false, 'Invalid chain, change to mainnet');
    }
    return wrapResult(true, RINKEBY_INDEX);
  } catch (err) {
    return wrapResult(false, 'Connection error with details', err);
  }
};
