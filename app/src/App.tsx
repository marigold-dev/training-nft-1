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
  thumbnailUri?: string;
  description?: string;
};

export type UserContextType = {
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
};

export const UserContext = React.createContext<UserContextType | null>(null);
const nftContractAddress = process.env["REACT_APP_CONTRACT_ADDRESS"]!;

function App() {
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

  useEffect(() => {
    Tezos.setWalletProvider(wallet);
    Tezos.addExtension(new Tzip12Module());
  }, [wallet]);

  useEffect(() => {
    (async () => {
      let c = await Tezos.contract.at(nftContractAddress, tzip12);
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
    })();
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
      }}
    >
      <Paperbase />
    </UserContext.Provider>
  );
}

export default App;
