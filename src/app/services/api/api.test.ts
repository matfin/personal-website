import { query } from './api';

describe('api', (): void => {
  afterEach((): void => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('fetches with success', async (): Promise<void> => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: (): Promise<unknown> => Promise.resolve({ it: 'works' }),
    } as Response);

    const result: unknown = await query<unknown>({ url: 'https://test.ie' });

    expect(result).toEqual({ it: 'works' });
  });

  it('fails with an error', async (): Promise<void> => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      statusText: 'failed',
    } as Response);

    try {
      await query({ url: 'https://test.ie' });
    } catch (error) {
      expect(error).toEqual(new Error('failed'));
    }
  });
});
