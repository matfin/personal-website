import { Page } from 'models';
import { fetchPageBySlug } from './api';

const headers = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET',
};

const state = {
  page: {
    page: null,
    pending: false,
    error: null,
  },
};

const page: Page = {
  title: 'Test title',
  description: 'Test description',
  root: null,
  slug: 'test',
};

describe('page state api', (): void => {
  afterEach((): void => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('calls to fetch a page with the default index slug', async (): Promise<void> => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: (): Promise<unknown> => Promise.resolve(page),
    } as Response);

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);
    const action = fetchPageBySlug('/');

    await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'page/fetchPageBySlug/pending',
      meta: expect.any(Object),
    });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'page/fetchPageBySlug/fulfilled',
      payload: page,
      meta: expect.any(Object),
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/pages/index.json', headers);
  });

  it('calls to fetch a page with a specified slug', async (): Promise<void> => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: (): Promise<unknown> => Promise.resolve(page),
    } as Response);

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);
    const action = fetchPageBySlug('test-slug');

    await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/pages/test-slug.json', headers);
  });

  it('calls to fetch a page and fails', async (): Promise<void> => {
    jest.spyOn(global, 'fetch').mockRejectedValue({
      ok: false,
      status: 500,
      statusText: 'failed',
    } as Response);

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(state);
    const action = fetchPageBySlug('test-slug');

    await action(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: 'page/fetchPageBySlug/pending',
      meta: expect.any(Object),
    });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: 'page/fetchPageBySlug/rejected',
      payload: {
        errorMessage: 'Unable to fetch from slug: test-slug',
      },
      error: { message: 'Rejected' },
      meta: expect.any(Object),
    });
  });
});
