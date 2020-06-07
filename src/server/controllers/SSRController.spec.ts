import express, { Response, Router } from 'express';
import * as reactDomServer from 'react-dom/server';
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
    config.mockReset();
  });

  it('should initialise the routes and set up the redux store', async () => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
    } as any);

    await new SSRController();
    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(spyGet).toHaveBeenCalledWith('/:slug(projects|cv|now)?', expect.any(Function), expect.any(Function));
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

  it('should generate SSR content then send it', async () => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const request: any = {
      params: {
        slug: 'test-slug'
      }
    };
    const response: any = {
      status: spyStatus,
    };
    const ssrController = new SSRController();
    const spyGenerateSSRContent = jest.spyOn(ssrController, 'generateSSRContent')
      .mockReturnValue(Promise.resolve('<p>test</p>'));

    // make the call with no cache - cache miss
    await ssrController.sendSSR(request, response);
    await expect(spyGenerateSSRContent).toHaveBeenCalledWith(request);
    await expect(spyStatus).toHaveBeenCalledWith(200);
    await expect(spySend).toHaveBeenCalledWith('<p>test</p>');

    // then make the call with cache present - cache hit
    ssrController.sendSSR(request, response);
    await expect(spyGenerateSSRContent).toHaveBeenCalledTimes(1);

    spyGenerateSSRContent.mockReset();
  });

  it('should send an error if content could not be generated', async () => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const request: any = {
      params: {
        slug: 'test-slug'
      }
    };
    const response: any = {
      status: spyStatus,
    };
    const ssrController = new SSRController();
    const spyGenerateSSRContent = jest.spyOn(ssrController, 'generateSSRContent')
      .mockRejectedValue('dummy error');

    await ssrController.sendSSR(request, response);
    await expect(spyStatus).toHaveBeenCalled();
    await expect(spyStatus).toHaveBeenCalledWith(500);
    await expect(spySend).toHaveBeenCalledWith({ e: 'dummy error' });

    spyGenerateSSRContent.mockReset();
  });

  it('generates SSR content', async() => {
    const request = {
      params: {
        slug: 'test-slug'
      }
    };
    const spyOn = jest.spyOn(reactDomServer, 'renderToNodeStream')
      .mockReturnValue({
        on: (type: string, cb: Function) => {
          if (type === 'data') {
            cb('test-chunk');
          } else if (type === 'end') {
            cb();
          }
        }
      } as any);
    const ssrController = new SSRController();

    spyGetState.mockResolvedValue({ test: 'state' });
    await expect(ssrController.generateSSRContent(request as any)).resolves.toBeTruthy();

    spyOn.mockRestore();
  });

  it('fails to generate SSR content', async() => {
    const request = {
      params: {
        slug: 'test-slug'
      }
    };
    const spyOn = jest.spyOn(reactDomServer, 'renderToNodeStream')
      .mockReturnValue({
        on: (type: string, cb: Function) => {
          if (type === 'error') {
            cb('error');
          }
        }
      } as any);
    const ssrController = new SSRController();

    spyGetState.mockResolvedValue({ test: 'state' });
    await expect(ssrController.generateSSRContent(request as any)).rejects.toEqual({ error: 'error' });

    spyOn.mockRestore();
  });
});
