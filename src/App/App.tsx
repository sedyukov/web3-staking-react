import React, { useEffect, useState } from 'react';
import { connectNode, connectWallet } from '../web3';
import './App.css';

function App(): JSX.Element {
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
    <div className="container">
      <div className="wallet">
        <button type="submit" onClick={handleConnectWallet}>
          wallet
        </button>
        <div>{nodeStatus}</div>
        <div>{chainId}</div>
      </div>
      <div>
        <div className="content">
          <div className="content__right-row">
            <div>TokenView</div>
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
