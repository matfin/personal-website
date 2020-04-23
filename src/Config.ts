/* istanbul ignore file */
import { IAppConfig } from 'app/common/interfaces';

export default {
  baseUrl: process?.env?.BASE_URL || 'http://localhost:3000',
  cacheName: process?.env?.CACHE_NAME || 'react.typescript.showcase',
  disableCache: process?.env?.disableCache || false,
  appIconSizes: [48, 72, 96, 144, 168, 192],
} as IAppConfig;
