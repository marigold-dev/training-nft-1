
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import { address, BigMap, bytes, contract, MMap, nat } from './type-aliases';

export type Storage = {
    administrators: Array<address>;
    ledger: BigMap<nat, address>;
    metadata: BigMap<string, bytes>;
    operators: BigMap<{
        0: address;
        1: address;
    }, Array<nat>>;
    token_ids: Array<nat>;
    token_metadata: BigMap<nat, {
        token_id: nat;
        token_info: MMap<string, bytes>;
    }>;
};

type Methods = {
    addAdministrator: (param: address) => Promise<void>;
    balance_of: (
        callback: contract,
        requests: Array<{
            owner: address;
            token_id: nat;
        }>,
    ) => Promise<void>;
    mint: (
        _0: nat,
        _1: bytes,
        _2: bytes,
        _3: bytes,
        _4: bytes,
    ) => Promise<void>;
    transfer: (param: Array<{
            from_: address;
            txs: Array<{
                amount: nat;
                to_: address;
                token_id: nat;
            }>;
        }>) => Promise<void>;
    add_operator: (
        operator: address,
        owner: address,
        token_id: nat,
    ) => Promise<void>;
    remove_operator: (
        operator: address,
        owner: address,
        token_id: nat,
    ) => Promise<void>;
};

type MethodsObject = {
    addAdministrator: (param: address) => Promise<void>;
    balance_of: (params: {
        callback: contract,
        requests: Array<{
            owner: address;
            token_id: nat;
        }>,
    }) => Promise<void>;
    mint: (params: {
        0: nat,
        1: bytes,
        2: bytes,
        3: bytes,
        4: bytes,
    }) => Promise<void>;
    transfer: (param: Array<{
            from_: address;
            txs: Array<{
                amount: nat;
                to_: address;
                token_id: nat;
            }>;
        }>) => Promise<void>;
    add_operator: (params: {
        operator: address,
        owner: address,
        token_id: nat,
    }) => Promise<void>;
    remove_operator: (params: {
        operator: address,
        owner: address,
        token_id: nat,
    }) => Promise<void>;
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'NftCode', protocol: string, code: object[] } };
export type NftContractType = ContractAbstractionFromContractType<contractTypes>;
export type NftWalletType = WalletContractAbstractionFromContractType<contractTypes>;
