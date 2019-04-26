import { vehicleChecksReducer } from '../vehicle-checks.reducer';
import {
  ShowMeQuestionSelected,
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
} from '../vehicle-checks.actions';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { TellMeQuestion } from '../../../../providers/question/tell-me-question.model';
import { ShowMeQuestion } from '../../../../providers/question/show-me-question.model';

describe('vehicle checks reducer', () => {
  it('should set the question details and reset outcome when a tell me question is selected', () => {
    const newQuestionPayload: TellMeQuestion = {
      code: 'T1',
      description: 'desc',
      shortName: 'name',
    };
    const oldState: VehicleChecks = {
      tellMeQuestion: {
        code: 'T2',
        description: 'desc2',
        outcome: 'P',
      },
    };
    const result = vehicleChecksReducer(oldState, new TellMeQuestionSelected(newQuestionPayload));
    expect(result.tellMeQuestion.code).toBe('T1');
    expect(result.tellMeQuestion.description).toBe('desc');
    expect(result.tellMeQuestion.outcome).toBeUndefined();
  });

  it('should mark tell me question as pass when the action is received', () => {
    const result = vehicleChecksReducer({}, new TellMeQuestionCorrect());
    expect(result.tellMeQuestion.outcome).toBe('P');
  });

  it('should mark tell me question as driving fault when the action is received', () => {
    const result = vehicleChecksReducer({}, new TellMeQuestionDrivingFault());
    expect(result.tellMeQuestion.outcome).toBe('DF');
  });

  it('should set the show me question details', () => {
    const newQuestionPayload: ShowMeQuestion = {
      code: 'S1',
      description: 'desc',
      shortName: 'name',
    };

    const result = vehicleChecksReducer({}, new ShowMeQuestionSelected(newQuestionPayload));
    expect(result.showMeQuestion.code).toBe('S1');
    expect(result.showMeQuestion.description).toBe('desc');
  });

  it('should update the show me question details', () => {
    const newQuestionPayload: ShowMeQuestion = {
      code: 'S1',
      description: 'desc',
      shortName: 'name',
    };

    const oldState: VehicleChecks = {
      showMeQuestion: {
        code: 'S2',
        description: 'desc2',
      },
    };

    const result = vehicleChecksReducer(oldState, new ShowMeQuestionSelected(newQuestionPayload));
    expect(result.showMeQuestion.code).toBe('S1');
    expect(result.showMeQuestion.description).toBe('desc');
  });
});
