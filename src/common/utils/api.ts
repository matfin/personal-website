import fetch, { RequestInit, Response } from 'node-fetch';
import Config from '../../Config';

export const apiCall = async (url: string, options: RequestInit = { method: 'GET' }): Promise<any> => {
  const { baseUrl } = Config;

  return await fetch(`${baseUrl}${url}`, options) as Response;
};

export default apiCall;
