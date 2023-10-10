import { NetworkType } from "@airgap/beacon-types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { TokenMetadata, tzip12, Tzip12Module } from "@taquito/tzip12";
import * as api from "@tzkt/sdk-api";
import { BigNumber } from "bignumber.js";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { NftWalletType, Storage } from "./nft.types";
import Paperbase from "./Paperbase";
export type TZIP21TokenMetadata = TokenMetadata & {
  artifactUri?: string; //A URI (as defined in the JSON Schema Specification) to the asset.
  displayUri?: string; //A URI (as defined in the JSON Schema Specification) to an image of the asset.
  thumbnailUri?: string; //A URI (as defined in the JSON Schema Specification) to an image of the asset for wallets and client applications to have a scaled down image to present to end-users.
  description?: string; //General notes, abstracts, or summaries about the contents of an asset.
  minter?: string; //The tz address responsible for minting the asset.
  creators?: string[]; //The primary person, people, or organization(s) responsible for creating the intellectual content of the asset.
  isBooleanAmount?: boolean; //Describes whether an account can have an amount of exactly 0 or 1. (The purpose of this field is for wallets to determine whether or not to display balance information and an amount field when transferring.)
};

export type UserContextType = {
  storage: Storage | null;
  userAddress: string;
  userBalance: number;
  setUserAddress: Dispatch<SetStateAction<string>>;
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  wallet: BeaconWallet;
  nftContractAddress: string;
  nftContrat: NftWalletType | null;
  setNftContrat: Dispatch<SetStateAction<NftWalletType | null>>;
  nftContratTokenMetadataMap: Map<string, TZIP21TokenMetadata>;
  setNftContratTokenMetadataMap: Dispatch<
    SetStateAction<Map<string, TZIP21TokenMetadata>>
  >;
  refreshUserContextOnPageReload: () => Promise<void>;
};

export let UserContext = React.createContext<UserContextType | null>(null);
const nftContractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  api.defaults.baseUrl = "https://api.ghostnet.tzkt.io";

  const [storage, setStorage] = useState<Storage | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [nftContrat, setNftContrat] = useState<NftWalletType | null>(null);
  const [nftContratTokenMetadataMap, setNftContratTokenMetadataMap] = useState<
    Map<string, TZIP21TokenMetadata>
  >(new Map());

  const [Tezos, _] = useState<TezosToolkit>(
    new TezosToolkit(import.meta.env.VITE_TEZOS_NODE)
  );
  const [wallet, __] = useState<BeaconWallet>(
    new BeaconWallet({
      name: "Training",
      preferredNetwork: NetworkType.GHOSTNET,
    })
  );

  const refreshUserContextOnPageReload = async () => {
    console.log("refreshUserContext");
    //CONTRACT
    try {
      let c = await Tezos.contract.at(nftContractAddress, tzip12);
      console.log("nftContractAddress", nftContractAddress);

      let nftContrat: NftWalletType = await Tezos.wallet.at<NftWalletType>(
        nftContractAddress
      );
      const storage = (await nftContrat.storage()) as Storage;

      const token_metadataBigMapId = (
        storage.token_metadata as unknown as { id: BigNumber }
      ).id.toNumber();

      const token_ids = await api.bigMapsGetKeys(token_metadataBigMapId, {
        micheline: "Json",
        active: true,
      });

      await Promise.all(
        token_ids.map(async (token_id: api.BigMapKey) => {
          let tokenMetadata: TZIP21TokenMetadata = (await c
            .tzip12()
            .getTokenMetadata(token_id.key)) as TZIP21TokenMetadata;
          nftContratTokenMetadataMap.set(token_id.key, tokenMetadata);
        })
      );
      setNftContratTokenMetadataMap(new Map(nftContratTokenMetadataMap)); //new Map to force refresh
      setNftContrat(nftContrat);
      setStorage(storage);
    } catch (error) {
      console.log("error refreshing nft contract: ", error);
    }

    //USER
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      setUserAddress(activeAccount.address);
      const balance = await Tezos.tz.getBalance(activeAccount.address);
      setUserBalance(balance.toNumber());
    }

    console.log("refreshUserContext ended.");
  };

  useEffect(() => {
    Tezos.setWalletProvider(wallet);
    Tezos.addExtension(new Tzip12Module());
  }, [wallet]);

  useEffect(() => {
    refreshUserContextOnPageReload();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userAddress,
        userBalance,
        setUserAddress,
        Tezos,
        setUserBalance,
        wallet,
        nftContractAddress,
        nftContrat,
        nftContratTokenMetadataMap,
        setNftContratTokenMetadataMap,
        setNftContrat,
        storage,
        refreshUserContextOnPageReload,
      }}
    >
      <Paperbase />
    </UserContext.Provider>
  );
}

export default App;
