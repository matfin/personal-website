import fetch, { RequestInit, Response } from 'node-fetch';
import config from 'common/config';

export const apiCall = async (url: string, options: RequestInit = { method: 'GET' }): Promise<any> => {
  const { baseUrl, port } = config;

  return await fetch(`${baseUrl}:${port}${url}`, options) as Response;
};

export default apiCall;
