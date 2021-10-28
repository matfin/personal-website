import { runSaga } from 'redux-saga';
import { call, fork, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { PageProps } from 'models';
import ActionTypes from './types';
import { fetchPageRequest, resetPage } from './actions';
import { query } from 'app/services/api';
import rootSaga, { fetchPage, loading } from './sagas';

jest.mock('app/services/api/api', () => ({
  query: jest.fn(),
}));

const mockState = {
  appState: {},
  pageState: {},
};

describe('Page sagas', (): void => {
  const page: PageProps = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };

  afterEach((): void => {
    (query as jest.Mock).mockReset();
  });

  describe('root saga', (): void => {
    it('should run the root saga', async (): Promise<void> => {
      const gen = rootSaga();

      expect(gen.next().value).toEqual(take(ActionTypes.FETCH_PAGE_REQUEST));
      expect(gen.next().value).toEqual(0);
    });

    it('should cancel fetching a page', async (): Promise<void> => {
      await expectSaga(rootSaga)
        .withState(mockState)
        .take(ActionTypes.FETCH_PAGE_REQUEST)
        .fork(fetchPage, {
          payload: 'home',
          type: ActionTypes.FETCH_PAGE_REQUEST,
        })
        .take(ActionTypes.RESET_PAGE)
        .dispatch(fetchPageRequest('home'))
        .dispatch(resetPage())
        .silentRun();
    });
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
    (query as jest.Mock).mockResolvedValue(page);

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      fetchPage,
      { payload: 'test', type: ActionTypes.FETCH_PAGE_REQUEST }
    ).toPromise();

    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith({
      url: '/pages/test.json',
      signal: new AbortController().signal,
    });
    expect(dispatched).toEqual([
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ]);
  });

  it('should fetch a page with the index url', async (): Promise<void> => {
    (query as jest.Mock).mockResolvedValue(page);

    const dispatched: unknown[] = [];

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      fetchPage,
      { payload: '/', type: ActionTypes.FETCH_PAGE_REQUEST }
    ).toPromise();

    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith({
      url: '/pages/index.json',
      signal: new AbortController().signal,
    });
    expect(dispatched).toEqual([
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ]);
  });

  it('should cancel fetching a page', async (): Promise<void> => {
    const spyAbort = jest.spyOn(AbortController.prototype, 'abort');
    const gen = fetchPage({
      payload: 'home',
      type: ActionTypes.FETCH_PAGE_REQUEST,
    });
    const loadingTask = fork(loading);

    expect(gen.next().value).toEqual(loadingTask); // fork loading
    expect(gen.next().value).toEqual(
      call(query, { url: '/pages/home.json', signal: expect.any(AbortSignal) })
    ); // call query

    gen.return(true); // return before query ends
    gen.next(true); // cancel loading task
    gen.next(true); // yield cancelled

    expect(spyAbort).toHaveBeenCalledTimes(1);

    spyAbort.mockRestore();
  });

  it('should fail fetch a page', async (): Promise<void> => {
    const error = new Error('error');
    const dispatched: unknown[] = [];

    (query as jest.Mock).mockImplementation((): void => {
      throw error;
    });

    await runSaga(
      {
        dispatch: (action): unknown => dispatched.push(action),
        getState: () => ({}),
      },
      fetchPage,
      { payload: 'test', type: ActionTypes.FETCH_PAGE_REQUEST }
    ).toPromise();

    expect(query).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([
      { type: ActionTypes.FETCH_PAGE_FAILURE, error },
    ]);
  });
});
