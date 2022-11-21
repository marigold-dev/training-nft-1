import { NetworkType } from "@airgap/beacon-types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { TokenMetadata, tzip12, Tzip12Module } from "@taquito/tzip12";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { NftWalletType, Storage } from "./nft.types";
import Paperbase from "./Paperbase";
import { nat } from "./type-aliases";

export type ExtendedTokenMetadata = TokenMetadata & {
  thumbnailUri: string;
  description: string;
};

export type UserContextType = {
  storage: Storage | null;
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  wallet: BeaconWallet;
  nftContractAddress: string;
  nftContrat: NftWalletType | null;
  setNftContrat: Dispatch<SetStateAction<NftWalletType | null>>;
  nftContratTokenMetadataMap: Map<number, ExtendedTokenMetadata>;
  setNftContratTokenMetadataMap: Dispatch<
    SetStateAction<Map<number, ExtendedTokenMetadata>>
  >;
  refreshUserContextOnPageReload: () => Promise<void>;
};

export let UserContext = React.createContext<UserContextType | null>(null);
const nftContractAddress = process.env["REACT_APP_CONTRACT_ADDRESS"]!;

function App() {
  const [storage, setStorage] = useState<Storage | null>(null);
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [nftContrat, setNftContrat] = useState<NftWalletType | null>(null);
  const [nftContratTokenMetadataMap, setNftContratTokenMetadataMap] = useState<
    Map<number, ExtendedTokenMetadata>
  >(new Map());

  const [Tezos, setTezos] = useState<TezosToolkit>(
    new TezosToolkit("https://ghostnet.tezos.marigold.dev")
  );
  const [wallet, setWallet] = useState<BeaconWallet>(
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
      await Promise.all(
        storage.token_ids.map(async (token_id: nat) => {
          let tokenMetadata: ExtendedTokenMetadata = (await c
            .tzip12()
            .getTokenMetadata(token_id.toNumber())) as ExtendedTokenMetadata;
          nftContratTokenMetadataMap.set(token_id.toNumber(), tokenMetadata);
        })
      );
      setNftContratTokenMetadataMap(nftContratTokenMetadataMap);
      setNftContrat(nftContrat);
      setStorage(storage);
    } catch (error) {
      console.log("error refrshing nft contract: ", error);
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
