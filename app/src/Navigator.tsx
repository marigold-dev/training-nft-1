import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WineBarIcon from "@mui/icons-material/WineBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext, UserContextType } from "./App";

export enum PagesPaths {
  WELCOME = "",
  CATALOG = "catalogue",
  BIDS = "bids",
  MINT = "mint",
}

const categories = [
  {
    id: "Trading",
    children: [
      {
        id: "Wine catalogue",
        icon: <WineBarIcon />,
        path: "/" + PagesPaths.CATALOG,
      },
      { id: "Bid bottles", icon: <SellIcon />, path: "/" + PagesPaths.BIDS },
    ],
  },
  {
    id: "Administration",
    children: [
      {
        id: "Mint wine collection",
        icon: <SettingsIcon />,
        path: "/" + PagesPaths.MINT,
      },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const location = useLocation();
  const { userAddress, Tezos, setUserAddress, setUserBalance, wallet } =
    React.useContext(UserContext) as UserContextType;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
          }}
        >
          <img src="winelord.gif" height={100} />
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText>NFT Wine Marketplace</ListItemText>
        </ListItem>
        {userAddress
          ? categories.map(({ id, children }) => (
              <Box key={id} sx={{ bgcolor: "#101F33" }}>
                <ListItem sx={{ py: 2, px: 3 }}>
                  <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                </ListItem>
                {children.map(({ id: childId, icon, path }) => (
                  <ListItem
                    selected={path === location.pathname}
                    disablePadding
                    key={childId}
                  >
                    <ListItemButton sx={item}>
                      <Link to={path}>
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </Link>
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))
          : ""}
      </List>
    </Drawer>
  );
}
