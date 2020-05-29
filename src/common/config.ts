/* istanbul ignore file */
import { IAppConfig } from 'common/interfaces';

export const getConfig = (key: string, fallback: string): string | undefined => {
  if (typeof process !== 'undefined' && process?.env[key]) {
    return process?.env[key];
  }

  if (typeof window !== 'undefined' && window[key]) {
    return window[key];
  }

  return fallback;
};

export const config = {
  baseUrl: getConfig('BASE_URL', 'http://localhost'),
  port: getConfig('PORT', '3000'),
  cacheName: getConfig('CACHE_NAME', 'mattfinucane.com'),
  enableCache: Boolean(process?.env?.ENABLE_CACHE),
  appIconSizes: [32, 48, 72, 96, 128, 144, 168, 192, 196, 512],
} as IAppConfig;

export default config;
