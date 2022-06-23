import React from 'react';
import { observer } from 'mobx-react';
import { WalletStore } from '../../stores/wallet';

interface WalletIndicatorProps {
  walletStore: WalletStore,
}

function WalletIndicator({ walletStore }: WalletIndicatorProps): JSX.Element {
  return (
    <>
      {walletStore.wallet.isConnected ? (
        <span style={{ color: 'green' }}>Wallet connected</span>
      ) : (
        <span style={{ color: 'red' }}>Wallet disconnected</span>
      )}
      <span data-testid="chain" style={{ marginLeft: '10px' }}>
        {'Network ID: '}
        {walletStore.wallet.chainId}
      </span>
    </>
  );
}

export default observer(WalletIndicator);
