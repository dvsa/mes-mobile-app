import { testDataReducer, initialState } from '../test-data.reducer';
import {
  AddDrivingFault,
  RemoveDrivingFault,
} from '../driving-faults/driving-faults.actions';
import {
  AddSeriousFault,
  RemoveSeriousFault,
} from '../serious-faults/serious-faults.actions';
import {
  RecordManoeuvresSelection,
  AddManoeuvreDrivingFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
} from '../manoeuvres/manoeuvres.actions';
import {
  ToggleEco,
  ToggleControlEco,
  TogglePlanningEco,
} from '../eco/eco.actions';
import {
  ToggleLegalRequirement,
} from '../test-requirements/test-requirements.actions';
import {
  ToggleETA,
} from '../eta/eta.actions';
import {
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
  ShowMeQuestionSelected,
} from '../vehicle-checks/vehicle-checks.actions';
import {
  EyesightTestPassed,
  EyesightTestFailed,
  EyesightTestReset,
  EyesightTestAddComment,
} from '../eyesight-test/eyesight-test.actions';
import {
  Competencies,
  LegalRequirements,
  ExaminerActions,
  ManoeuvreCompetencies,
  ManoeuvreTypes,
} from '../test-data.constants';
import { TestData } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { TellMeQuestion } from '../../../../providers/question/tell-me-question.model';
import { ShowMeQuestion } from '../../../../providers/question/show-me-question.model';

