import fetch, { RequestInit, Response } from 'node-fetch';
import config from 'common/config';

export const apiCall = async (url: string, options: RequestInit = { method: 'GET' }): Promise<any> => {
  const { baseUrl } = config;

  return await fetch(`${baseUrl}${url}`, options) as Response;
};

export default apiCall;
