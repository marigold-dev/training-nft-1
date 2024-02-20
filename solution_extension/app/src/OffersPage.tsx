import { Typography, useMediaQuery } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { Fragment } from "react";
import { UserContext, UserContextType } from "./App";

export default function OffersPage() {
  const { nftContratTokenMetadataMap } = React.useContext(
    UserContext
  ) as UserContextType;
  const isDesktop = useMediaQuery("(min-width:1100px)");
  const isTablet = useMediaQuery("(min-width:600px)");

  return (
    <Paper>
      <Typography sx={{ paddingBottom: "10px" }} variant="h5">
        Sell my bottles
      </Typography>
      {nftContratTokenMetadataMap.size > 0 ? (
        <Fragment>//TODO</Fragment>
      ) : (
        <Typography sx={{ py: "2em" }} variant="h4">
          Sorry, there is not NFT yet, you need to mint bottles first
        </Typography>
      )}
    </Paper>
  );
}
