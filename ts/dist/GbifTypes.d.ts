export interface Enumeration {
}
export interface EnumerationLoadMatch {
    enumeration: string;
}
export interface EnumerationListMatch {
    $action?: string;
    [action: string]: any;
}
export interface Literature {
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
    creator?: string;
    format?: string;
    notificationAddresses?: any[];
    predicate?: Record<string, any>;
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
    creator?: string;
    format?: string;
    notificationAddresses?: any[];
    predicate?: Record<string, any>;
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
