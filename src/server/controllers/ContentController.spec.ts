import express, { Request, Response, Router } from 'express';
import ContentController from './ContentController';

describe('ContentController tests', () => {
  it('should initialise routes', async () => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
    } as any);

    await new ContentController();

    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(spyGet.mock.calls[0][0]).toEqual('/content/page/:slug');
  });

  it('should deliver content', async () => {
    const spySendFile = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      sendFile: spySendFile,
    });
    const req: Request = {
      params: {
        slug: 'test-page',
      },
    } as any;
    const res: Response = {
      status: spyStatus,
    } as any;

    await new ContentController().getPage(req, res);

    expect(spyStatus).toHaveBeenCalledTimes(1);
    expect(spyStatus.mock.calls[0][0]).toEqual(200);
    expect(spySendFile).toHaveBeenCalledTimes(1);
    expect(spySendFile.mock.calls[0][0]).toContain('assets/pages/test-page.json');
    expect(spySendFile.mock.calls[0][1]).toEqual({
      headers: {
        'Content-type': 'application/json',
        'X-Powered-By': 'FluffyRabbitsTail',
      },
    });
  });
});
