import { EnumerationEntity } from './entity/EnumerationEntity';
import { LiteratureEntity } from './entity/LiteratureEntity';
import { OccurrenceEntity } from './entity/OccurrenceEntity';
import { RegistryEntity } from './entity/RegistryEntity';
import { SpeciesEntity } from './entity/SpeciesEntity';
import { VocabularyEntity } from './entity/VocabularyEntity';
export type * from './GbifTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GbifEntityBase } from './GbifEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GbifSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Enumeration(entopts?: Record<string, any>): EnumerationEntity;
    Literature(entopts?: Record<string, any>): LiteratureEntity;
    Occurrence(entopts?: Record<string, any>): OccurrenceEntity;
    Registry(entopts?: Record<string, any>): RegistryEntity;
    Species(entopts?: Record<string, any>): SpeciesEntity;
    Vocabulary(entopts?: Record<string, any>): VocabularyEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GbifSDK;
    tester(testopts?: any, sdkopts?: any): GbifSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GbifSDK;
export { stdutil, config, BaseFeature, GbifEntityBase, GbifSDK, SDK, };
