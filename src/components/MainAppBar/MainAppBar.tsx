import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import './MainAppBar.css';
import { observer } from 'mobx-react';
import { WalletStore } from '../../stores/wallet';

interface MainAppBarProps {
  walletStore: WalletStore,
}

function MainAppBar({ walletStore }: MainAppBarProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Staking app
          </Typography>
          {walletStore.wallet.isConnected ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>History </MenuItem>
                <MenuItem onClick={handleClose} className="disconnect">Disconnect</MenuItem>
              </Menu>
            </div>
          )
            : (
              <div>
                <Button data-testid="walletConnectButton" onClick={walletStore.connectWallet} color="inherit">Connect Wallet</Button>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default observer(MainAppBar);
