import fs from 'fs';
import { renderToString } from 'react-dom/server';
import express, { Request, Response, Router } from 'express';
import createStoreWithPreloadedState from 'common/store';
import config from 'common/config';
import * as pageActions from 'app/views/page/actions';
import IndexComponent from 'server/IndexComponent';
import SSRController from './SSRController';
import { Helmet } from 'react-helmet';

jest.mock('common/store');
jest.mock('common/config', () => ({
  enableCache: true,
}));
jest.mock('server/IndexComponent');
jest.mock('react-dom/server');

Helmet.canUseDOM = false;

const stripSpaces = (str: string): string => str.replace(/\s/g, '');

const mockedHtml = `
  <script>PRELOADED_STATE</script>
  <script type="text/javascript">const enableServiceWorker = ENABLE_CACHE;</script>
`;

describe('SSRController tests', () => {
  const spyDispatch = jest.fn();
  const spyGetState = jest.fn();
  const spyReadFile = jest.spyOn(fs, 'readFile');

  IndexComponent.mockReturnValue('div');

  createStoreWithPreloadedState.mockReturnValue({
    dispatch: spyDispatch,
    getState: spyGetState,
  });

  afterEach(() => {
    spyDispatch.mockClear();
    spyGetState.mockClear();
    spyReadFile.mockClear();
  });

  afterAll(() => {
    IndexComponent.mockReset();
    createStoreWithPreloadedState.mockReset();
    config.mockReset();
    spyReadFile.mockReset();
  });

  it('should initialise the routes and set up the redux store', async () => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
    } as any);

    await new SSRController();
    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(spyGet).toHaveBeenCalledWith('/:slug(projects|cv)?', expect.any(Function), expect.any(Function));
  });

  it('should dispatch to fetch a page and call next', async () => {
    const spyFetchStory = jest.spyOn(pageActions, 'fetchPage');
    const spyNext = jest.fn();

    await new SSRController().reduxFetchPage(
      {
        params: {
          slug: 'test',
        },
      } as any,
      {} as Response,
      spyNext,
    );
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyFetchStory).toHaveBeenCalledTimes(1);
    expect(spyFetchStory).toHaveBeenCalledWith('test');
    expect(spyNext).toHaveBeenCalledTimes(1);

    spyFetchStory.mockReset();
  });

  it('should dispatch to fetch home page by default and call next', async () => {
    const spyFetchStory = jest.spyOn(pageActions, 'fetchPage');
    const spyNext = jest.fn();

    await new SSRController().reduxFetchPage(
      { params: {} } as any,
      {} as Response,
      spyNext,
    );
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyFetchStory).toHaveBeenCalledTimes(1);
    expect(spyFetchStory).toHaveBeenCalledWith('home');
    expect(spyNext).toHaveBeenCalledTimes(1);

    spyFetchStory.mockReset();
  });

  it('should send SSR rendered content', async () => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const res: Response = {
      status: spyStatus,
    } as any;
    const expected = stripSpaces(`
      <script type="text/javascript">window._PRELOADED_STATE_ = {};</script>
      <script type="text/javascript">const enableServiceWorker = true;</script>
    `);

    spyGetState.mockResolvedValue({ test: 'state' });
    spyReadFile.mockImplementation(
      (indexPath: unknown, charset: string, cb: Function): void => {
        cb(null, mockedHtml as string);
      }
    );

    await new SSRController().renderSSR({} as Request, res);

    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(200);
    expect(spySend).toHaveBeenCalled();
    expect(
      stripSpaces(spySend.mock.calls[0][0])
    ).toEqual(expected);

    spyReadFile.mockReset();
  });

  it('should send SSR rendered content with caching disabled', async () => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const res: Response = {
      status: spyStatus,
    } as any;
    const expected = stripSpaces(`
      <script type="text/javascript">window._PRELOADED_STATE_ = {};</script>
      <script type="text/javascript">const enableServiceWorker = false;</script>
    `);

    spyGetState.mockResolvedValue({ test: 'state' });
    config.enableCache = false;
    spyReadFile.mockImplementation(
      (indexPath: unknown, charset: string, cb: Function): void => {
        cb(null, mockedHtml as string);
      }
    );

    await new SSRController().renderSSR({} as Request, res);
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(200);
    expect(spySend).toHaveBeenCalled();
    expect(
      stripSpaces(spySend.mock.calls[0][0])
    ).toEqual(expected);

    spyReadFile.mockReset();
  });

  it('should fail to render and return an error', async () => {
    const spyJson = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      json: spyJson,
    });
    const res: Response = {
      status: spyStatus,
    } as any;
    const expected = { error: new Error('cannot-render-to-string').toString() };

    spyGetState.mockResolvedValue({ test: 'state' });
    renderToString.mockImplementation(() => {
      throw new Error('cannot-render-to-string');
    });

    await new SSRController().renderSSR({} as Request, res);
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(500);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith(expected);

    renderToString.mockReset();
  });

  it('should fail to read in the index content and return an error', async () => {
    const spyJson = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      json: spyJson,
    });
    const res: Response = {
      status: spyStatus,
    } as any;

    spyReadFile.mockImplementation(
      (path: string, encoding: string, callback: Function): void => {
        callback(new Error('cannot-read-index'));
      },
    );

    await new SSRController().renderSSR({} as Request, res);
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(500);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith({ error: new Error('cannot-read-index') });

    spyReadFile.mockReset();
  });
});
