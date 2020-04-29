/* istanbul ignore file */
import { IAppConfig } from 'common/interfaces';

export default {
  baseUrl: process?.env?.BASE_URL || 'http://localhost:3000',
  cacheName: process?.env?.CACHE_NAME || 'mattfinucane.com',
  enableCache: Boolean(process?.env?.enableCache),
  appIconSizes: [48, 72, 96, 144, 168, 192],
} as IAppConfig;
