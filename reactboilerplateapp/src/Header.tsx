import MenuIcon from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { UserContext, UserContextType } from "./App";
import ConnectButton from "./ConnectWallet";
import DisconnectButton from "./DisconnectWallet";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  const {
    userAddress,
    userBalance,
    Tezos,
    setUserAddress,
    setUserBalance,
    wallet,
    nftContratTokenMetadataMap,
  } = React.useContext(UserContext) as UserContextType;

  return (
    <AppBar
      component="nav"
      position="fixed"
      sx={{ paddingTop:"5px", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar >
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <img style={{ width: 15, height: 25, }} src="logo.png" />
          </Grid>
          <Grid item>
            <Typography variant="h5">NFT Wine Factory</Typography>
          </Grid>
          <Grid sx={{ paddingTop:"12px", paddingLeft:"13px", marginLeft:"30px", display: { sm: "none", xs: "block" } }} item >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={onDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs />
          <Grid item>
            {!userAddress ? (
              <ConnectButton
                Tezos={Tezos}
                setUserAddress={setUserAddress}
                setUserBalance={setUserBalance}
                wallet={wallet}
                nftContratTokenMetadataMap={nftContratTokenMetadataMap}
              />
            ) : (
              <DisconnectButton
                userAddress={userAddress}
                userBalance={userBalance}
                wallet={wallet}
                setUserAddress={setUserAddress}
                setUserBalance={setUserBalance}
              />
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
