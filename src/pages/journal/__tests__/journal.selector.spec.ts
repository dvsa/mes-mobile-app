import { JournalModel } from '../journal.model';
import { getTestSlots, getLastRefreshed, getIsLoading, getError } from '../journal.selector';
import { MesError } from '../../../common/mes-error.model';

describe('JournalSelector', () => {

  const state: JournalModel = {
    isLoading: true,
    lastRefreshed: new Date(0),
    data: {},
    slots: [
      {
        hasSlotChanged: false,
        slotData: {}
      }
    ],
    error: {
      message: 'something failed',
      status: 404,
      statusText: 'HTTP 404'
    }   
  }

  describe('getIsLoading', () => {
    it('should fetch the loading status from the state', () => {
      expect(getIsLoading(state)).toBeTruthy();
    });
  });

  describe('getTestSlots', () => {
    it('should select the test slots from the state', () => {
      const selectedSlots = getTestSlots(state);
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

  describe('getError', () => {
    it('should select the MesError from the state', () => {
      const error: MesError = getError(state);
      expect(error.status).toBe(404);
    });
  });
});
