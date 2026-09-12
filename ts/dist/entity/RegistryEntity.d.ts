import { GbifEntityBase } from '../GbifEntityBase';
import type { GbifSDK } from '../GbifSDK';
import type { Control } from '../types';
import type { Registry, RegistryListMatch } from '../GbifTypes';
declare class RegistryEntity extends GbifEntityBase<Registry> {
    constructor(client: GbifSDK, entopts: any);
    make(this: RegistryEntity): RegistryEntity;
    list(this: any, reqmatch?: RegistryListMatch, ctrl?: Control): Promise<RegistryEntity[]>;
}
export { RegistryEntity };
