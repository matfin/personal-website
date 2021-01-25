import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { PageProps } from 'models';
import ActionTypes from './types';
import watchPageSagas, { fetchPage, loading } from './sagas';

describe('Page sagas', (): void => {
  const page: PageProps = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };

  it('should watch page sagas', async (): Promise<void> => {
    const gen = watchPageSagas();

    expect(gen.next().value).toEqual(
      takeLatest(ActionTypes.FETCH_PAGE_REQUEST, fetchPage)
    );
  });

  it('should set the loading state after a delay', async (): Promise<void> => {
    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      loading
    ).toPromise();

    expect(dispatched).toEqual([{ type: ActionTypes.FETCH_PAGE_STARTED }]);
  });

  it('should fetch a page with success', async (): Promise<void> => {
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(page),
      status: 200,
    } as any);
    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      fetchPage,
      { payload: 'test', type: ActionTypes.FETCH_PAGE_REQUEST }
    ).toPromise();

    expect(spyFetch).toHaveBeenCalledWith(`/pages/test.json`);
    expect(dispatched).toEqual([
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ]);

    spyFetch.mockReset();
  });

  it('should fetch a page with the index url', async (): Promise<void> => {
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(page),
      status: 200,
    } as any);
    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      fetchPage,
      { payload: '/', type: ActionTypes.FETCH_PAGE_REQUEST }
    ).toPromise();

    expect(spyFetch).toHaveBeenCalledWith(`/pages/index.json`);
    expect(dispatched).toEqual([
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ]);

    spyFetch.mockReset();
  });

  it('should fail fetch a page', async (): Promise<void> => {
    const error = new Error('error');
    const spyFetch = jest.spyOn(global, 'fetch').mockRejectedValue(error);
    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      fetchPage,
      { payload: 'test', type: ActionTypes.FETCH_PAGE_REQUEST }
    ).toPromise();

    expect(spyFetch).toHaveBeenCalledWith(`/pages/test.json`);
    expect(dispatched).toEqual([
      { type: ActionTypes.FETCH_PAGE_FAILURE, error },
    ]);

    spyFetch.mockReset();
  });
});
