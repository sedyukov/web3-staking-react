import React, { useEffect, useState } from 'react';
import { connectNode, connectWallet } from '../../web3';
import AbstractButton from '../AbstractButton/AbstractButton';

function WalletIndicator(): JSX.Element {
  const [nodeStatus, setNodeStatus] = useState('');
  const [chainId, setChainId] = useState(0);
  useEffect(() => {
    const connect = async () => connectNode();
    connect().then((resp) => {
      setNodeStatus(resp.data.toString());
    });
  }, []);
  const handleConnectWallet = async () => {
    await connectWallet().then((resp) => {
      if (resp.ok) {
        setChainId(Number(resp.data));
      }
    });
  };
  return (
    <>
      <AbstractButton handleClick={handleConnectWallet} text="Connect Wallet" />
      <div>{nodeStatus}</div>
      <div data-testid="chain">{chainId}</div>
    </>
  );
}

export default WalletIndicator;
