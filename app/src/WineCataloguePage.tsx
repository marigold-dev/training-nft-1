import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React from "react";
import { UserContext, UserContextType } from "./App";

export default function WineCataloguePage() {
  const { nftContrat, nftContratTokenMetadata, userAddress } = React.useContext(
    UserContext
  ) as UserContextType;

  return (
    <Box
      component="main"
      sx={{
        flex: 1,
        py: 6,
        px: 4,
        bgcolor: "#eaeff1",
        backgroundImage:
          "url(https://en.vinex.market/skin/default/images/banners/home/new/banner-1180.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        {nftContratTokenMetadata ? (
          <div />
        ) : (
          "You have to mint a collection first"
        )}
      </Paper>
    </Box>
  );
}
