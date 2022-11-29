import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BigNumber from "bignumber.js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { Fragment } from "react";
import * as yup from "yup";
import { UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { address, nat } from "./type-aliases";

type BidEntry = [nat, Bid];

type Bid = {
  owner: address;
  price: nat;
};

const validationSchema = yup.object({});

export default function WineCataloguePage() {
  const {
    nftContrat,
    nftContratTokenMetadataMap,
    refreshUserContextOnPageReload,
    storage,
  } = React.useContext(UserContext) as UserContextType;
  const [selectedBidEntry, setSelectedBidEntry] =
    React.useState<BidEntry | null>(null);

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("onSubmit: (values)", values, selectedBidEntry);
      buy(selectedBidEntry!);
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const buy = async (selectedBidEntry: BidEntry) => {
    try {
      const op = await nftContrat?.methods
        .buy(BigNumber(selectedBidEntry[0]) as nat, selectedBidEntry[1].owner)
        .send({
          amount: selectedBidEntry[1].price.toNumber(),
          mutez: true,
        });

      await op?.confirmation(2);

      enqueueSnackbar(
        "Bought " +
          1 +
          " unit of Wine collection (token_id:" +
          selectedBidEntry[0] +
          ")",
        {
          variant: "success",
        }
      );

      refreshUserContextOnPageReload(); //force all app to refresh the context
    } catch (error) {
      console.table(`Error: ${JSON.stringify(error, null, 2)}`);
      let tibe: TransactionInvalidBeaconError =
        new TransactionInvalidBeaconError(error);
      enqueueSnackbar(tibe.data_message, {
        variant: "error",
        autoHideDuration: 10000,
      });
    }
  };

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
        {storage?.bids && storage?.bids.size != 0 ? (
          Array.from(storage?.bids.entries()).map(([token_id, bid]) => (
            <Card key={bid.owner + "-" + token_id.toString()}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                    {token_id.toString()}
                  </Avatar>
                }
                title={
                  nftContratTokenMetadataMap.get(token_id.toNumber())?.name
                }
                subheader={"seller : " + bid.owner}
              />

              <CardContent>
                <div>
                  {"Bid : " + 1 + " at price " + bid.price.dividedBy(1000000)}
                </div>
              </CardContent>

              <CardActions disableSpacing>
                <form
                  onSubmit={(values) => {
                    setSelectedBidEntry([token_id, bid]);
                    formik.handleSubmit(values);
                  }}
                >
                  <Button type="submit" aria-label="add to favorites">
                    <ShoppingCartIcon /> BUY
                  </Button>
                </form>
              </CardActions>
            </Card>
          ))
        ) : (
          <Fragment />
        )}
      </Paper>
    </Box>
  );
}
