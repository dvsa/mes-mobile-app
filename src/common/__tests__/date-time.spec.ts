import { at, Duration } from '../date-time';

describe('DateTime', () => {
  it('should construct from text and add days', () => {
    expect(at('2019-02-01').add(1, Duration.DAY).format('YYYY-MM-DD')).toBe('2019-02-02');
  });
});
