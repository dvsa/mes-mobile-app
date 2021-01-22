import { getNewTestStartTime } from '../get-new-test-start-time';

describe('getNewTestStartTime helper function', () => {

  it('should return the correct date', () => {
    const inputDate = '2021-01-19';
    const startDateTime = '2020-12-25T08:10:00';
    expect(getNewTestStartTime(inputDate, startDateTime)).toBe('2021-01-19T08:10:00');
  });

});
