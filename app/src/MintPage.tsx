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
import React, { Fragment, useEffect, useState } from "react";
import { ExtendedTokenMetadata, UserContext, UserContextType } from "./App";
import { TransactionInvalidBeaconError } from "./TransactionInvalidBeaconError";

import { AddCircleOutlined } from "@mui/icons-material";
import { useFormik } from "formik";

import { create } from "ipfs-http-client";
import * as yup from "yup";
import { NftWalletType, Storage } from "./nft.types";
import { nat } from "./type-aliases";

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
    setNftContrat,
    Tezos,
    nftContractAddress,
  } = React.useContext(UserContext) as UserContextType;

  /*
  const client = create({
    http: `http://${process.env["REACT_APP_IPFS_USER"]}:${process.env["REACT_APP_IPFS_PASSWORD"]}@${process.env["REACT_APP_IPFS_SERVER"]}`,
  });
  */
  const client = create({
    url: `http://${process.env["REACT_APP_IPFS_SERVER"]}`,
    headers: {
      Authorization: `Basic ${btoa(
        process.env["REACT_APP_IPFS_USER"] +
          ":" +
          process.env["REACT_APP_IPFS_PASSWORD"]
      )}`,
    },
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
    } as ExtendedTokenMetadata,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mint(values);
    },
  });

  const mint = async (newTokenDefinition: ExtendedTokenMetadata) => {
    try {
      //IPFS
      /*
      const created = await client.add(file as ArrayBuffer);
      const url = `http://${process.env["REACT_APP_IPFS_SERVER"]}/ipfs/${created.path}`;
      setUrlArr(url);
      console.log("url", url);
*/
      const op = await nftContrat!.methods
        .mint(
          new BigNumber(newTokenDefinition.token_id) as nat,
          "ipfs://QmcqsYQn8pTxQr3P1dYpgYxQa6GQPmoBTSWQ8bpuFEuaqe" //newTokenDefinition.thumbnailUri
        )
        .send();

      await op.confirmation(2);

      refresh();

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
        setFile(reader.result as ArrayBuffer);
      };
    }
    e.preventDefault();
  };

  const refresh = async () => {
    try {
      let c = await Tezos.contract.at(nftContractAddress, tzip12);
      console.log("nftContractAddress", nftContractAddress);

      let nftContrat: NftWalletType = await Tezos.wallet.at<NftWalletType>(
        nftContractAddress
      );
      const storage = (await nftContrat.storage()) as Storage;
      await Promise.all(
        storage.token_ids.map(async (token_id: nat) => {
          let tokenMetadata: ExtendedTokenMetadata = await c
            .tzip12()
            .getTokenMetadata(token_id.toNumber());
          nftContratTokenMetadataMap.set(token_id.toNumber(), tokenMetadata);
        })
      );
      setNftContratTokenMetadataMap(nftContratTokenMetadataMap);
      setNftContrat(nftContrat);

      //let online = await client.isOnline();
      //setOnline(online);
      if (storage.token_ids.length > 0) {
        formik.setFieldValue("token_id", storage.token_ids.length);
      }
    } catch (error) {
      console.log("ipfs status online error : ", error);
      enqueueSnackbar("ipfs status online error :" + JSON.stringify(error), {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    refresh();
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
                  image={item.thumbnailUri}
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
