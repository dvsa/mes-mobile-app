import { JournalModel } from '../journal.model';
import { getSlotsOnselectedDate, getLastRefreshed, getIsLoading, getError, getLastRefreshedTime } from '../journal.selector';
import { MesError } from '../../../common/mes-error.model';

describe('JournalSelector', () => {

  const state: JournalModel = {
    isLoading: true,
    lastRefreshed: new Date(0),
    slots: {
      '2019-01-17': [
        {
          hasSlotChanged: false,
          slotData: {}
        },
      ],
    },
    error: {
      message: 'something failed',
      status: 404,
      statusText: 'HTTP 404'
    },
    selectedDate: '2019-01-17',
  };

  describe('getIsLoading', () => {
    it('should fetch the loading status from the state', () => {
      expect(getIsLoading(state)).toBeTruthy();
    });
  });

  describe('getSlots', () => {
    it('should select the test slots from the state', () => {
      const selectedSlots = getSlotsOnselectedDate(state);
      expect(selectedSlots).toHaveLength(1);
      expect(selectedSlots[0].hasSlotChanged).toBe(false);
      expect(selectedSlots[0].slotData).toBeDefined();
    });
  });

  describe('getLastRefreshed', () => {
    it('should select the last refreshed date from the state', () => {
      expect(getLastRefreshed(state).getUTCMilliseconds()).toBe(0);
    });
  });

  describe('getLastRefreshedTime', () => {
    it('should transform a nil date to the placeholder', () => {
      expect(getLastRefreshedTime(null)).toBe('--:--');
      expect(getLastRefreshedTime(undefined)).toBe('--:--');
    });
    it('should format the date to 24hr format with lowercase am/pm', () => {
      expect(getLastRefreshedTime(new Date('2019-01-16T09:24:00'))).toBe('09:24am');
      expect(getLastRefreshedTime(new Date('2019-01-16T15:45:10'))).toBe('03:45pm');
    });
  });

  describe('getError', () => {
    it('should select the MesError from the state', () => {
      const error: MesError = getError(state);
      expect(error.status).toBe(404);
    });
  });
});
