import express, { Router } from 'express';
import AssetsController from './AssetsController';

describe('AssetsController tests', (): void => {
  it('should initialise routes for assets and metadata', async (): Promise<
    void
  > => {
    const spyUse = jest.fn() as jest.MockedFunction<typeof Router>;

    jest.spyOn(express, 'Router').mockReturnValue({
      use: spyUse,
    } as any);

    await new AssetsController();

    expect(spyUse).toHaveBeenCalledTimes(8);

    expect(spyUse.mock.calls[0][0]).toEqual('/manifest.json');
    expect(spyUse.mock.calls[1][0]).toEqual('/robots.txt');
    expect(spyUse.mock.calls[2][0]).toEqual('/sitemap.xml');
    expect(spyUse.mock.calls[3][0]).toEqual('/docs');

    expect(spyUse.mock.calls[4][0]).toEqual('/favicon.ico');
    expect(spyUse.mock.calls[5][0]).toEqual('/images');
    expect(spyUse.mock.calls[6][0]).toEqual('/scripts');
    expect(spyUse.mock.calls[7][0]).toEqual('/worker.js');
  });
});
