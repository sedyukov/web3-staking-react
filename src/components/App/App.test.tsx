import React from 'react';
import {
  act, fireEvent, render, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import { runInAction } from 'mobx';
import App from './App';
import { WalletStoreInst } from '../../stores/wallet';

it('indicator showing connection values (initial = disconnected)', () => {
  const { getByTestId } = render(<App />);
  const chainId = getByTestId('chainId');
  const disconnectSpan = getByTestId('disconnectSpan');
  expect(chainId).toHaveTextContent('');
  expect(disconnectSpan).toBeTruthy();
});

it('indicator showing connection values (initial=>connected=>disconnected)', async () => {
  const chainIdMockValue = '4';
  const { getByTestId } = render(<App />);
  let connectSpan;
  let disconnectSpan;
  let chainId;

  // connect wallet
  act(() => {
    runInAction(() => {
      // imitates metamask connection
      WalletStoreInst.wallet.chainId = chainIdMockValue;
      WalletStoreInst.wallet.isConnected = true;
    });
  });
  await waitFor(() => {
    connectSpan = getByTestId('connectSpan');
    chainId = getByTestId('chainId');
  });
  expect(chainId).toHaveTextContent(chainIdMockValue);
  expect(connectSpan).toBeTruthy();

  // disconnect wallet
  act(() => {
    runInAction(() => {
      // imitates metamask disconnection
      WalletStoreInst.wallet.chainId = '';
      WalletStoreInst.wallet.isConnected = false;
    });
  });
  await waitFor(() => {
    disconnectSpan = getByTestId('disconnectSpan');
    chainId = getByTestId('chainId');
  });
  expect(chainId).toHaveTextContent('');
  expect(disconnectSpan).toBeTruthy();
});

it('error dialog opens, when metamask is not installed, and closes after click OK', async () => {
  const {
    getByTestId, getByRole, queryByRole,
  } = render(<App />);
  const walletConnectButton = getByTestId('walletConnectButton');
  let errorConnectionDialog;
  let okButton: HTMLElement;
  // open dialog
  act(() => {
    fireEvent.click(walletConnectButton);
  });
  await waitFor(() => {
    errorConnectionDialog = getByRole('heading', {
      name: /ethereum is not installed/i,
    });
    okButton = getByRole('button', { name: /ok/i });
  });
  expect(errorConnectionDialog).toBeTruthy();
  // close dialog
  act(() => {
    fireEvent.click(okButton);
  });
  // need to waitForElementToBeRemoved, because closing animation takes too long
  await waitForElementToBeRemoved(() => queryByRole('button', { name: /ok/i }));
  expect(queryByRole('button', { name: /ok/i })).toBeNull();
});
