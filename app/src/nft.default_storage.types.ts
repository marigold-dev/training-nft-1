
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import {  } from './type-aliases';

type Storage = {
    
};

type Methods = {
    
};

type MethodsObject = {
    
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'NftDefaultStorageCode', protocol: string, code: object[] } };
export type NftDefaultStorageContractType = ContractAbstractionFromContractType<contractTypes>;
export type NftDefaultStorageWalletType = WalletContractAbstractionFromContractType<contractTypes>;
