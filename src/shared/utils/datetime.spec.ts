import { DateTimeUtility } from './datetime';

describe('DateTimeUtility - ', () => {
  it('should extract the correct time from the timestamp', () => {
    const dateTimeUtility = new DateTimeUtility();
    expect(dateTimeUtility.getTime('2018-03-05T08:10:00+00:00')).toEqual('08:10');
  });
});
