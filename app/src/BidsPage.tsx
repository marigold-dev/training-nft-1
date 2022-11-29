import SellIcon from "@mui/icons-material/Sell";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import BigNumber from "bignumber.js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import * as yup from "yup";
import { UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { address, nat } from "./type-aliases";

const validationSchema = yup.object({
  price: yup
    .number()
    .required("Price is required")
    .positive("ERROR: The number must be greater than 0!"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("ERROR: The number must be greater than 0!"),
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Bid = {
  price: nat;
  quantity: nat;
};

export default function BidsPage() {
  const [selectedTokenId, setSelectedTokenId] = React.useState<number>(0);

  let [ownerBids, setOwnerBids] = React.useState<Bid | null>(null);
  let [ownerBalance, setOwnerBalance] = React.useState<number>(0);

  const {
    nftContrat,
    nftContratTokenMetadataMap,
    userAddress,
    storage,
    refreshUserContextOnPageReload,
  } = React.useContext(UserContext) as UserContextType;

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      price: 0,
      quantity: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("onSubmit: (values)", values, selectedTokenId);
      sell(selectedTokenId, values.quantity, values.price);
    },
  });

  const initPage = async () => {
    if (storage) {
      console.log("context is not empty, init page now");

      await Promise.all(
        storage.owners.map(async (owner) => {
          if (owner === userAddress) {
            const ownerBalance = await storage.ledger.get(
              userAddress as address
            );
            setOwnerBalance(ownerBalance.toNumber());
            const ownerBids = await storage.bids.get(userAddress as address);
            if (ownerBids && ownerBids.quantity != BigNumber(0))
              setOwnerBids(ownerBids);

            console.log(
              "found for " +
                owner +
                " on token_id " +
                0 +
                " with balance " +
                ownerBalance
            );
          } else {
            console.log("skip to next owner");
          }
        })
      );
    } else {
      console.log("context is empty, wait for parent and retry ...");
    }
  };

  useEffect(() => {
    (async () => {
      console.log("after a storage changed");
      await initPage();
    })();
  }, [storage]);

  useEffect(() => {
    (async () => {
      console.log("on Page init");
      await initPage();
    })();
  }, []);

  const sell = async (token_id: number, quantity: number, price: number) => {
    try {
      const op = await nftContrat?.methods
        .sell(
          BigNumber(quantity) as nat,
          BigNumber(price * 1000000) as nat //to mutez
        )
        .send();

      await op?.confirmation(2);

      enqueueSnackbar(
        "Wine collection (token_id=" +
          token_id +
          ") bid for " +
          quantity +
          " units at price of " +
          price +
          " XTZ",
        { variant: "success" }
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
        {ownerBalance !== 0 ? (
          <Card key={userAddress + "-0"}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                  {0}
                </Avatar>
              }
              title={nftContratTokenMetadataMap.get(0)?.name}
            />

            <CardContent>
              <div>{"Owned : " + ownerBalance}</div>

              {ownerBids
                ? "Bid :" +
                  ownerBids?.quantity +
                  " at price " +
                  ownerBids?.price.dividedBy(1000000)
                : ""}
            </CardContent>

            <CardActions disableSpacing>
              <form
                onSubmit={(values) => {
                  setSelectedTokenId(0);
                  formik.handleSubmit(values);
                }}
              >
                <TextField
                  name="quantity"
                  label="quantity"
                  placeholder="Enter a quantity"
                  variant="standard"
                  type="number"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.quantity && Boolean(formik.errors.quantity)
                  }
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
                <TextField
                  name="price"
                  label="price/bottle (XTZ)"
                  placeholder="Enter a price"
                  variant="standard"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
                <Button type="submit" aria-label="add to favorites">
                  <SellIcon /> SELL
                </Button>
              </form>
            </CardActions>
          </Card>
        ) : (
          ""
        )}
      </Paper>
    </Box>
  );
}
