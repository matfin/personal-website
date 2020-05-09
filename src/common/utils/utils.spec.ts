import { formatDate } from './utils';

describe('utils tests', () => {
  it('should format a date', () => {
    expect(formatDate(new Date('1982-04-26'))).toEqual('April 1982');
  });
});
