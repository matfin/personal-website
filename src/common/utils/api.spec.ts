import * as fetch from 'node-fetch';
import * as utils from 'common/utils/utils';
import apiCall from './api';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch', () => jest.fn());
jest.mock('common/config', () => ({
  apiUrl: 'https://test.de',
  port: 4000
}));

describe('api tests', (): void => {
  it('calls fetch and resolved with a response', async (): Promise<void> => {
    const expectedResponse: string = JSON.stringify({ test: 'Works!' });
    const spyFetch = jest.spyOn(fetch, 'default').mockResolvedValue(new Response(expectedResponse));
    const response = await apiCall('/test/resource');
    const responseData = await response.json();

    expect(spyFetch).toHaveBeenCalledWith(
      'https://test.de/test/resource',
      { method: 'GET'}
    );
    expect(response.status).toEqual(200);
    expect(responseData).toEqual({ test: 'Works!' });

    spyFetch.mockRestore();
  });

  it('calls fetch with a url when server side', async (): Promise<void> => {
    const expectedResponse: string = JSON.stringify({ test: 'Works!' });
    const spyFetch = jest.spyOn(fetch, 'default').mockResolvedValue(new Response(expectedResponse));
    const spyIsServer = jest.spyOn(utils, 'isServer').mockImplementation(() => true);
    const response = await apiCall('/test/resource');
    const responseData = await response.json();

    expect(spyFetch).toHaveBeenCalledWith(
      'http://localhost:4000/test/resource',
      { method: 'GET'}
    );
    expect(response.status).toEqual(200);
    expect(responseData).toEqual({ test: 'Works!' });

    spyFetch.mockRestore();
    spyIsServer.mockRestore();
  });
});
