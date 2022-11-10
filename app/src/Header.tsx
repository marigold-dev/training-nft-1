import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { UserContext, UserContextType } from "./App";
import ConnectButton from "./ConnectWallet";
import DisconnectButton from "./DisconnectWallet";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  const { userAddress, Tezos, setUserAddress, setUserBalance, wallet } =
    React.useContext(UserContext) as UserContextType;

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
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
                />
              ) : (
                <DisconnectButton
                  userAddress={userAddress}
                  wallet={wallet}
                  setUserAddress={setUserAddress}
                  setUserBalance={setUserBalance}
                />
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
