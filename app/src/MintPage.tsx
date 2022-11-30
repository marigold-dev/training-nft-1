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
import { BigNumber } from "bignumber.js";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import { TZIP21TokenMetadata, UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";

import { AddCircleOutlined } from "@mui/icons-material";
import { char2Bytes } from "@taquito/utils";
import { useFormik } from "formik";
import * as yup from "yup";
import { bytes, nat } from "./type-aliases";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  symbol: yup.string().required("Symbol is required"),
});

export default function MintPage() {
  let {
    nftContrat,
    nftContratTokenMetadataMap,
    setNftContratTokenMetadataMap,
    Tezos,
    nftContractAddress,
    setNftContrat,
    storage,
    refreshUserContextOnPageReload,
  } = React.useContext(UserContext) as UserContextType;

  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState<File | null>(null);
  const [urlArr, setUrlArr] = useState<string>("");
  const [online, setOnline] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      token_id: 0,
      symbol: "WINE",
      quantity: 1,
    } as TZIP21TokenMetadata & { quantity: number },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mint(values);
    },
  });

  const mint = async (
    newTokenDefinition: TZIP21TokenMetadata & { quantity: number }
  ) => {
    try {
      //IPFS
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set(
          "pinata_api_key",
          `${process.env.REACT_APP_PINATA_API_KEY}`
        );
        requestHeaders.set(
          "pinata_secret_api_key",
          `${process.env.REACT_APP_PINATA_API_SECRET}`
        );
        // requestHeaders.set("Content-Type", "multipart/form-data");

        const resFile = await fetch(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          {
            method: "post",
            body: formData,
            headers: requestHeaders,
          }
        );

        const responseJson = await resFile.json();
        console.log("responseJson", responseJson);

        const thumbnailUri = `ipfs://${responseJson.IpfsHash}`;
        setUrlArr(`https://gateway.pinata.cloud/ipfs/${responseJson.IpfsHash}`);

        const op = await nftContrat!.methods
          .mint(
            new BigNumber(newTokenDefinition.token_id) as nat,
            new BigNumber(newTokenDefinition.quantity) as nat,
            char2Bytes(newTokenDefinition.name!) as bytes,
            char2Bytes(newTokenDefinition.description!) as bytes,
            char2Bytes(newTokenDefinition.symbol!) as bytes,
            char2Bytes(thumbnailUri) as bytes
          )
          .send();

        await op.confirmation(2);

        enqueueSnackbar("Wine collection minted", { variant: "success" });

        refreshUserContextOnPageReload(); //force all app to refresh the context
      }
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
      setFile(data);
    }
    e.preventDefault();
  };

  useEffect(() => {
    (async () => {
      if (storage && storage.token_ids.length > 0) {
        formik.setFieldValue(
          "token_id",
          storage?.token_ids.length //FIXME later better to rely on MAX value than size ...
        );
      }
    })();
  }, [storage?.token_ids]);

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
        {nftContratTokenMetadataMap.size != 0 ? (
          Array.from(nftContratTokenMetadataMap!.entries()).map(
            ([token_id, item]) => (
              <Card key={token_id.toString()}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "purple" }} aria-label="recipe">
                      {token_id}
                    </Avatar>
                  }
                  title={item.name}
                  subheader={item.symbol}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={item.thumbnailUri?.replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                  )}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            )
          )
        ) : (
          <Fragment />
        )}

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
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              variant="standard"
            />

            <TextField
              id="standard-basic"
              name="quantity"
              label="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
              variant="standard"
              type={"number"}
            />

            <img src={urlArr} />
            <Button variant="contained" component="label" color="primary">
              <AddCircleOutlined />
              Upload an image {"(ipfs online? :" + online + ")"}
              <input type="file" hidden name="data" onChange={retrieveFile} />
            </Button>
            <TextField
              id="standard-basic"
              name="token_id"
              label="token_id"
              value={formik.values.token_id}
              disabled
              variant="standard"
              type={"number"}
            />
            <Button variant="contained" type="submit">
              Mint
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
