import React from 'react';
// import { connectNode, connectWallet } from '../web3';
import WalletIndicator from '../WalletIndicator/WalletIndicator';
import MainAppBar from '../MainAppBar/MainAppBar';
import { WalletStoreInst } from '../../stores/wallet';

function App(): JSX.Element {
  return (
    <div className="container">
      <MainAppBar walletStore={WalletStoreInst} />
      <div className="wallet">
        <WalletIndicator walletStore={WalletStoreInst} />
      </div>
      <div>
        <div className="content">
          <div className="content__right-row">
            <div className="text-gray-500">TokenView</div>
            <div>TokenForm</div>
          </div>
          <div className="content__left-row">
            <div>TokenView</div>
            <div>StackingInfo</div>
            <div>ContractForm</div>
          </div>
        </div>
        <div className="content scroll-area">
          EventsTable
        </div>
      </div>
    </div>
  );
}

export default App;
