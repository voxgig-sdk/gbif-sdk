import { GbifEntityBase } from '../GbifEntityBase';
import type { GbifSDK } from '../GbifSDK';
import type { Control } from '../types';
import type { Occurrence, OccurrenceListMatch, OccurrenceCreateData } from '../GbifTypes';
declare class OccurrenceEntity extends GbifEntityBase<Occurrence> {
    constructor(client: GbifSDK, entopts: any);
    make(this: OccurrenceEntity): OccurrenceEntity;
    list(this: any, reqmatch?: OccurrenceListMatch, ctrl?: Control): Promise<OccurrenceEntity[]>;
    create(this: any, reqdata?: OccurrenceCreateData, ctrl?: Control): Promise<OccurrenceEntity>;
}
export { OccurrenceEntity };
