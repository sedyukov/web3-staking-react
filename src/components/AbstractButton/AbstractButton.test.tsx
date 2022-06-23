import React from 'react';
import {
  render,
} from '@testing-library/react';
import AbstractButton from './AbstractButton';

describe('WalletIndicator Test', () => {
  it('rendered walletButton with prop text', () => {
    const mockHandleClick = jest.fn();
    const text = 'Connect Wallet';
    const { getByText } = render(<AbstractButton handleClick={mockHandleClick} text={text} />);
    const button = getByText(text);
    expect(button).toBeTruthy();
  });
  // it('by clicking wallet button should be chain id displayed', async () => {
  //   render(<WalletIndicator />);
  //   const button = await screen.findByRole('button', { name: /wallet/i });
  //   fireEvent.click(button);
  //   const text = await screen.findByText(/0/i);
  //   expect(text).toBeInTheDocument();
  // });
});
