import { DateTime, Duration } from '../date-time';

describe('DateTime', () => {
  it('should construct from text and add days', () => {
    expect(DateTime.at('2019-02-01').add(1, Duration.DAY).format('YYYY-MM-DD')).toBe('2019-02-02');
  });
  it('should correctly calculate days difference', () => {
    const today = new DateTime();
    const todayString = new DateTime().format('YYYY-MM-DD');
    const yesterdayString = new DateTime().add(-1, Duration.DAY).format('YYYY-MM-DD');
    const tomorrowString = new DateTime().add(1, Duration.DAY).format('YYYY-MM-DD');
    expect(today.daysDiff(todayString)).toBe(0);
    expect(today.daysDiff(tomorrowString)).toBe(1);
    expect(today.daysDiff(yesterdayString)).toBe(-1);
  });

  it('should construct from text and calculate the difference of a future date', () => {
    expect(DateTime.at('2019-02-13').daysUntil('2019-02-14')).toBe(1);
  });

  it('should construct from text and calculate the difference of a past date', () => {
    expect(DateTime.at('2019-02-13').daysUntil('2019-02-12')).toBe(-1);
  });

  it('should construct from default and calculate the difference of a future date', () => {
    const futureDate = DateTime.now().add(1, Duration.DAY);
    expect(DateTime.now().daysUntil(futureDate)).toBe(1);
  });
});
