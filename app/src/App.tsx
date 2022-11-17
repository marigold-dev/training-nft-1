import { NetworkType } from "@airgap/beacon-types";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { TokenMetadata, tzip12, Tzip12Module } from "@taquito/tzip12";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";
import { NftWalletType } from "./nft.types";
import Paperbase from "./Paperbase";

export type ExtendedTokenMetadata = TokenMetadata & {
  thumbnailUri: string;
  description: string;
};

export type UserContextType = {
  userAddress: string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  Tezos: TezosToolkit;
  setUserBalance: Dispatch<SetStateAction<number>>;
  wallet: BeaconWallet;
  nftContractAddress: string;
  nftContrat: NftWalletType | null;
  nftContratTokenMetadata: ExtendedTokenMetadata | null;
  setNftContratTokenMetadata: Dispatch<
    SetStateAction<ExtendedTokenMetadata | null>
  >;
};

export const UserContext = React.createContext<UserContextType | null>(null);
const nftContractAddress = process.env["REACT_APP_CONTRACT_ADDRESS"]!;

function App() {
  const [userAddress, setUserAddress] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(0);
  const [nftContrat, setNftContrat] = useState<NftWalletType | null>(null);
  const [nftContratTokenMetadata, setNftContratTokenMetadata] =
    useState<ExtendedTokenMetadata | null>(null);

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
      let c2: NftWalletType = await Tezos.wallet.at<NftWalletType>(
        nftContractAddress
      );
      let m = (await c.tzip12().isTzip12Compliant())
        ? await c.tzip12().getTokenMetadata(0)
        : null;
      console.log(
        "nftContractAddress",
        c,
        "getTokenMetadata 0",
        m,
        "NftWalletType",
        c2
      );
      setNftContratTokenMetadata(m as ExtendedTokenMetadata);
      setNftContrat(c2);
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
        nftContratTokenMetadata,
        setNftContratTokenMetadata,
      }}
    >
      <Paperbase />
    </UserContext.Provider>
  );
}

export default App;
