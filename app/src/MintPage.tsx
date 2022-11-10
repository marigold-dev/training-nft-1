import {
  Avatar,
  Button,
  CardHeader,
  CardMedia,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { tzip12 } from "@taquito/tzip12";
import { BigNumber } from "bignumber.js";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { ExtendedTokenMetadata, UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";

import { AddCircleOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
//import { NFTStorage } from "nft.storage";
import { create } from "ipfs-http-client";
import * as yup from "yup";
import { nat } from "./type-aliases";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  symbol: yup.string().required("Symbol is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("ERROR: The number must be greater than 0!"),
});

export default function MintPage() {
  const {
    nftContrat,
    nftContratTokenMetadata,
    setNftContratTokenMetadata,
    Tezos,
    nftContractAddress,
  } = React.useContext(UserContext) as UserContextType;

  const client = create({
    url: `https://${process.env["REACT_APP_IPFS_USER"]}:${process.env["REACT_APP_IPFS_PASSWORD"]}@${process.env["REACT_APP_IPFS_SERVER"]}"`,
  });

  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState<ArrayBuffer | null>(null);
  const [urlArr, setUrlArr] = useState<string>("");
  const [online, setOnline] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      decimals: 0,
      description: "",
      token_id: 0,
      symbol: "WINE",
      quantity: 1,
    } as ExtendedTokenMetadata & { quantity: number },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mint(values);
    },
  });

  const mint = async (
    newTokenDefinition: ExtendedTokenMetadata & { quantity: number }
  ) => {
    try {
      //IPFS
      const created = await client.add(file as ArrayBuffer);
      const url = `https://${process.env["REACT_APP_IPFS_SERVER"]}/ipfs/${created.path}`;
      setUrlArr(url);
      console.log("url", url);

      const op = await nftContrat!.methods
        .mint(
          new BigNumber(newTokenDefinition.quantity) as nat,
          newTokenDefinition.thumbnailUri
        )
        .send();

      await op.confirmation(2);

      let c = await Tezos.contract.at(nftContractAddress, tzip12);
      let m = (await c.tzip12().isTzip12Compliant())
        ? await c.tzip12().getTokenMetadata(0)
        : null;
      setNftContratTokenMetadata(m as ExtendedTokenMetadata);

      enqueueSnackbar("Wine collection minted", { variant: "success" });
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

  const retrieveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files ? e.target.files[0] : null;
    if (data) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        console.log("file:", reader.result);
        setFile(reader.result as ArrayBuffer);
      };
    }
    e.preventDefault();
  };

  useEffect(() => {
    (async () => {
      setOnline(await client.isOnline());
    })();
  }, []);

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
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                  {nftContratTokenMetadata.token_id} -{" "}
                  {nftContratTokenMetadata.symbol}
                </Avatar>
              }
              title={nftContratTokenMetadata.name}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="194"
              image={nftContratTokenMetadata.thumbnailUri}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {nftContratTokenMetadata.description}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2} margin={2} alignContent={"center"}>
              <h1>Mint your wine collection</h1>
              <TextField
                id="standard-basic"
                name="name"
                label="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                variant="standard"
              />
              <TextField
                id="standard-basic"
                name="symbol"
                label="symbol"
                value={formik.values.symbol}
                onChange={formik.handleChange}
                error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                helperText={formik.touched.symbol && formik.errors.symbol}
                variant="standard"
              />
              <TextField
                id="standard-basic"
                name="description"
                label="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                variant="standard"
              />

              <img src={urlArr} />
              <Button variant="contained" component="label" color="primary">
                <AddCircleOutlined />
                Upload an image {"(ipfs online? :" + online + ")"}
                <input type="file" hidden name="data" onChange={retrieveFile} />
              </Button>
              <TextField
                id="standard-basic"
                name="quantity"
                label="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
                variant="standard"
                type={"number"}
              />
              <Button variant="contained" type="submit">
                Mint
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Box>
  );
}
