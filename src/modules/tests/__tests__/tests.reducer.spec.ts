import { testsReducer } from '../tests.reducer';
import * as journalActions from '../../../pages/journal/journal.actions';
import * as candidateReducer from '../candidate/candidate.reducer';
import * as preTestDeclarationsReducer from '../pre-test-declarations/pre-test-declarations.reducer';
import { PreTestDeclarations } from '@dvsa/mes-test-schema/categories/B';
import { TestsModel } from '../tests.model';
import * as testActions from './../tests.actions';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { testReportPracticeSlotId } from '../__mocks__/tests.mock';

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
    const action = new journalActions.StartTest(slotId);

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
    const action = new testActions.StartTestReportPracticeTest(slotId);

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
          category: '',
          id: '',
          journalData: null,
          activityCode: null,
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
          category: '',
          id: '',
          journalData: null,
          activityCode: null,
        },
      },
      testStatus: {},
    };
    const slotId = testReportPracticeSlotId;
    const action = new testActions.StartTestReportPracticeTest(slotId);

    const output = testsReducer(state, action);

    expect(output.startedTests[testReportPracticeSlotId].testData.seriousFaults.positioningNormalDriving)
      .toBeUndefined();
    expect(output.startedTests[testReportPracticeSlotId].testData.drivingFaults.moveOffSafety)
      .toBeUndefined();
    expect(output.startedTests[testReportPracticeSlotId].testData.vehicleChecks.tellMeQuestion.outcome)
      .toBeUndefined();

    expect(output.startedTests[1].testData.seriousFaults.signalsTimed).toBeTruthy();
    expect(output.startedTests[1].testData.drivingFaults.clearance).toBeTruthy();
    expect(output.startedTests[1].testData.vehicleChecks.tellMeQuestion.outcome).toEqual(CompetencyOutcome.DF);
    expect(output.startedTests[1].testData.vehicleChecks.showMeQuestion.outcome).toEqual(CompetencyOutcome.S);
  });

  it('should ensure that all slot ids for test report practice tests are test_report_practice ', () => {
    const state = {
      currentTest: { slotId: null },
      startedTests: {},
      testStatus: {},
    };
    const slotId = '123';
    const action = new testActions.StartTestReportPracticeTest(slotId);

    const output = testsReducer(state, action);

    expect(output.currentTest.slotId).toBe(testReportPracticeSlotId);
  });

  it('should derive the sub-states from sub-reducers', () => {
    const state: TestsModel = {
      currentTest: { slotId: null },
      startedTests: {},
      testStatus: {},
    };

    const result = testsReducer(state, new journalActions.StartTest(123));

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

    const result = testsReducer(state, new journalActions.ActivateTest(456));

    expect(result.currentTest.slotId).toBe('456');
  });

});
