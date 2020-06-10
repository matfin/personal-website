import express, { Router } from 'express';
import AssetsController from './AssetsController';

describe('AssetsController tests', (): void => {
  it('should initialise routes', async (): Promise<void> => {
    const spyUse = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      use: spyUse,
    } as any);

    await new AssetsController();

    expect(spyUse).toHaveBeenCalledTimes(5);
    expect(spyUse.mock.calls[0][0]).toEqual('/docs');
    expect(spyUse.mock.calls[1][0]).toEqual('/images');
    expect(spyUse.mock.calls[2][0]).toEqual('/manifest.json');
    expect(spyUse.mock.calls[3][0]).toEqual('/scripts');
    expect(spyUse.mock.calls[4][0]).toEqual('/worker.js');
  });
});
