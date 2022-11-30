# training-nft-1

Training n°1 for NFT marketplace

> Introduction : Business objects managed by a blockchain are called `assets`. On Tezos you will find the term `Financial Asset`.
> Here below different categorization of assets.

![](http://jingculturecommerce.com/wp-content/uploads/2021/03/nft-assets-1024x614.jpg)

<PHOTO hacker wine here>

# :wine_glass: Wine marketplace

We are going to build a Wine marketplace.
You can play with the final demo here : [https://demo.winefactory.marigold.dev/](https://demo.winefactory.marigold.dev/)

Plan of the training course :

- NFT 1 : use FA2 nft template to understand the basics
- NFT 2 : finish FA2 nft complete marketplace
- NFT 3 : use FA2 single asset template to build another kind of marketplace
- NFT 4 : use FA2 multi asset template to build last complex kind of marketplace

//TODO PHOTO final ui

## :performing_arts: What are NFTs?

A non-fungible token is a unique and non-interchangeable unit of data stored on a digital ledger. NFTs can be used to represent easily-reproducible items such as photos, videos, audio, and other types of digital files as unique items, and use blockchain technology to establish a verified and public proof of ownership.

## :open_file_folder: What is IPFS?

The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices. In this tutorial, we will be using [pinata](https://www.pinata.cloud/) to store the metadata for NFTs.

## :scroll: Smart Contracts

We will use two contracts for the marketplace. First will be the token contract. On Tezos FA2 is the standard for Non-fungible Token contracts. We will be using the template provided by Ligo to build out the Token Contract. The template contains the basic entry points for building a Fungible or Non-fungible token including

- Transfer
- Balance_of
- Update_operators

On a second time, we will import this contract into a second one that will be the marketplace unique contract. This contract will bring missing feature as :

- Mint
- Buy
- Sell

# :memo: Prerequisites

Please install this software first on your machine :

- [ ] [VS Code](https://code.visualstudio.com/download) : as text editor
- [ ] [npm](https://nodejs.org/en/download/) : we will use a typescript React client app
- [ ] [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) : because yet another package manager (https://www.geeksforgeeks.org/difference-between-npm-and-yarn/)
- [ ] [taqueria](https://github.com/ecadlabs/taqueria) : Tezos Dapp project tooling (version >= 0.24.2)
- [ ] [taqueria VS Code extension](https://marketplace.visualstudio.com/items?itemName=ecadlabs.taqueria-vscode) : visualize your project and execute tasks
- [ ] [ligo VS Code extension](https://marketplace.visualstudio.com/items?itemName=ligolang-publish.ligo-vscode) : for smart contract highlighting, completion, etc ..
- [ ] [Temple wallet](https://templewallet.com/) : an easy to use Tezos wallet in your browser

# :scroll: Smart contract

## Taq'ify your project

```bash
taq init training
taq install @taqueria/plugin-ligo
taq create contract nft.jsligo
```

## FA2 contract

https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md
https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-16/tzip-16.md

HACK : create a dummy esy.json with `{}` content on it

CODE

```bash
ligo install @ligo/fa

TAQ_LIGO_IMAGE=ligolang/ligo:0.56.0 taq compile nft.jsligo
```

DEPLOY

```bash
taq install @taqueria/plugin-taquito
taq deploy nft.tz -e "testing"
```

# :construction_worker: Marketplace front

```bash
yarn create react-app app --template typescript
taq install @taqueria/plugin-contract-types
taq generate types ./app/src
cd app
yarn add @taquito/taquito @taquito/beacon-wallet @airgap/beacon-sdk
yarn add -D @airgap/beacon-types
yarn add @dipdup/tzkt-api
yarn add --dev react-app-rewired process crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url path-browserify

yarn run start
```
