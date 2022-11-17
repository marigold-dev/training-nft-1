
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, BigMap, bytes, contract, MMap, nat } from './type-aliases';

export type Storage = {
    administrator: address;
    bids: MMap<address, {
        price: nat;
        quantity: nat;
    }>;
    ledger: BigMap<address, nat>;
    metadata: BigMap<string, bytes>;
    operators: BigMap<address, Array<address>>;
    token_metadata: BigMap<nat, {
        token_id: nat;
        token_info: MMap<string, bytes>;
    }>;
    totalSupply: nat;
};

type Methods = {
    balance_of: (
        requests: Array<{
            owner: address;
            token_id: nat;
        }>,
        callback: contract,
    ) => Promise<void>;
    buy: (
        _0: nat,
        _1: address,
    ) => Promise<void>;
    mint: (
        _0: nat,
        _1: string,
    ) => Promise<void>;
    sell: (
        _0: nat,
        _1: nat,
    ) => Promise<void>;
    transfer: (param: Array<{
            from_: address;
            txs: Array<{
                to_: address;
                amount: nat;
            }>;
        }>) => Promise<void>;
    add_operator: (
        owner: address,
        operator: address,
        token_id: nat,
    ) => Promise<void>;
    remove_operator: (
        owner: address,
        operator: address,
        token_id: nat,
    ) => Promise<void>;
};

type MethodsObject = {
    balance_of: (params: {
        requests: Array<{
            owner: address;
            token_id: nat;
        }>,
        callback: contract,
    }) => Promise<void>;
    buy: (params: {
        0: nat,
        1: address,
    }) => Promise<void>;
    mint: (params: {
        0: nat,
        1: string,
    }) => Promise<void>;
    sell: (params: {
        0: nat,
        1: nat,
    }) => Promise<void>;
    transfer: (param: Array<{
            from_: address;
            txs: Array<{
                to_: address;
                amount: nat;
            }>;
        }>) => Promise<void>;
    add_operator: (params: {
        owner: address,
        operator: address,
        token_id: nat,
    }) => Promise<void>;
    remove_operator: (params: {
        owner: address,
        operator: address,
        token_id: nat,
    }) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'NftCode', protocol: string, code: object[] } };
export type NftContractType = ContractAbstractionFromContractType<contractTypes>;
export type NftWalletType = WalletContractAbstractionFromContractType<contractTypes>;
