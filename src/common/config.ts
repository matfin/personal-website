/* istanbul ignore file */
import { IAppConfig } from 'common/interfaces';

const getConfig = (key: string): string | undefined => {
  if (process?.browser) {
    return window[key];
  }

  return process.env[key];
};

export const config = {
  baseUrl: getConfig('BASE_URL') || 'http://localhost',
  port: getConfig('PORT') || '3000',
  cacheName: getConfig('CACHE_NAME') || 'mattfinucane.com',
  enableCache: Boolean(process?.env?.enableCache),
  appIconSizes: [48, 72, 96, 144, 168, 192],
} as IAppConfig;

export default config;
