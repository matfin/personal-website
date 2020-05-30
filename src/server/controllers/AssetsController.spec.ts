import express, { Router } from 'express';
import AssetsController from './AssetsController';

describe('AssetsController tests', () => {
  it('should initialise routes', async () => {
    const spyUse = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      use: spyUse,
    } as any);

    await new AssetsController();

    expect(spyUse).toHaveBeenCalledTimes(4);
    expect(spyUse.mock.calls[0][0]).toEqual('/scripts');
    expect(spyUse.mock.calls[1][0]).toEqual('/images');
    expect(spyUse.mock.calls[2][0]).toEqual('/manifest.json');
    expect(spyUse.mock.calls[3][0]).toEqual('/worker.js');
  });
});
