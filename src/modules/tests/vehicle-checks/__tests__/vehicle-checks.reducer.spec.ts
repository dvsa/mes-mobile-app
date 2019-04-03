import { vehicleChecksReducer } from '../vehicle-checks.reducer';
import { TellMeQuestionSelected, TellMeQuestionCorrect, TellMeQuestionDrivingFault } from '../vehicle-checks.actions';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

describe('vehicle checks reducer', () => {
  it('it should set the question details and reset outcome when a tell me question is selected', () => {
    const newQuestionPayload = {
      tellMeQuestionCode: 'T1',
      tellMeQuestionDescription: 'desc',
      tellMeQuestionShortName: 'name',
    };
    const oldState: VehicleChecks = {
      tellMeQuestionCode: 'T2',
      tellMeQuestionDescription: 'desc2',
      tellMeQuestionOutcome: 'P',
    };
    const result = vehicleChecksReducer(oldState, new TellMeQuestionSelected(newQuestionPayload));
    expect(result.tellMeQuestionCode).toBe('T1');
    expect(result.tellMeQuestionDescription).toBe('desc');
    expect(result.tellMeQuestionOutcome).toBeUndefined();
  });

  it('should mark tell me question as pass when the action is received', () => {
    const result = vehicleChecksReducer({}, new TellMeQuestionCorrect());
    expect(result.tellMeQuestionOutcome).toBe('P');
  });

  it('should mark tell me question as driving fault when the action is received', () => {
    const result = vehicleChecksReducer({}, new TellMeQuestionDrivingFault());
    expect(result.tellMeQuestionOutcome).toBe('DF');
  });
});
