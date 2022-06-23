import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { observer } from 'mobx-react';
import { WalletStore } from '../../stores/wallet';

export interface SimpleDialogProps {
  walletStore: WalletStore,
}

function ErrorDialog({ walletStore }: SimpleDialogProps): JSX.Element {
  return (
    <Dialog open={!!walletStore.wallet.error}>
      <DialogTitle>{walletStore.wallet.error}</DialogTitle>
      <Button onClick={() => walletStore.readError()}>
        Ok
      </Button>
    </Dialog>
  );
}

export default observer(ErrorDialog);
