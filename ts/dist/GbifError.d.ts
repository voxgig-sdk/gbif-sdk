import { Context } from './Context';
declare class GbifError extends Error {
    isGbifError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { GbifError };
