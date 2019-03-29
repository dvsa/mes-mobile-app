import { applicationReferenceReducer } from '../application-reference.reducer';
import { TestOutcomeStartTest } from '../../../../pages/journal/components/test-outcome/test-outcome.actions';
import { TestSlot } from '../../../../shared/models/DJournal';

describe('application reference reducer', () => {
  it('should return the application reference from a start test action', () => {
    const mockApplication = {
      applicationId: 1234567,
      bookingSequence: 8,
      checkDigit: 9,
    };
    const mockSlot = { booking: { application: mockApplication } };
    const result = applicationReferenceReducer(null, new TestOutcomeStartTest(mockSlot as TestSlot));

    expect(result).toEqual(mockApplication);
  });
  it('should not error if there is no booking in the slot', () => {
    const mockSlot = {};

    const result = applicationReferenceReducer(null, new TestOutcomeStartTest(mockSlot));

    expect(result).toBeNull();
  });
  it('should not error if there is a booking with no application reference', () => {
    const mockSlot = { booking : { } };

    const result = applicationReferenceReducer(null, new TestOutcomeStartTest(mockSlot));

    expect(result).toBe(null);
  });
});
