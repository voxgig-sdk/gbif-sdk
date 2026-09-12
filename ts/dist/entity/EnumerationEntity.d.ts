import { GbifEntityBase } from '../GbifEntityBase';
import type { GbifSDK } from '../GbifSDK';
import type { Control } from '../types';
import type { Enumeration, EnumerationLoadMatch, EnumerationListMatch } from '../GbifTypes';
declare class EnumerationEntity extends GbifEntityBase<Enumeration> {
    constructor(client: GbifSDK, entopts: any);
    make(this: EnumerationEntity): EnumerationEntity;
    load(this: any, reqmatch?: EnumerationLoadMatch, ctrl?: Control): Promise<EnumerationEntity>;
    list(this: any, reqmatch?: EnumerationListMatch, ctrl?: Control): Promise<EnumerationEntity[]>;
}
export { EnumerationEntity };
