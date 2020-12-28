declare const appVersion: string;
declare const cacheName: string;
declare const canonicalUrl: string;
declare const enableCache: boolean;
declare const isProduction: boolean;

const appIconSizes: number[] = [32, 48, 72, 96, 128, 144, 168, 192, 196, 512];

export const getAppIconSizes = (): number[] => appIconSizes;
export const getAppVersion = (): string => appVersion;
export const getCacheName = (): string => cacheName;
export const getCanonicalUrl = (): string => canonicalUrl;
export const getEnableCache = (): boolean => enableCache;
export const getIsProduction = (): boolean => isProduction;
