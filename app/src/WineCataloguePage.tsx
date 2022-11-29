import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
import React, { Fragment } from "react";
import * as yup from "yup";
import { UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { address, nat } from "./type-aliases";

type BidEntry = [address, Bid];

type Bid = {
  price: nat;
  quantity: nat;
};

const validationSchema = yup.object({
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("ERROR: The number must be greater than 0!"),
});

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
    initialValues: {
      quantity: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("onSubmit: (values)", values, selectedBidEntry);
      buy(values.quantity, selectedBidEntry!);
    },
  });
  const { enqueueSnackbar } = useSnackbar();

  const buy = async (quantity: number, selectedBidEntry: BidEntry) => {
    try {
      const op = await nftContrat?.methods
        .buy(BigNumber(quantity) as nat, selectedBidEntry[0])
        .send({
          amount:
            selectedBidEntry[1].quantity.toNumber() *
            selectedBidEntry[1].price.toNumber(),
          mutez: true,
        });

      await op?.confirmation(2);

      enqueueSnackbar(
        "Bought " +
          quantity +
          " unit of Wine collection (token_id:" +
          selectedBidEntry[0][1] +
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
          Array.from(storage?.bids.entries())
            .filter(([_, bid]) => bid.quantity.isGreaterThan(0))
            .map(([owner, bid]) => (
              <Card key={owner.toString()}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                      {0}
                    </Avatar>
                  }
                  title={nftContratTokenMetadataMap.get(0)?.name}
                  subheader={"seller : " + owner}
                />

                <CardContent>
                  <div>
                    {"Bid : " +
                      bid.quantity +
                      " at price " +
                      bid.price.dividedBy(1000000)}
                  </div>
                </CardContent>

                <CardActions disableSpacing>
                  <form
                    onSubmit={(values) => {
                      setSelectedBidEntry([owner, bid]);
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
                        formik.touched.quantity &&
                        Boolean(formik.errors.quantity)
                      }
                      helperText={
                        formik.touched.quantity && formik.errors.quantity
                      }
                    />
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
