import { vehicleChecksReducer } from '../vehicle-checks.reducer';
import {
  ShowMeQuestionSelected,
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
} from '../vehicle-checks.actions';
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

  it('it should set the show me question details', () => {
    const newQuestionPayload = {
      showMeQuestionCode: 'S1',
      showMeQuestionDescription: 'desc',
      showMeQuestionShortName: 'name',
    };

    const result = vehicleChecksReducer({}, new ShowMeQuestionSelected(newQuestionPayload));
    expect(result.showMeQuestionCode).toBe('S1');
    expect(result.showMeQuestionDescription).toBe('desc');
  });

  it('it should update the show me question details', () => {
    const newQuestionPayload = {
      showMeQuestionCode: 'S1',
      showMeQuestionDescription: 'desc',
      showMeQuestionShortName: 'name',
    };

    const oldState: VehicleChecks = {
      showMeQuestionCode: 'S2',
      showMeQuestionDescription: 'desc2',
    };

    const result = vehicleChecksReducer(oldState, new ShowMeQuestionSelected(newQuestionPayload));
    expect(result.showMeQuestionCode).toBe('S1');
    expect(result.showMeQuestionDescription).toBe('desc');
  });
});
