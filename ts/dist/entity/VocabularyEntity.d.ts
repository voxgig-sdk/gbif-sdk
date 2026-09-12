import { GbifEntityBase } from '../GbifEntityBase';
import type { GbifSDK } from '../GbifSDK';
import type { Control } from '../types';
import type { Vocabulary, VocabularyListMatch } from '../GbifTypes';
declare class VocabularyEntity extends GbifEntityBase<Vocabulary> {
    constructor(client: GbifSDK, entopts: any);
    make(this: VocabularyEntity): VocabularyEntity;
    list(this: any, reqmatch?: VocabularyListMatch, ctrl?: Control): Promise<VocabularyEntity[]>;
}
export { VocabularyEntity };
