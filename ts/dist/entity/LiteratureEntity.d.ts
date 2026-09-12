import { GbifEntityBase } from '../GbifEntityBase';
import type { GbifSDK } from '../GbifSDK';
import type { Control } from '../types';
import type { Literature, LiteratureListMatch } from '../GbifTypes';
declare class LiteratureEntity extends GbifEntityBase<Literature> {
    constructor(client: GbifSDK, entopts: any);
    make(this: LiteratureEntity): LiteratureEntity;
    list(this: any, reqmatch?: LiteratureListMatch, ctrl?: Control): Promise<LiteratureEntity[]>;
}
export { LiteratureEntity };
