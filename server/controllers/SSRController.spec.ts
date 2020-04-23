import fs from 'fs';
import { renderToString } from 'react-dom/server';
import express, { Request, Response, Router } from 'express';
import createStoreWithPreloadedState from 'app/common/store';
import * as listActions from 'app/components/list/actions';
import * as storyActions from 'app/components/story/actions';
import IndexComponent from '../IndexComponent';
import SSRController from './SSRController';

jest.mock('../../src/common/store');
jest.mock('../IndexComponent');
jest.mock('react-dom/server');

describe('SSRController tests', () => {
  const spyDispatch = jest.fn();
  const spyGetState = jest.fn();

  IndexComponent.mockReturnValue('div');

  createStoreWithPreloadedState.mockReturnValue({
    dispatch: spyDispatch,
    getState: spyGetState,
  });

  afterEach(() => {
    spyDispatch.mockClear();
    spyGetState.mockClear();
  });

  afterAll(() => {
    IndexComponent.mockReset();
    createStoreWithPreloadedState.mockReset();
  });

  it('should initialise the routes and set up the redux store', async () => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
    } as any);

    await new SSRController();
    expect(spyGet).toHaveBeenCalledTimes(2);
    expect(spyGet).toHaveBeenNthCalledWith(1, '/story/:slug', expect.any(Function), expect.any(Function));
    expect(spyGet).toHaveBeenNthCalledWith(2, '/', expect.any(Function), expect.any(Function));
  });

  it('should dispatch to fetch stories and call next', async () => {
    const spyFetchStories = jest.spyOn(listActions, 'fetchStories');
    const spyNext = jest.fn();

    await new SSRController().reduxFetchStories({} as Request, {} as Response, spyNext);
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyFetchStories).toHaveBeenCalledTimes(1);
    expect(spyNext).toHaveBeenCalledTimes(1);

    spyFetchStories.mockReset();
  });

  it('should dispatch to fetch a story and call next', async () => {
    const spyFetchStory = jest.spyOn(storyActions, 'fetchStory');
    const spyNext = jest.fn();

    await new SSRController().reduxFetchStory(
      {
        params: {
          slug: 'test-story',
        },
      } as any,
      {} as Response,
      spyNext,
    );
    expect(spyDispatch).toHaveBeenCalledTimes(1);
    expect(spyFetchStory).toHaveBeenCalledTimes(1);
    expect(spyFetchStory).toHaveBeenCalledWith('test-story');
    expect(spyNext).toHaveBeenCalledTimes(1);

    spyFetchStory.mockReset();
  });

  it('should send SSR rendered content', async () => {
    const spyReadFile = jest.spyOn(fs, 'readFile').mockImplementation(
      (indexPath: string, charset: string, cb: Function): void => {
        cb(null, '<div id="root"><script>PRELOADED_STATE</script></div>');
      },
    );
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const res: Response = {
      status: spyStatus,
    } as any;
    const expected = '<div id="root"><script type="text/javascript">window._PRELOADED_STATE_ = {};</script></div>';

    spyGetState.mockResolvedValue({ test: 'state' });

    await new SSRController().renderSSR({} as Request, res);
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(200);
    expect(spySend).toHaveBeenCalled();
    expect(spySend).toHaveBeenCalledWith(expected);

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
    const expected = { error: new Error('cannot-render-to-string') };

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
    const spyReadFile = jest.spyOn(fs, 'readFile').mockImplementation(
      (path: string, encoding: string, callback: Function): void => {
        callback(new Error('cannot-read-index'));
      },
    );
    const spyJson = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      json: spyJson,
    });
    const res: Response = {
      status: spyStatus,
    } as any;

    await new SSRController().renderSSR({} as Request, res);
    expect(spyStatus).toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(500);
    expect(spyJson).toHaveBeenCalled();
    expect(spyJson).toHaveBeenCalledWith({ error: new Error('cannot-read-index') });

    spyReadFile.mockReset();
  });
});
