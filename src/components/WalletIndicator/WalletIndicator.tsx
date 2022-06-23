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
        <span data-testid="connectSpan" style={{ color: 'green' }}>Wallet connected</span>
      ) : (
        <span data-testid="disconnectSpan" style={{ color: 'red' }}>Wallet disconnected</span>
      )}
      <span style={{ marginLeft: '10px' }}>
        {'Network ID: '}
      </span>
      <span data-testid="chainId">
        {walletStore.wallet.chainId}
      </span>
    </>
  );
}

export default observer(WalletIndicator);
