import fetch, { RequestInit, Response } from 'node-fetch';
import config from 'common/config';

export const apiCall = async (resource: string, options: RequestInit = { method: 'GET' }): Promise<any> => {
  const { apiUrl } = config;
  const url = `${apiUrl}${resource}`;

  return await fetch(url, options) as Response;
};

export default apiCall;
