import { useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import { UserContext, UserContextType } from "./App";

export default function MintPage() {
  const {
    userAddress,
    nftContratTokenMetadataMap,
    storage,
    refreshUserContextOnPageReload,
    nftContrat,
  } = React.useContext(UserContext) as UserContextType;

  const isTablet = useMediaQuery("(min-width:600px)");

  return (
    <Paper>
      <Typography variant="h5">Mint your wine collection</Typography>

      {nftContratTokenMetadataMap.size != 0 ? (
        "//TODO"
      ) : (
        <Typography sx={{ py: "2em" }} variant="h4">
          Sorry, there is not NFT yet, you need to mint bottles first
        </Typography>
      )}
    </Paper>
  );
}
