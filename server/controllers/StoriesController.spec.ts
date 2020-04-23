import express, { Request, Response, Router } from 'express';
import StoriesController from './StoriesController';

describe('StoriesController tests', () => {
  it('should initialise routes', async () => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
    } as any);

    await new StoriesController();

    expect(spyGet).toHaveBeenCalledTimes(2);
    expect(spyGet.mock.calls[0][0]).toEqual('/content/stories');
    expect(spyGet.mock.calls[1][0]).toEqual('/content/story/:slug');
  });

  it('should deliver a list of stories', async () => {
    const spySendFile = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      sendFile: spySendFile,
    });
    const req: Request = {} as any;
    const res: Response = {
      status: spyStatus,
    } as any;

    await new StoriesController().index(req, res);

    expect(spyStatus).toHaveBeenCalledTimes(1);
    expect(spyStatus.mock.calls[0][0]).toEqual(200);
    expect(spySendFile).toHaveBeenCalledTimes(1);
    expect(spySendFile.mock.calls[0][0]).toContain('/assets/content/list.json');
    expect(spySendFile.mock.calls[0][1]).toEqual({
      headers: {
        'Content-type': 'application/json',
        'X-Powered-By': 'FluffyRabbitsTail',
      },
    });
  });

  it('should deliver a story', async () => {
    const spySendFile = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      sendFile: spySendFile,
    });
    const req: Request = {
      params: {
        slug: 'test-story',
      },
    } as any;
    const res: Response = {
      status: spyStatus,
    } as any;

    await new StoriesController().getStory(req, res);

    expect(spyStatus).toHaveBeenCalledTimes(1);
    expect(spyStatus.mock.calls[0][0]).toEqual(200);
    expect(spySendFile).toHaveBeenCalledTimes(1);
    expect(spySendFile.mock.calls[0][0]).toContain('assets/content/test-story.json');
    expect(spySendFile.mock.calls[0][1]).toEqual({
      headers: {
        'Content-type': 'application/json',
        'X-Powered-By': 'FluffyRabbitsTail',
      },
    });
  });
});
