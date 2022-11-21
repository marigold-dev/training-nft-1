import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { Fragment, useEffect } from "react";
import { UserContext, UserContextType } from "./App";
import { Storage } from "./nft.types";
import { address, nat } from "./type-aliases";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Bid = {
  price: nat;
  quantity: nat;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function BidsPage() {
  const [value, setValue] = React.useState(0);
  const [bidByOwnerTokenIDMap, setBidByOwnerTokenIDMap] = React.useState<
    Map<[address, nat], Bid>
  >(new Map());

  const { nftContrat, nftContratTokenMetadataMap, userAddress } =
    React.useContext(UserContext) as UserContextType;

  useEffect(() => {
    (async () => {
      const storage = (await nftContrat?.storage()) as Storage;
      storage.bids.forEach((bid, key) => {
        bidByOwnerTokenIDMap.set([key[0], key[1]], bid);
      });
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
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 224,
          }}
        >
          {nftContratTokenMetadataMap.size > 0
            ? Array.from(bidByOwnerTokenIDMap.values()).map((bid: Bid) => (
                <Fragment>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={(event: React.SyntheticEvent, newValue: number) =>
                      setValue(newValue)
                    }
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: "divider" }}
                  >
                    <Tab label={bid.quantity + " at price of " + bid.price} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <Card>
                      <CardHeader></CardHeader>
                      <CardContent></CardContent>
                      <CardActions></CardActions>
                    </Card>
                  </TabPanel>
                </Fragment>
              ))
            : "You have to mint a collection first"}
        </Box>
      </Paper>
    </Box>
  );
}
