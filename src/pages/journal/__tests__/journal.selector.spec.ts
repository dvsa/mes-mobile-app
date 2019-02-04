import { JournalModel } from '../journal.model';
import { getSlotsOnSelectedDate, getLastRefreshed, getIsLoading, getError, getLastRefreshedTime, isToday, canNavigateToNextDay, canNavigateToPreviousDay } from '../journal.selector';
import { MesError } from '../../../common/mes-error.model';
import * as moment from 'moment';

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
      const selectedSlots = getSlotsOnSelectedDate(state);
      expect(selectedSlots.length).toBe(1);
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

  describe('isToday', () => {
    it('should return true if its today', () => {
      const result = isToday(moment().format('YYYY-MM-DD'));
      expect(result).toBe(true);
    });

    it('should return false if its not today', () => {
      const result = isToday('2019-01-28');
      expect(result).toBe(false);
    });
  });

  describe('canNavigateToNextDay', () => {
    it('should return true if there are any next days', () => {
      const journal: JournalModel = {
        isLoading: true,
        lastRefreshed: new Date(0),
        slots: {
          '2019-01-29': [
            {
              hasSlotChanged: false,
              slotData: {}
            },
          ],
          '2019-01-30': [
            {
              hasSlotChanged: false,
              slotData: {}
            },
          ],
        },
        selectedDate: '2019-01-29',
      };

      const result = canNavigateToNextDay(journal);

      expect(result).toBe(true);
    });
    
    it('should return false if there are no next days', () => {
      const journal: JournalModel = {
        isLoading: true,
        lastRefreshed: new Date(0),
        slots: {
          '2019-01-29': [
            {
              hasSlotChanged: false,
              slotData: {}
            },
          ],
        },
        selectedDate: '2019-01-29',
      };

      const result = canNavigateToNextDay(journal);

      expect(result).toBe(false);
    });
  });

  describe('canNavigateToPreviousDay', () => {
    it('should return false if selected day is today', () => {
      const journal: JournalModel = {
        isLoading: true,
        lastRefreshed: new Date(0),
        slots: {
          [moment().format('YYYY-MM-DD')]: [
            {
              hasSlotChanged: false,
              slotData: {}
            },
          ],
        },
        selectedDate: moment().format('YYYY-MM-DD'),
      };

      const result = canNavigateToPreviousDay(journal);

      expect(result).toBe(false);
    });

    it('should return true if selected day is not today and we have days to go to', () => {
      const journal: JournalModel = {
        isLoading: true,
        lastRefreshed: new Date(0),
        slots: {
          [moment().format('YYYY-MM-DD')]: [
            {
              hasSlotChanged: false,
              slotData: {}
            },
          ],
          [moment().add(1, 'day').format('YYYY-MM-DD')]: [
            {
              hasSlotChanged: false,
              slotData: {}
            },
          ],
        },
        selectedDate: moment().add(1, 'day').format('YYYY-MM-DD'),
      };

      const result = canNavigateToPreviousDay(journal);

      expect(result).toBe(true);
    });
  })
});
