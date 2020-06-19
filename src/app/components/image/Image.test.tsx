import React from 'react';
import { render } from '@testing-library/react';
import { Image, IProps } from './Image';

const defaultProps: IProps = {
  fileType: 'jpg',
  name: 'test',
  title: 'Test',
};

describe('Image tests', () => {
  it('renders the component', (): void => {
    const wrapper = render(<Image {...defaultProps} />);
    const img: HTMLImageElement = wrapper.getByTestId('img') as HTMLImageElement;

    expect(wrapper).toBeTruthy();
    expect(img.srcset).toContain('/images/test-sm.jpg 640w,');
    expect(img.srcset).toContain('/images/test-lg.jpg 1280w');
    expect(img.sizes).toContain('(max-width: 768px) 240px, 320px');
  });
});
