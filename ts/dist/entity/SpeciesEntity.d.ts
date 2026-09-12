import { GbifEntityBase } from '../GbifEntityBase';
import type { GbifSDK } from '../GbifSDK';
import type { Control } from '../types';
import type { Species, SpeciesLoadMatch, SpeciesListMatch } from '../GbifTypes';
declare class SpeciesEntity extends GbifEntityBase<Species> {
    constructor(client: GbifSDK, entopts: any);
    make(this: SpeciesEntity): SpeciesEntity;
    load(this: any, reqmatch?: SpeciesLoadMatch, ctrl?: Control): Promise<SpeciesEntity>;
    list(this: any, reqmatch?: SpeciesListMatch, ctrl?: Control): Promise<SpeciesEntity[]>;
}
export { SpeciesEntity };
