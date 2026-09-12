export interface Enumeration {
    iso2?: string;
    name?: string;
    title?: string;
    url?: string;
}
export interface EnumerationLoadMatch {
    enumeration: string;
}
export interface EnumerationListMatch {
    iso2?: string;
    name?: string;
    title?: string;
    url?: string;
    $action?: string;
    [action: string]: any;
}
export interface Literature {
    authors?: any[];
    id?: string;
    title?: string;
    year?: number;
}
export interface LiteratureListMatch {
    limit?: number;
    offset?: number;
    q?: string;
    year?: number;
    $action?: string;
    [action: string]: any;
}
export interface Occurrence {
    country?: string;
    creator?: string;
    decimalLatitude?: number;
    decimalLongitude?: number;
    format?: string;
    key?: number;
    notificationAddresses?: any[];
    predicate?: Record<string, any>;
    scientificName?: string;
    year?: number;
}
export interface OccurrenceListMatch {
    country?: string;
    limit?: number;
    offset?: number;
    year?: string;
    $action?: string;
    [action: string]: any;
}
export interface OccurrenceCreateData {
    country?: string;
    creator?: string;
    decimalLatitude?: number;
    decimalLongitude?: number;
    format?: string;
    key?: number;
    notificationAddresses?: any[];
    predicate?: Record<string, any>;
    scientificName?: string;
    year?: number;
}
export interface Registry {
    country?: string;
    key?: string;
    publishingOrganizationKey?: string;
    title?: string;
    type?: string;
}
export interface RegistryListMatch {
    country?: string;
    limit?: number;
    offset?: number;
    q?: string;
}
export interface Species {
    canonicalName?: string;
    confidence?: number;
    key?: number;
    matchType?: string;
    rank?: string;
    scientificName?: string;
    usageKey?: number;
}
export interface SpeciesLoadMatch {
    kingdom?: string;
    name: string;
    $action?: string;
    [action: string]: any;
}
export interface SpeciesListMatch {
    limit?: number;
    offset?: number;
    q?: string;
    $action?: string;
    [action: string]: any;
}
export interface Vocabulary {
    description?: string;
    name?: string;
}
export interface VocabularyListMatch {
    description?: string;
    name?: string;
}
