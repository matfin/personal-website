import express, { Request, Response, Router } from 'express';
import AssetsController from './AssetsController';

describe('AssetsController tests', () => {
  it('should initialise routes', async () => {
    const spyGet = jest.fn() as jest.MockedFunction<typeof Router>;
    const spyUse = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      get: spyGet,
      use: spyUse,
    } as any);

    await new AssetsController();

    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(spyGet.mock.calls[0][0]).toEqual('/:file.js');
    expect(spyUse).toHaveBeenCalledTimes(2);
    expect(spyUse.mock.calls[0][0]).toEqual('/images');
    expect(spyUse.mock.calls[1][0]).toEqual('/meta');
  });

  it('should deliver scripts', async () => {
    const spySendFile = jest.fn();
    const spyStatus = jest.fn().mockReturnValue({
      sendFile: spySendFile,
    });
    const req: Request = {
      params: {
        file: 'test',
      },
    } as any;
    const res: Response = {
      status: spyStatus,
    } as any;

    await new AssetsController().scripts(req, res);

    expect(spyStatus).toHaveBeenCalledTimes(1);
    expect(spyStatus.mock.calls[0][0]).toEqual(200);
    expect(spySendFile).toHaveBeenCalledTimes(1);
    expect(spySendFile.mock.calls[0][0]).toContain('dist/app/test.js');
    expect(spySendFile.mock.calls[0][1]).toEqual({
      headers: {
        'Content-Type': 'application/x-javascript',
      },
    });
  });
});
