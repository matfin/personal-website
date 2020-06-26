import express, { Response, Router } from 'express';
import * as reactDomServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import createStoreWithPreloadedState from 'common/store';
import config from 'common/config';
import * as pageActions from 'app/views/page/actions';
import IndexComponent from 'server/IndexComponent';
import SSRController from './SSRController';


jest.mock('common/store');
jest.mock('common/config', (): any => ({
  enableCache: true,
}));
jest.mock('server/IndexComponent');
jest.mock('react-dom/server');

Helmet.canUseDOM = false;

describe('SSRController tests', (): void => {
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

  it('should initialise the routes and set up the redux store', async (): Promise<void> => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;
    const spyUse = jest.fn() as jest.MockedFunction<typeof Router>;

    const spyExpress = jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
      use: spyUse,
    } as any);

    await new SSRController();

    expect(spyGet).toHaveBeenCalledTimes(2);
    expect(spyUse).toHaveBeenCalled();
    expect(spyGet.mock.calls[0]).toEqual([
      '/:slug(404|projects|cv|now)?',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);
    expect(spyGet.mock.calls[1]).toEqual([
      '/:slug(projects/*)',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    ]);

    spyExpress.mockRestore();
  });

  it('should redirect by default when there is no route match', async (): Promise<void> => {
    const spyRedirect = jest.fn();
    const res = {
      redirect: spyRedirect,
    };

    await new SSRController().redirectToNotFound({} as any, res as any);
    expect(spyRedirect).toHaveBeenCalledWith('/404');
  });

  it('should dispatch to fetch a page and call next', async (): Promise<void> => {
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

  it('should dispatch to fetch home page by default and call next', async (): Promise<void> => {
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

  it('should generate SSR content then send it', async (): Promise<void> => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const request: any = {
      params: {
        slug: 'test-slug',
      },
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

    spyGenerateSSRContent.mockRestore();
  });

  it('should send an error if content could not be generated', async (): Promise<void> => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const request: any = {
      params: {
        slug: 'test-slug',
      },
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

  it('generates SSR content', async (): Promise<void> => {
    const request = {
      params: {
        slug: 'test-slug',
      },
    };
    const spyOn = jest.spyOn(reactDomServer, 'renderToNodeStream')
      .mockReturnValue({
        on: (type: string, cb: Function) => {
          if (type === 'data') {
            cb('test-chunk');
          } else if (type === 'end') {
            cb();
          }
        },
      } as any);
    const ssrController = new SSRController();

    spyGetState.mockResolvedValue({ test: 'state' });
    await expect(ssrController.generateSSRContent(request as any)).resolves.toBeTruthy();

    spyOn.mockRestore();
  });

  it('fails to generate SSR content', async (): Promise<void> => {
    const request = {
      params: {
        slug: 'test-slug',
      },
    };
    const spyOn = jest.spyOn(reactDomServer, 'renderToNodeStream')
      .mockReturnValue({
        on: (type: string, cb: Function) => {
          if (type === 'error') {
            cb('error');
          }
        },
      } as any);
    const ssrController = new SSRController();

    spyGetState.mockResolvedValue({ test: 'state' });
    await expect(ssrController.generateSSRContent(request as any)).rejects.toEqual(new Error('error'));

    spyOn.mockRestore();
  });

  it('should send content for unsupported browsers', async (): Promise<void> => {
    const spySend = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      send: spySend,
    });
    const spyNext = jest.fn();
    const request = {
      headers: {
        'user-agent': 'MSIE / Trident',
      },
    };
    const response: any = {
      status: spyStatus,
    };
    const ssrController = new SSRController();

    // if we are dealing with IE
    await ssrController.browserVersionGuard(request as any, response, spyNext);

    expect(spyNext).not.toHaveBeenCalled();
    expect(spyStatus).toHaveBeenCalledWith(200);
    expect(spySend).toHaveBeenCalled();
    spyNext.mockReset();
    spyStatus.mockReset();
    spySend.mockReset();

    // if we are not dealing with IE
    request.headers['user-agent'] = 'Non IE Test';
    await ssrController.browserVersionGuard(request as any, response, spyNext);

    expect(spyNext).toHaveBeenCalled();
    expect(spyStatus).not.toHaveBeenCalledWith();
    expect(spySend).not.toHaveBeenCalled();
  });
});
