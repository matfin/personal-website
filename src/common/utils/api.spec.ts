import fetch from 'node-fetch';
import apiCall from './api';

const { Response } = jest.requireActual('node-fetch');

jest.mock('node-fetch', () => jest.fn());

describe('api tests', () => {
  it('calls fetch and resolved with a response', async () => {
    const expectedResponse: string = JSON.stringify({ test: 'Works!' });

    (fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce(new Response(expectedResponse));

    const response = await apiCall('/test/resource');
    const responseData = await response.json();

    expect(response.status).toEqual(200);
    expect(responseData).toEqual({ test: 'Works!' });
  });
});
