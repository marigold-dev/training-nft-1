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

The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices. In this tutorial, we will be using [pinata](https://www.pinata.cloud/) (free developer plan) to store the metadata for NFTs. An alternative would be to install a local IPFS node or an API gateway backend with usage quota.

## :scroll: Smart Contracts

We will use two contracts for the marketplace. First will be the token contract. On Tezos FA2 is the standard for Non-fungible Token contracts. We will be using the [template provided by Ligo](https://packages.ligolang.org/package/@ligo/fa) to build out the Token Contract. The template contains the basic entry points for building a Fungible or Non-fungible token including

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

We will use taqueria to shape the project structure, then create the nft marketplace contract importing the `ligo/fa` libray

## Taq'ify your project

```bash
taq init training
cd training
taq install @taqueria/plugin-ligo
```

> :warning: HACK note : create a dummy esy.json file with `{}` content on it. I will be used by the ligo package installer to not override the default package.json file of taqueria

```bash
echo "{}" > esy.json
```

Your project is ready

## FA2 contract

We will rely on Ligo FA library. To understand in detail how works asset on Tezos, please read below notes

> Note : FA2 standard can be found here => [https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md)
> Additional contract metadata can be added to easier display token picture,etc ... this is describe on TZIP-21 standard here [https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-21/tzip-21.md](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-21/tzip-21.md)

> Note : Generic Contract metadata reference => [https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-16/tzip-16.md](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-16/tzip-16.md)

Install the ligo fa library locally

```bash
TAQ_LIGO_IMAGE=ligolang/ligo:0.56.0 taq ligo --command "install @ligo/fa"
```

## NFT marketplace contract

Create the nft marketplace contract with taqueria

```bash
taq create contract nft.jsligo
```

Remove the default code and paste this code instead

```jsligo
#import "@ligo/fa/lib/fa2/nft/NFT.jsligo" "NFT"

/* ERROR MAP FOR UI DISPLAY or TESTS
    const errorMap : map<string,string> = Map.literal(list([
      ["0", "Enter a positive and not null amount"],
      ["1", "Operation not allowed, you need to be administrator"],
      ["2", "You cannot sell more than your current balance"],
      ["3", "Cannot find the bid you entered for buying"],
      ["4", "You entered a quantity to buy than is more than the bid offer quantity"],
      ["5", "Not enough funds, you need to pay at least quantity * bid price to get the tokens"],
      ["6", "Cannot find the contract relative to implicit address"],
    ]));
*/

type bid = {
  owner : address,
  price : nat
};

type storage =
  {
    administrator: address,
    bids: map<nat,bid>,  //user sell a bid
    ledger: NFT.Ledger.t,
    metadata: NFT.Metadata.t,
    token_metadata: NFT.TokenMetadata.t,
    operators: NFT.Operators.t,
    token_ids : set<NFT.Storage.token_id>
  };

type ret = [list<operation>, storage];

type parameter =
  | ["Mint", nat,bytes,bytes,bytes,bytes] //token_id, name , description  ,symbol , ipfsUrl
  | ["Buy", nat, address]  //buy token_id at a seller offer price
  | ["Sell", nat, nat]  //sell token_id at a price
  | ["Transfer", NFT.transfer]
  | ["Balance_of", NFT.balance_of]
  | ["Update_operators", NFT.update_operators];


const main = ([p, s]: [parameter,storage]): ret =>
    match(p, {
     Mint: (p: [nat,bytes,bytes,bytes,bytes]) => [list([]),s],
     Buy: (p : [nat,address]) => [list([]),s],
     Sell: (p : [nat,nat]) => [list([]),s],
     Transfer: (p: NFT.transfer) => [list([]),s],
     Balance_of: (p: NFT.balance_of) => [list([]),s],
     Update_operators: (p: NFT.update_operator) => [list([]),s],
     });
```

Explanations :

- the first line `#import "@ligo/fa/lib/fa2/nft/NFT.jsligo" "NFT"` imports the ligo FA library
- `storage` definition is an extension of the imported library storage `(NFT.Ledger.t,NFT.Metadata.t,NFT.TokenMetadata.t,NFT.Operators.t,set<NFT.Storage.token_id>)`
- `storage` has more fields to support an `administrator` and `bids`, a map of bids for each nft sold by an owner
- a `bid` is a nft sale at a price owned by someone
- `parameter` definition is an extension of the imported library entrypoints `(NFT.transfer,NFT.balance_of,NFT.update_operators)`
- `parameter` has more entrypoints to allow to create nfts `Mint` and two other for selling/buying `(Sell,Buy)`

Compile the contract

```bash
TAQ_LIGO_IMAGE=ligolang/ligo:0.56.0 taq compile nft.jsligo
```

> Note : to be sure that taqueria will use ligo v0.56 that contains the ligo package installer w/ Docker fix, we set the env var `TAQ_LIGO_IMAGE`

The contract compiles, now let's write `Transfer,Balance_of,Update_operators` entrypoints. We will do a passthrough call to the underlying library. On main function, replace the default case code by this one

```jsligo
     Transfer: (p: NFT.transfer) => {
      const ret2 : [list<operation>, NFT.storage] = NFT.transfer(p,{ledger:s.ledger,metadata:s.metadata,token_metadata:s.token_metadata,operators:s.operators,token_ids : s.token_ids});
      return [ret2[0],{...s,ledger:ret2[1].ledger,metadata:ret2[1].metadata,token_metadata:ret2[1].token_metadata,operators:ret2[1].operators,token_ids:ret2[1].token_ids}];
     },
     Balance_of: (p: NFT.balance_of) => {
      const ret2 : [list<operation>, NFT.storage] = NFT.balance_of(p,{ledger:s.ledger,metadata:s.metadata,token_metadata:s.token_metadata,operators:s.operators,token_ids : s.token_ids});
      return [ret2[0],{...s,ledger:ret2[1].ledger,metadata:ret2[1].metadata,token_metadata:ret2[1].token_metadata,operators:ret2[1].operators,token_ids:ret2[1].token_ids}];
      },
     Update_operators: (p: NFT.update_operator) => {
      const ret2 : [list<operation>, NFT.storage] = NFT.update_ops(p,{ledger:s.ledger,metadata:s.metadata,token_metadata:s.token_metadata,operators:s.operators,token_ids : s.token_ids});
      return [ret2[0],{...s,ledger:ret2[1].ledger,metadata:ret2[1].metadata,token_metadata:ret2[1].token_metadata,operators:ret2[1].operators,token_ids:ret2[1].token_ids}];
      }
```

Explanations :

- the called function is taking the storage type of the library, so we send a partial object from our storage definition to match the type definition
- the return type contains also the storage type of the library, so we need to reconstruct the storage by copied the modified fields

> Note : Ligo team is working on merging type definitions. You could be able to do `type union` or `merge 2 objects` like in Typescript

Let's add the `Mint` function now. Add the new function, and update the main function

```jsligo
const mint = (token_id : nat, name :bytes, description:bytes ,symbol :bytes, ipfsUrl:bytes, s: storage) : ret => {

   if(Tezos.get_sender() != s.administrator) return failwith("1");

   const token_info: map<string, bytes> =
     Map.literal(list([
      ["name", name],
      ["description",description],
      ["interfaces", (bytes `["TZIP-12"]`)],
      ["thumbnailUri", ipfsUrl],
      ["symbol",symbol],
      ["decimals", (bytes `0`)]
     ])) as map<string, bytes>;


    const metadata : bytes = bytes
  `{
      "name":"FA2 NFT Marketplace",
      "description":"Example of FA2 implementation",
      "version":"0.0.1",
      "license":{"name":"MIT"},
      "authors":["Marigold<contact@marigold.dev>"],
      "homepage":"https://marigold.dev",
      "source":{
        "tools":["Ligo"],
        "location":"https://github.com/ligolang/contract-catalogue/tree/main/lib/fa2"},
      "interfaces":["TZIP-012"],
      "errors": [],
      "views": []
      }` ;

    return [list([]) as list<operation>,
          {...s,
     ledger: Big_map.add(token_id,s.administrator ,s.ledger) as NFT.Ledger.t,
     metadata : Big_map.literal(list([["",  bytes `tezos-storage:data`],["data", metadata]])),
     token_metadata: Big_map.add(token_id, {token_id: token_id,token_info:token_info},s.token_metadata),
     operators: Big_map.empty as NFT.Operators.t,
     token_ids : Set.add(token_id,s.token_ids)
     }]};

const main = ([p, s]: [parameter,storage]): ret =>
    match(p, {
     Mint: (p: [nat,bytes,bytes,bytes,bytes]) => mint(p[0],p[1],p[2],p[3],p[4],s),
     Buy: (p : [nat,address]) => [list([]),s],
     Sell: (p : [nat,nat]) => [list([]),s],
     Transfer: (p: NFT.transfer) => [list([]),s],
     Balance_of: (p: NFT.balance_of) => [list([]),s],
     Update_operators: (p: NFT.update_operator) => [list([]),s],
     });
```

Explanations :

- `mint` function will allow you to create a unique NFT. You have to declare the name, description, symbol and ipfsUrl for the picture to display
- to simplify, we don't manage the increment of the token_id here it will be done by the front end later. We encourage you to manage this counter onchain to avoid overriding and existing nft. There is no rule to allocate a specific number to the token_id but people increment it from 0. Also, there is no rule if you have a burn function to reallocate the token_id to a removed index and just continue the sequence from the greatest index.
- most of fields are optional except `decimals` that is set to `0`. A unique nft does not have decimals, it is a unit
- by default, the `quantity` for an nft is `1`, that is why every bottle is unique and we don't need to set a total supply on each nft.
- if you want to know the `size of the nft collection`, look at `token_ids` size. This is used as a `cache` key index of the `token_metadata` big_map. By definition a big map in Tezos can be access through a key, but you need to know the key, there is no function to return the keyset. This is why we keep trace of all token_id in this set, so we can loop and read/update information on nfts

> Note : on next training you will implement Sell/Buy entrypoints

We have finished the smart contract implementation for this first training, let's prepare the deployment to ghostnet.

Edit the storage file `nft.storageList.jsligo` as it. (:warning: you can change the `administrator` address to your own address or keep `alice`)

```jsligo
#include "nft.jsligo"
const default_storage =
{
    administrator: "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb" as address,
    bids: Map.empty as map<nat,bid>,
    ledger: Big_map.empty as NFT.Ledger.t,
    metadata: Big_map.empty as NFT.Metadata.t,
    token_metadata: Big_map.empty as NFT.TokenMetadata.t,
    operators: Big_map.empty as NFT.Operators.t,
    token_ids : Set.empty as set<NFT.Storage.token_id>
  }
;
```

Deploy to ghostnet

```bash
taq install @taqueria/plugin-taquito
taq deploy nft.tz -e "testing"
```

> Note : if it is the first time you use taqueria, I recommend to look at this training first [https://github.com/marigold-dev/training-dapp-1#ghostnet-testnet-wallet](https://github.com/marigold-dev/training-dapp-1#ghostnet-testnet-wallet)
> For advanced users, just go to .taq/config.json and change the default account to alice settings (publicKey,publicKeyHash,privateKey)
>
> ```json
> "accounts": {
>                "taqRootAccount": {
>                    "publicKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
>                    "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
>                    "privateKey": "edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
>                },
>                "taqOperatorAccount": {
>                    "publicKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
>                    "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
>                    "privateKey": "edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
>                }
>            }
> ```

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

# Next