describe('TestDataReducer reducer', () => {
  describe('ADD_DRIVING_FAULT', () => {
    it('should add a driving fault when no driving faults exist', () => {
      const result = testDataReducer(initialState, new AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 1,
      }));
      expect(result.drivingFaults.controlsGears).toBe(1);
    });
    it('should update a driving fault when it already exists', () => {
      const state: TestData = {
        drivingFaults: {
          controlsGears: 1,
        },
      };

      const result = testDataReducer(state, new AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 2,
      }));
      expect(result.drivingFaults.controlsGears).toBe(2);
    });
    it('should not remove an existing driving fault when a new one is added', () => {
      const state: TestData = {
        drivingFaults: {
          controlsParkingBrake: 1,
        },
      };

      const result = testDataReducer(state, new AddDrivingFault({
        competency: Competencies.controlsGears,
        newFaultCount: 1,
      }));
      expect(result.drivingFaults.controlsGears).toBe(1);
      expect(result.drivingFaults.controlsParkingBrake).toBe(1);
    });
  });

  describe('ADD SERIOUS FAULT', () => {
    it('should add a serious fault when none exist', () => {
      const result = testDataReducer(initialState, new AddSeriousFault(Competencies.followingDistance));
      expect(result.seriousFaults.followingDistance).toEqual(true);
    });
    it('should update serious fault which already exists', () => {
      const state: TestData = {
        seriousFaults: {
          followingDistance: true,
        },
      };

      const result = testDataReducer(state, new AddSeriousFault(Competencies.followingDistance));
      expect(result.seriousFaults.followingDistance).toEqual(true);
    });
    it('should not remove an existing serious fault when a new one is added', () => {
      const state: TestData = {
        seriousFaults: {
          followingDistance: true,
        },
      };

      const result = testDataReducer(state, new AddSeriousFault(Competencies.judgementCrossing));
      expect(result.seriousFaults.followingDistance).toEqual(true);
      expect(result.seriousFaults.judgementCrossing).toEqual(true);
    });
  });

  describe('manoeuvres', () => {
    it('should add selected manoeuvre', () => {
      const result = testDataReducer(
        initialState,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
      );
      expect(result.manoeuvres[ManoeuvreTypes.reverseParkRoad]).toEqual({ selected: true });
    });
    it('should replace current with selected manoeuvre', () => {
      const state: TestData = {
        ...initialState,
        manoeuvres: {
          reverseParkCarpark: {
            selected: true,
          },
        },
      };
      const result = testDataReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
      );
      expect(result.manoeuvres[ManoeuvreTypes.reverseParkRoad]).toEqual({ selected: true });
      expect(result.manoeuvres.reverseParkCarpark).toBeUndefined();
    });

    it('should wipe any outcome data from other manoeuvres when changing selected manoeuvre', () => {
      const state: TestData = {
        ...initialState,
        manoeuvres: {
          reverseParkCarpark: {
            selected: true,
            controlFault: 'S',
          },
        },
      };
      const result = testDataReducer(
        state,
        new RecordManoeuvresSelection(ManoeuvreTypes.reverseParkRoad),
      );
      expect(result.manoeuvres[ManoeuvreTypes.reverseParkRoad]).toBeDefined();
      expect(result.manoeuvres[ManoeuvreTypes.reverseParkRoad].selected).toEqual(true);
      expect(result.manoeuvres[ManoeuvreTypes.reverseParkCarpark]).toBeUndefined();
    });
    describe('ADD_MANOEUVRE_DRIVING_FAULT', () => {
      it('should add a "DF" outcome to the selected manoeuvre', () => {
        // Arrange
        const state: TestData = {
          ...initialState,
          manoeuvres: {
            reverseParkRoad: { selected: true },
          },
        };
        // Act
        const result = testDataReducer(
          state,
          new AddManoeuvreDrivingFault({
            manoeuvre: ManoeuvreTypes.reverseParkRoad,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
        // Assert
        expect(result.manoeuvres.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.DF);
      });
    });
    describe('ADD_MANOEUVRE_SERIOUS_FAULT', () => {
      it('should add a "S" outcome to the selected manoeuvre', () => {
        // Arrange
        const state: TestData = {
          ...initialState,
          manoeuvres: {
            reverseParkRoad: { selected: true },
          },
        };
        // Act
        const result = testDataReducer(
          state,
          new AddManoeuvreSeriousFault({
            manoeuvre: ManoeuvreTypes.reverseParkRoad,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
        // Assert
        expect(result.manoeuvres.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.S);
      });
    });
    describe('ADD_MANOEUVRE_DANGEROUS_FAULT', () => {
      it('should add a "D" outcome to the selected manoeuvre', () => {
        // Arrange
        const state: TestData = {
          ...initialState,
          manoeuvres: {
            reverseParkRoad: { selected: true },
          },
        };
        // Act
        const result = testDataReducer(
          state,
          new AddManoeuvreDangerousFault({
            manoeuvre: ManoeuvreTypes.reverseParkRoad,
            competency: ManoeuvreCompetencies.controlFault,
          }),
        );
        // Assert
        expect(result.manoeuvres.reverseParkRoad.controlFault).toEqual(CompetencyOutcome.D);
      });
    });
  });

  describe('TOGGLE NORMAL START 1', () => {
    it('should toggle normal start 1 to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));

      expect(result.testRequirements.normalStart1).toEqual(true);
    });

    it('should toggle normal start 1 to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.normalStart1));

      expect(result.testRequirements.normalStart1).toEqual(false);
    });
  });

  describe('TOGGLE NORMAL START 2', () => {
    it('should toggle normal start 2 to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart2));

      expect(result.testRequirements.normalStart2).toEqual(true);
    });

    it('should toggle normal start 2 to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart2));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.normalStart2));

      expect(result.testRequirements.normalStart2).toEqual(false);
    });
  });

  describe('TOGGLE ANGLED START', () => {
    it('should toggle angeld start to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.angledStart));

      expect(result.testRequirements.angledStart).toEqual(true);
    });

    it('should toggle angled start to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.angledStart));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.angledStart));

      expect(result.testRequirements.angledStart).toEqual(false);
    });
  });

  describe('TOGGLE HILL START', () => {
    it('should toggle hill start to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.hillStart));

      expect(result.testRequirements.hillStart).toEqual(true);
    });

    it('should toggle hill start to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.hillStart));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.hillStart));

      expect(result.testRequirements.hillStart).toEqual(false);

    });
  });

  describe('TOGGLE_ECO', () => {
    it('should toggle eco (true when dispatched first time)', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new ToggleEco());
      expect(result.eco.completed).toEqual(true);
    });

    it('should toggle eco (false when dispatched second time)', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new ToggleEco());
      const result = testDataReducer(modifiedState, new ToggleEco());
      expect(result.eco.completed).toEqual(false);
    });
  });
  describe('TOGGLE_CONTROL_ECO', () => {
    it('should toggle control eco fault (true when dispatched first time)', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new ToggleControlEco());
      expect(result.eco.adviceGivenControl).toEqual(true);
    });

    it('should toggle control eco fault (false when dispatched second time)', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new ToggleControlEco());
      const result = testDataReducer(modifiedState, new ToggleControlEco());
      expect(result.eco.adviceGivenControl).toEqual(false);
    });
  });

  describe('TOGGLE_PLANNING_ECO', () => {
    it('should toggle the planning eco fault (true when dispatched first time)', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new TogglePlanningEco());
      expect(result.eco.adviceGivenPlanning).toEqual(true);
    });

    it('should toggle planning eco fault (false when dispatched second time)', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new TogglePlanningEco());
      const result = testDataReducer(modifiedState, new TogglePlanningEco());
      expect(result.eco.adviceGivenPlanning).toEqual(false);
    });
  });

  describe('TOGGLE ETA VERBAL', () => {
    it('should toggle ETA verbal to true when dispatched first time', () => {
      const state: TestData = {
        ETA: {},
      };

      const result = testDataReducer(state, new ToggleETA(ExaminerActions.verbal));

      expect(result.ETA.verbal).toEqual(true);
    });

    it('should toggle ETA verbal to false when dispatched second time', () => {
      const state: TestData = {
        ETA: {},
      };

      const modifiedState = testDataReducer(state, new ToggleETA(ExaminerActions.verbal));
      const result = testDataReducer(modifiedState, new ToggleETA(ExaminerActions.verbal));

      expect(result.ETA.verbal).toEqual(false);
    });
  });

  describe('TOGGLE ETA PHYSICAL', () => {
    it('should toggle ETA physical to true when dispatched first time', () => {
      const state: TestData = {
        ETA: {},
      };

      const result = testDataReducer(state, new ToggleETA(ExaminerActions.physical));

      expect(result.ETA.physical).toBe(true);
    });

    it('should toggle ETA physical to false when dispatched second time', () => {
      const state: TestData = {
        ETA: {},
      };

      const modifiedState = testDataReducer(state, new ToggleETA(ExaminerActions.physical));
      const result = testDataReducer(modifiedState, new ToggleETA(ExaminerActions.physical));

      expect(result.ETA.physical).toEqual(false);
    });
  });

  describe(('REMOVE_DRIVING_FAULT'), () => {
    it('should remove a fault if the fault count is higher then 0', () => {
      const state: TestData = {
        drivingFaults: {
          awarenessPlanning: 2,
        },
      };

      const result = testDataReducer(state, new RemoveDrivingFault({
        competency: Competencies.awarenessPlanning,
        newFaultCount: 1,
      }));

      expect(result.drivingFaults.awarenessPlanning).toBe(1);
    });

    it('should remove the competency from the state if the fault count is 0', () => {
      const state: TestData = {
        drivingFaults: {
          awarenessPlanning: 1,
        },
      };

      const result = testDataReducer(state, new RemoveDrivingFault({
        competency: Competencies.awarenessPlanning,
        newFaultCount: 0,
      }));

      expect(result.drivingFaults.awarenessPlanning).toBeUndefined();
    });
  });

  describe(('REMOVE_SERIOUS_FAULT'), () => {
    it('should remove the competency from the state when a fault is removed', () => {
      const state: TestData = {
        seriousFaults: {
          controlsGears: true,
        },
      };

      const result = testDataReducer(state, new RemoveSeriousFault(Competencies.controlsGears));

      expect(result.seriousFaults.controlsGears).toBeUndefined();
    });
  });

  describe('VehicleChecks', () => {
    it('should set the question details and reset outcome when a tell me question is selected', () => {
      const newQuestionPayload: TellMeQuestion = {
        code: 'T1',
        description: 'desc',
        shortName: 'name',
      };
      const oldState: TestData = {
        vehicleChecks: {
          tellMeQuestion: {
            code: 'T2',
            description: 'desc2',
            outcome: CompetencyOutcome.P,
          },
        },
      };
      const result = testDataReducer(oldState, new TellMeQuestionSelected(newQuestionPayload));
      expect(result.vehicleChecks.tellMeQuestion.code).toBe('T1');
      expect(result.vehicleChecks.tellMeQuestion.description).toBe('name');
      expect(result.vehicleChecks.tellMeQuestion.outcome).toBeUndefined();
    });

    it('should mark tell me question as pass when the action is received', () => {
      const result = testDataReducer({ vehicleChecks: {} }, new TellMeQuestionCorrect());
      expect(result.vehicleChecks.tellMeQuestion.outcome).toBe(CompetencyOutcome.P);
    });

    it('should mark tell me question as driving fault when the action is received', () => {
      const result = testDataReducer({ vehicleChecks: {} }, new TellMeQuestionDrivingFault());
      expect(result.vehicleChecks.tellMeQuestion.outcome).toBe('DF');
    });

    it('should set the show me question details', () => {
      const newQuestionPayload: ShowMeQuestion = {
        code: 'S1',
        description: 'desc',
        shortName: 'name',
      };

      const result = testDataReducer({
        vehicleChecks: {
          showMeQuestion: {},
        },
      }, new ShowMeQuestionSelected(newQuestionPayload));
      expect(result.vehicleChecks.showMeQuestion.code).toBe('S1');
      expect(result.vehicleChecks.showMeQuestion.description).toBe('name');
    });

    it('should update the show me question details', () => {
      const newQuestionPayload: ShowMeQuestion = {
        code: 'S1',
        description: 'desc',
        shortName: 'name',
      };

      const oldState: TestData = {
        vehicleChecks: {
          showMeQuestion: {
            outcome: 'S',
            code: 'S2',
            description: 'desc2',
          },
        },
      };

      const result = testDataReducer(oldState, new ShowMeQuestionSelected(newQuestionPayload));
      expect(result.vehicleChecks.showMeQuestion.code).toBe('S1');
      expect(result.vehicleChecks.showMeQuestion.outcome).toBe('S');
      expect(result.vehicleChecks.showMeQuestion.description).toBe('name');
    });
  });

  describe('EYESIGHT_TEST_PASSED', () => {
    it('updates the complete status to true', () => {
      const state: TestData = {
        eyesightTest: {},
      };
      const result = testDataReducer(state, new EyesightTestPassed());
      expect(result.eyesightTest.complete).toEqual(true);
    });

    it('removes an eyesight test serious fault', () => {
      const state: TestData = {
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      const result = testDataReducer(state, new EyesightTestPassed());
      expect(result.eyesightTest.complete).toEqual(true);
      expect(result.eyesightTest.seriousFault).toEqual(false);
    });
  });

  describe('EYESIGHT_TEST_FAILED', () => {
    it('updates the eyesight status to failed', () => {
      const state: TestData = {
        eyesightTest: {
          complete: false,
        },
      };
      const result = testDataReducer(state, new EyesightTestFailed());
      expect(result.eyesightTest.complete).toBe(true);
      expect(result.eyesightTest.seriousFault).toBe(true);
    });
  });

  describe('EYESIGHT_TEST_RESET', () => {
    it('updates the complete status to false', () => {
      const state: TestData = {
        eyesightTest: {
          complete: true,
        },
      };
      const result = testDataReducer(state, new EyesightTestReset());
      expect(result.eyesightTest.complete).toBe(false);
    });

    it('removes an eyesight test serious fault', () => {
      const state: TestData = {
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      const result = testDataReducer(state, new EyesightTestReset());
      expect(result.eyesightTest.complete).toBe(false);
      expect(result.eyesightTest.seriousFault).toBe(false);
    });
  });

  describe('EYESIGHT_TEST_ADD_COMMENT', () => {
    it('sets the eyesight test fault comments', () => {
      const state: TestData = {
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      const result = testDataReducer(state, new EyesightTestAddComment('Eyesight test comment'));
      expect(result.eyesightTest.faultComments).toEqual('Eyesight test comment');
    });
  });
});
