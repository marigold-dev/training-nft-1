import SellIcon from "@mui/icons-material/Sell";
import SettingsIcon from "@mui/icons-material/Settings";
import WineBarIcon from "@mui/icons-material/WineBar";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import MaterialLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext, UserContextType } from "./App";

export enum PagesPaths {
  CATALOG = "",
  OFFERS = "offers",
  MINT = "mint",
}

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const location = useLocation();
  const { userAddress, nftContratTokenMetadataMap } = React.useContext(
    UserContext
  ) as UserContextType;

  const [categories, setCategories] = useState<
    {
      id: string;
      children: { id: string; icon: JSX.Element; path: string }[];
    }[]
  >([
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
  ]);

  useEffect(() => {
    if (nftContratTokenMetadataMap && nftContratTokenMetadataMap.size > 0)
      setCategories([
        {
          id: "Trading",
          children: [
            {
              id: "Wine catalogue",
              icon: <WineBarIcon />,
              path: "/" + PagesPaths.CATALOG,
            },
            {
              id: "Sell bottles",
              icon: <SellIcon />,
              path: "/" + PagesPaths.OFFERS,
            },
          ],
        },
        {
          id: "Administration",
          children: [
            {
              id: "Wine collection",
              icon: <SettingsIcon />,
              path: "/" + PagesPaths.MINT,
            },
          ],
        },
      ]);
  }, [nftContratTokenMetadataMap, userAddress]);

  function Copyright() {
    return (
      <Typography left="1em" bottom="2vh" position="absolute" align="center">
        {"Copyright © "}
        <MaterialLink color="inherit" href="https://www.marigold.dev/">
          Marigold
        </MaterialLink>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <Drawer variant="permanent" {...other}>
      <Toolbar />

      <Box
        sx={{
          borderColor: "text.secondary",
          borderStyle: "solid",
          borderWidth: "1px",
          paddingTop: 5,
          height: "calc(100vh - 64px)",
        }}
      >
        <List disablePadding>
          {userAddress
            ? categories.map(({ id, children }) => (
                <Box key={id}>
                  <ListItem sx={{ py: 1, px: 2 }}>
                    <ListItemText>
                      <Typography variant="h5">{id}</Typography>
                    </ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, icon, path }) => (
                    <ListItem
                      selected={path === location.pathname}
                      disablePadding
                      key={childId}
                    >
                      <ListItemButton sx={item}>
                        <Link style={{ textDecoration: "none" }} to={path}>
                          <Stack direction="row">
                            <ListItemIcon>{icon}</ListItemIcon>
                            <ListItemText>{childId}</ListItemText>
                          </Stack>
                        </Link>
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            : ""}
        </List>
        <Copyright />
      </Box>
    </Drawer>
  );
}
