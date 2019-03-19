import { candidateReducer } from '../candidate.reducer';
import { TestOutcomeStartTest } from '../../../../pages/journal/components/test-outcome/test-outcome.actions';
import { Mock } from 'typemoq';
import { TestSlot, Candidate, Booking } from '../../../../shared/models/DJournal';

describe('candidate reducer', () => {
  it('should return the candidate from a start test action', () => {
    const moqSlot = Mock.ofType<TestSlot>();
    const moqBooking = Mock.ofType<Booking>();
    const moqCandidate = Mock.ofType<Candidate>();
    moqBooking.setup((x: Booking) => x.candidate).returns(() => moqCandidate.object);
    moqSlot.setup((x: TestSlot) => x.booking).returns(() => moqBooking.object);

    const result = candidateReducer(null, new TestOutcomeStartTest(moqSlot.object));

    expect(result).toBe(moqCandidate.object);
  });
  it('should not error if there is no booking in the slot', () => {
    const moqSlot = Mock.ofType<TestSlot>();

    const result = candidateReducer(null, new TestOutcomeStartTest(moqSlot.object));

    expect(result).toBeNull();
  });
  it('should not error if there is a booking with no candidate', () => {
    const moqSlot = Mock.ofType<TestSlot>();
    const moqBooking = Mock.ofType<Booking>();
    moqSlot.setup((x: TestSlot) => x.booking).returns(() => moqBooking.object);

    const result = candidateReducer(null, new TestOutcomeStartTest(moqSlot.object));

    expect(result).toBe(null);
  });
});
