import * as fetch from 'node-fetch';
import * as config from 'common/config';
import apiCall from './api';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch', () => jest.fn());

describe('api tests', (): void => {
  const expectedResponse: string = JSON.stringify({ test: 'Works!' });
  const spyFetch = jest.spyOn(fetch, 'default');
  const spyGetApiUrl = jest
    .spyOn(config, 'getApiUrl')
    .mockReturnValue('https://test.de');
  const spyGetIsProduction = jest.spyOn(config, 'getIsProduction');
  const spyGetPort = jest.spyOn(config, 'getPort').mockReturnValue('4000');
  const spyGetIsServer = jest
    .spyOn(config, 'getIsServer')
    .mockReturnValue(false);

  beforeEach((): void => {
    spyFetch.mockResolvedValue(new Response(expectedResponse));
    spyFetch.mockClear();
    spyGetApiUrl.mockClear();
    spyGetIsProduction.mockClear();
    spyGetPort.mockClear();
    spyGetIsServer.mockClear();
  });

  afterAll((): void => {
    spyFetch.mockRestore();
    spyGetApiUrl.mockRestore();
    spyGetIsProduction.mockRestore();
    spyGetPort.mockRestore();
    spyGetIsServer.mockRestore();
  });

  it('calls fetch and resolves with a response', async (): Promise<void> => {
    spyGetIsProduction.mockReturnValue(false);

    const response = await apiCall('/test/resource');
    const responseData = await response.json();

    expect(spyFetch).toHaveBeenCalledWith(
      'https://test.de:4000/test/resource',
      {
        method: 'GET',
      }
    );
    expect(response.status).toEqual(200);
    expect(responseData).toEqual({ test: 'Works!' });
  });

  it('calls fetch without specifying the port number', async (): Promise<
    void
  > => {
    spyGetIsProduction.mockReturnValue(true);

    const response = await apiCall('/test/resource');
    const responseData = await response.json();

    expect(spyFetch).toHaveBeenCalledWith('https://test.de/test/resource', {
      method: 'GET',
    });
    expect(response.status).toEqual(200);
    expect(responseData).toEqual({ test: 'Works!' });
  });

  it('calls fetch with localhost server side only', async (): Promise<void> => {
    spyGetIsProduction.mockReturnValue(true);
    spyGetIsServer.mockReturnValue(true);

    const response = await apiCall('/test/resource');
    const responseData = await response.json();

    expect(spyFetch).toHaveBeenCalledWith(
      'http://localhost:4000/test/resource',
      {
        method: 'GET',
      }
    );
    expect(response.status).toEqual(200);
    expect(responseData).toEqual({ test: 'Works!' });
  });
});
