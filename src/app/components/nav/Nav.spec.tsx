import React from 'react';
import { renderWithRouter } from 'utils/testutils';
import Nav, { pathRoot } from './Nav';

describe('Nav tests', (): void => {
  it('renders the component with children', (): void => {
    expect(renderWithRouter(<Nav />)).toBeTruthy();
  });

  it('returns the correct path root', (): void => {
    expect(pathRoot('/')).toEqual('index');
    expect(pathRoot('/about/')).toEqual('about');
    expect(pathRoot('/projects/test-project/')).toEqual('projects');
  });
});
