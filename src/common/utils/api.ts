import fetch, { RequestInit, Response } from 'node-fetch';
import config from 'common/config';
import { isServer } from 'common/utils';

export const apiCall = async (
  resource: string,
  options: RequestInit = { method: 'GET' }
): Promise<any> => {
  const { apiUrl, port } = config;
  const base = isServer() ? `http://localhost:${port}` : apiUrl;
  const url = `${base}${resource}`;

  return (await fetch(url, options)) as Response;
};

export default apiCall;
