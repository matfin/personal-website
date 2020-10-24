import fetch, { RequestInit, Response } from 'node-fetch';
import {
  getApiUrl,
  getIsProduction,
  getIsServer,
  getPort,
} from 'common/config';

export const apiCall = async (
  resource: string,
  options: RequestInit = { method: 'GET' }
): Promise<Response> => {
  const isProduction: boolean = getIsProduction();
  const isServer: boolean = getIsServer();
  const apiUrl: string = getApiUrl();
  const port: string = getPort();
  const clientUrl = isProduction
    ? `${apiUrl}${resource}`
    : `${apiUrl}:${port}${resource}`;
  const serverUrl = `http://localhost:${port}${resource}`;
  const url = isServer ? serverUrl : clientUrl;

  return await fetch(url, options);
};

export default apiCall;
