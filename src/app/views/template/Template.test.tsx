import usePage from '@hooks/usePage';
import { fireEvent, screen } from '@testing-library/react';
import { renderWrapped } from '@testutils';
import { setBodyOverflow } from '@utils/general';
import {
  afterAll,
  afterEach,
  describe,
  expect,
  it,
  type MockInstance,
  vi,
} from 'vitest';
import Template from './index';
import classNames from './Template.module.css';

vi.mock('@utils/general', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@utils/general')>();

  return {
    ...mod,
    setBodyOverflow: vi.fn(),
  };
});

vi.mock('@hooks/usePage', () => ({
  default: vi.fn().mockReturnValue({
    isNested: false,
  }),
}));

describe('template tests', (): void => {
  afterEach((): void => {
    (setBodyOverflow as unknown as MockInstance).mockClear();
  });

  afterAll((): void => {
    (setBodyOverflow as unknown as MockInstance).mockReset();
  });

  it('renders the component', (): void => {
    expect(() => renderWrapped(<Template />)).not.toThrow();
  });

  it('applies the correct classes if not nested', (): void => {
    renderWrapped(<Template />);

    const main = screen.getByRole('main');

    expect(main.classList.contains(classNames.main)).toBe(true);
    expect(main.classList.contains(classNames.nested)).toBe(false);
  });

  it('applies the correct classes if nested', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({ isNested: true });
    renderWrapped(<Template />);

    const main = screen.getByRole('main');

    expect(main.classList.contains(classNames.main)).toBe(true);
    expect(main.classList.contains(classNames.nested)).toBe(true);
  });

  it('sets the body overflow on navigation menu button tap', (): void => {
    renderWrapped(<Template />);

    fireEvent.click(screen.getByRole('button'));

    expect(setBodyOverflow).toHaveBeenCalledTimes(1);
    expect(setBodyOverflow).toHaveBeenCalledWith(false);
  });

  it('sets the body overflow on main section tap', (): void => {
    renderWrapped(<Template />);

    fireEvent.click(screen.getByRole('main'));

    expect(setBodyOverflow).toHaveBeenCalledTimes(1);
    expect(setBodyOverflow).toHaveBeenCalledWith(true);
  });

  it('sets the body overflow key press on aside', (): void => {
    renderWrapped(<Template />);

    fireEvent.keyDown(screen.getByRole('complementary'), 'enter');

    expect(setBodyOverflow).toHaveBeenCalledTimes(1);
    expect(setBodyOverflow).toHaveBeenCalledWith(true);
  });

  it('sets the body overflow key press on main', (): void => {
    renderWrapped(<Template />);

    fireEvent.keyDown(screen.getByRole('main'), 'enter');

    expect(setBodyOverflow).toHaveBeenCalledTimes(1);
    expect(setBodyOverflow).toHaveBeenCalledWith(true);
  });
});
