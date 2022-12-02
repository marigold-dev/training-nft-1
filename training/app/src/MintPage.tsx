import { AddCircleOutlined } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { char2Bytes } from "@taquito/utils";
import { BigNumber } from "bignumber.js";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import React, { Fragment, useEffect, useState } from "react";
import * as yup from "yup";
import { TZIP21TokenMetadata, UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";
import { bytes, nat } from "./type-aliases";
export default function MintPage() {
  const {
    nftContrat,
    refreshUserContextOnPageReload,
    storage,
    nftContratTokenMetadataMap,
  } = React.useContext(UserContext) as UserContextType;
  const { enqueueSnackbar } = useSnackbar();
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    symbol: yup.string().required("Symbol is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      token_id: 0,
      symbol: "WINE",
    } as TZIP21TokenMetadata,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mint(values);
    },
  });

  useEffect(() => {
    (async () => {
      if (storage && storage.token_ids.length > 0) {
        formik.setFieldValue("token_id", storage?.token_ids.length);
      }
    })();
  }, [storage?.token_ids]);

  const mint = async (newTokenDefinition: TZIP21TokenMetadata) => {
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
        setPictureUrl(
          `https://gateway.pinata.cloud/ipfs/${responseJson.IpfsHash}`
        );

        const op = await nftContrat!.methods
          .mint(
            new BigNumber(newTokenDefinition.token_id) as nat,
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

            <img src={pictureUrl} />
            <Button variant="contained" component="label" color="primary">
              <AddCircleOutlined />
              Upload an image
              <input
                type="file"
                hidden
                name="data"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const data = e.target.files ? e.target.files[0] : null;
                  if (data) {
                    setFile(data);
                  }
                  e.preventDefault();
                }}
              />
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
      </Paper>
    </Box>
  );
}
