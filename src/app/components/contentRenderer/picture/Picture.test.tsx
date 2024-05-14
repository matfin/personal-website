import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Picture, { Props } from './Picture';

const defaultProps: Props = {
  fileType: 'jpg',
  name: 'test',
  title: 'Test',
};

describe('Picture tests', (): void => {
  it('renders the component', (): void => {
    const wrapper = render(<Picture {...defaultProps} />);
    const smWebp: HTMLSourceElement = wrapper.getByTestId(
      'sm-webp',
    ) as HTMLSourceElement;
    const smJpg: HTMLSourceElement = wrapper.getByTestId(
      'sm-jpg',
    ) as HTMLSourceElement;
    const lgWebp: HTMLSourceElement = wrapper.getByTestId(
      'lg-webp',
    ) as HTMLSourceElement;
    const lgJpg: HTMLSourceElement = wrapper.getByTestId(
      'lg-jpg',
    ) as HTMLSourceElement;

    expect(wrapper).toBeTruthy();
    expect(smWebp.srcset).toContain('/images/test-sm@1x.webp,');
    expect(smWebp.srcset).toContain('/images/test-sm@2x.webp 2x,');
    expect(smWebp.srcset).toContain('/images/test-sm@3x.webp 3x');

    expect(smJpg.srcset).toContain('/images/test-sm@1x.jpg,');
    expect(smJpg.srcset).toContain('/images/test-sm@2x.jpg 2x,');
    expect(smJpg.srcset).toContain('/images/test-sm@3x.jpg 3x');

    expect(lgWebp.srcset).toContain('/images/test-lg@1x.webp,');
    expect(lgWebp.srcset).toContain('/images/test-lg@2x.webp 2x,');
    expect(lgWebp.srcset).toContain('/images/test-lg@3x.webp 3x');

    expect(lgJpg.srcset).toContain('/images/test-lg@1x.jpg,');
    expect(lgJpg.srcset).toContain('/images/test-lg@2x.jpg 2x,');
    expect(lgJpg.srcset).toContain('/images/test-lg@3x.jpg 3x');
  });
});
