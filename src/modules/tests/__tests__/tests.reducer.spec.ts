import { testsReducer } from '../tests.reducer';
import * as candidateReducer from '../journal-data/candidate/candidate.reducer';
import * as preTestDeclarationsReducer from '../pre-test-declarations/pre-test-declarations.reducer';
import { PreTestDeclarations, VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from '../tests.model';
import * as testsActions from './../tests.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { testReportPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { TestCategory } from '../../../shared/models/test-category';

describe('testsReducer', () => {
  const newCandidate = { candidate: { candidateId: 456 } };
  const preTestDeclarations: PreTestDeclarations = preTestDeclarationsReducer.initialState;

  beforeEach(() => {
    spyOn(candidateReducer, 'candidateReducer').and.returnValue(newCandidate);
    spyOn(preTestDeclarationsReducer, 'preTestDeclarationsReducer').and.returnValue(preTestDeclarations);
  });

  it('use the payload of a test started action to setup state for a new test', () => {
    const state = {
      currentTest: { slotId: null },
      startedTests: {},
      testStatus: {},
    };
    const slotId = 123;
    const action = new testsActions.StartTest(slotId, TestCategory.B);

    const output = testsReducer(state, action);

    expect(output.currentTest.slotId).toBe('123');
  });

  it('should use the payload of a start test report practice test action to setup state for a new test', () => {
    const state = {
      currentTest: { slotId: null },
      startedTests: {},
      testStatus: {},
    };
    const slotId = testReportPracticeSlotId;
    const action = new testsActions.StartTestReportPracticeTest(slotId);

    const output = testsReducer(state, action);

    expect(output.currentTest.slotId).toBe(testReportPracticeSlotId);
  });

  it('should reset the state when a test report practice test is started and not affect other tests', () => {
    const state: TestsModel = {
      currentTest: { slotId: testReportPracticeSlotId },
      startedTests: {
        1: {
          testData: {
            dangerousFaults: {},
            drivingFaults: {
              clearance: 1,
            },
            eyesightTest: {},
            manoeuvres: {},
            seriousFaults: {
              signalsTimed: true,
            },
            testRequirements: {},
            ETA: {},
            eco: {},
            controlledStop: {},
            vehicleChecks: {
              tellMeQuestion: {
                outcome: 'DF',
              },
              showMeQuestion: {
                outcome: 'S',
              },
            },
          },
          version: '0.0.1',
          category: '',
          journalData: null,
          activityCode: null,
          rekey: false,
          changeMarker: false,
          examinerBooked: 1,
          examinerConducted: 1,
          examinerKeyed: 1,
        },
        [testReportPracticeSlotId]: {
          testData: {
            dangerousFaults: {},
            drivingFaults: {
              moveOffSafety: 1,
            },
            manoeuvres: {},
            seriousFaults: {
              positioningNormalDriving: true,
            },
            testRequirements: {},
            ETA: {},
            eco: {},
            controlledStop: {},
            vehicleChecks: {
              tellMeQuestion: {
                outcome: 'DF',
              },
              showMeQuestion: {},
            },
          },
          version: '0.0.1',
          category: '',
          journalData: null,
          activityCode: null,
          rekey: false,
          changeMarker: false,
          examinerBooked: 1,
          examinerConducted: 1,
          examinerKeyed: 1,
        },
      },
      testStatus: {},
    };
    const slotId = testReportPracticeSlotId;
    const action = new testsActions.StartTestReportPracticeTest(slotId);

    const output = testsReducer(state, { ...action, category: 'B' });

    expect(output.startedTests[testReportPracticeSlotId].testData.seriousFaults.positioningNormalDriving)
      .toBeUndefined();
    expect(output.startedTests[testReportPracticeSlotId].testData.drivingFaults.moveOffSafety)
      .toBeUndefined();
    expect(
      (output.startedTests[testReportPracticeSlotId].testData.vehicleChecks as VehicleChecks).tellMeQuestion.outcome)
      .toBeUndefined();

    expect(output.startedTests[1].testData.seriousFaults.signalsTimed).toEqual(true);
    expect(output.startedTests[1].testData.drivingFaults.clearance).toEqual(1);
    expect((output.startedTests[1].testData.vehicleChecks as VehicleChecks).tellMeQuestion.outcome)
      .toEqual(CompetencyOutcome.DF);
    expect((output.startedTests[1].testData.vehicleChecks as VehicleChecks).showMeQuestion.outcome)
      .toEqual(CompetencyOutcome.S);
  });

  it('should ensure that all slot ids for test report practice tests are test_report_practice ', () => {
    const state = {
      currentTest: { slotId: null },
      startedTests: {},
      testStatus: {},
    };
    const slotId = '123';
    const action = new testsActions.StartTestReportPracticeTest(slotId);

    const output = testsReducer(state, action);

    expect(output.currentTest.slotId).toBe(testReportPracticeSlotId);
  });

  it('should derive the sub-states from sub-reducers', () => {
    const state: TestsModel = {
      currentTest: { slotId: null },
      startedTests: {},
      testStatus: {},
    };

    const result = testsReducer(state, new testsActions.StartTest(123, TestCategory.B));

    expect(candidateReducer.candidateReducer).toHaveBeenCalled();
    expect(preTestDeclarationsReducer.preTestDeclarationsReducer).toHaveBeenCalled();
    expect(result.startedTests['123'].journalData.candidate).toBe(newCandidate);
    expect(result.startedTests['123'].preTestDeclarations).toBe(preTestDeclarations);
  });

  it('should assign the slot ID as the current test when a test is activated', () => {
    const state: TestsModel = {
      currentTest: { slotId: '123' },
      startedTests: {},
      testStatus: {},
    };

    const result = testsReducer(state, new testsActions.ActivateTest(456, TestCategory.B));

    expect(result.currentTest.slotId).toBe('456');
  });

});
