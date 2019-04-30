import { testDataReducer, initialState } from '../test-data.reducer';
import {
  AddDrivingFault,
  AddSeriousFault,
  RecordManoeuvresSelection,
  AddDangerousFault,
  ToggleControlEco,
  TogglePlanningEco,
  ToggleControlledStop,
  ToggleLegalRequirement,
  ToggleETA,
  AddManoeuvreDrivingFault,
  RemoveDrivingFault,
  RemoveSeriousFault,
  RemoveDangerousFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
  ToggleEco,
  TellMeQuestionSelected,
  TellMeQuestionCorrect,
  TellMeQuestionDrivingFault,
  ShowMeQuestionSelected,
} from '../test-data.actions';
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
      expect(result.seriousFaults.followingDistance).toBeTruthy();
    });
    it('should update serious fault which already exists', () => {
      const state: TestData = {
        seriousFaults: {
          followingDistance: true,
        },
      };

      const result = testDataReducer(state, new AddSeriousFault(Competencies.followingDistance));
      expect(result.seriousFaults.followingDistance).toBeTruthy();
    });
    it('should not remove an existing serious fault when a new one is added', () => {
      const state: TestData = {
        seriousFaults: {
          followingDistance: true,
        },
      };

      const result = testDataReducer(state, new AddSeriousFault(Competencies.judgementCrossing));
      expect(result.seriousFaults.followingDistance).toBeTruthy();
      expect(result.seriousFaults.judgementCrossing).toBeTruthy();
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
  describe('ADD_DANGEROUS_FAULT', () => {
    it('should add a dangerous fault when none exists', () => {
      const result = testDataReducer(initialState, new AddDangerousFault(Competencies.followingDistance));
      expect(result.dangerousFaults.followingDistance).toBeTruthy();
    });

    it('should update dangerous fault which already exists', () => {
      const state: TestData = {
        dangerousFaults: {
          followingDistance: true,
        },
      };

      const result = testDataReducer(state, new AddDangerousFault(Competencies.followingDistance));
      expect(result.dangerousFaults.followingDistance).toBeTruthy();
    });

    it('should not remove an existing dangerous fault when a new one is added', () => {
      const state: TestData = {
        dangerousFaults: {
          followingDistance: true,
        },
      };

      const result = testDataReducer(state, new AddDangerousFault(Competencies.judgementCrossing));
      expect(result.dangerousFaults.followingDistance).toBeTruthy();
      expect(result.dangerousFaults.judgementCrossing).toBeTruthy();
    });
  });

  describe('TOGGLE NORMAL START 1', () => {
    it('should toggle normal start 1 to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));

      expect(result.testRequirements.normalStart1).toBeTruthy();
    });

    it('should toggle normal start 1 to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart1));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.normalStart1));

      expect(result.testRequirements.normalStart1).toBeFalsy();
    });
  });

  describe('TOGGLE NORMAL START 2', () => {
    it('should toggle normal start 2 to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart2));

      expect(result.testRequirements.normalStart2).toBeTruthy();
    });

    it('should toggle normal start 2 to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.normalStart2));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.normalStart2));

      expect(result.testRequirements.normalStart2).toBeFalsy();
    });
  });

  describe('TOGGLE ANGLED START', () => {
    it('should toggle angeld start to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.angledStart));

      expect(result.testRequirements.angledStart).toBeTruthy();
    });

    it('should toggle angled start to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.angledStart));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.angledStart));

      expect(result.testRequirements.angledStart).toBeFalsy();
    });
  });

  describe('TOGGLE HILL START', () => {
    it('should toggle hill start to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.hillStart));

      expect(result.testRequirements.hillStart).toBeTruthy();
    });

    it('should toggle hill start to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleLegalRequirement(LegalRequirements.hillStart));
      const result = testDataReducer(modifiedState, new ToggleLegalRequirement(LegalRequirements.hillStart));

      expect(result.testRequirements.hillStart).toBeFalsy();

    });
  });

  describe('TOGGLE_ECO', () => {
    it('should toggle eco (true when dispatched first time)', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new ToggleEco());
      expect(result.eco.completed).toBeTruthy();
    });

    it('should toggle eco (false when dispatched second time)', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new ToggleEco());
      const result = testDataReducer(modifiedState, new ToggleEco());
      expect(result.eco.completed).toBeFalsy();
    });
  });
  describe('TOGGLE_CONTROL_ECO', () => {
    it('should toggle control eco fault (true when dispatched first time) and set eco completed', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new ToggleControlEco());
      expect(result.eco.adviceGivenControl).toBeTruthy();
      expect(result.eco.completed).toBeTruthy();
    });

    it('should toggle control eco fault (false when dispatched second time) and leave eco as completed', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new ToggleControlEco());
      const result = testDataReducer(modifiedState, new ToggleControlEco());
      expect(result.eco.adviceGivenControl).toBeFalsy();
      expect(result.eco.completed).toBeTruthy();
    });
  });

  describe('TOGGLE_PLANNING_ECO', () => {
    it('should toggle the planning eco fault (true when dispatched first time) and set eco completed', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new TogglePlanningEco());
      expect(result.eco.adviceGivenPlanning).toBeTruthy();
      expect(result.eco.completed).toBeTruthy();
    });

    it('should toggle planning eco fault (false when dispatched second time) and leave eco as completed', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new TogglePlanningEco());
      const result = testDataReducer(modifiedState, new TogglePlanningEco());
      expect(result.eco.adviceGivenPlanning).toBeFalsy();
      expect(result.eco.completed).toBeTruthy();
    });
  });
  describe('TOGGLE_CONTROLLED_STOP', () => {
    it('should toggle the controlled stop (true when dispatched first time)', () => {
      const state: TestData = {
        controlledStop: {},
      };
      const result = testDataReducer(state, new ToggleControlledStop());
      expect(result.controlledStop.selected).toBeTruthy();
    });

    it('should remove the controlled stop property when dispatched second time', () => {
      const state: TestData = {
        controlledStop: {},
      };
      const modifiedState = testDataReducer(state, new ToggleControlledStop());
      const result = testDataReducer(modifiedState, new ToggleControlledStop());

      expect(result.controlledStop.selected).toBe(false);

    });
  });

  describe('TOGGLE ETA VERBAL', () => {
    it('should toggle ETA verbal to true when dispatched first time', () => {
      const state: TestData = {
        ETA: {},
      };

      const result = testDataReducer(state, new ToggleETA(ExaminerActions.verbal));

      expect(result.ETA.verbal).toBeTruthy();
    });

    it('should toggle ETA verbal to false when dispatched second time', () => {
      const state: TestData = {
        ETA: {},
      };

      const modifiedState = testDataReducer(state, new ToggleETA(ExaminerActions.verbal));
      const result = testDataReducer(modifiedState, new ToggleETA(ExaminerActions.verbal));

      expect(result.ETA.verbal).toBeFalsy();
    });
  });

  describe('TOGGLE ETA PHYSICAL', () => {
    it('should toggle ETA physical to true when dispatched first time', () => {
      const state: TestData = {
        ETA: {},
      };

      const result = testDataReducer(state, new ToggleETA(ExaminerActions.physical));

      expect(result.ETA.physical).toBeTruthy();
    });

    it('should toggle ETA physical to false when dispatched second time', () => {
      const state: TestData = {
        ETA: {},
      };

      const modifiedState = testDataReducer(state, new ToggleETA(ExaminerActions.physical));
      const result = testDataReducer(modifiedState, new ToggleETA(ExaminerActions.physical));

      expect(result.ETA.physical).toBeFalsy();
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

  describe(('REMOVE_DANGEROUS_FAULT'), () => {
    it('should remove the competency from the state when a fault is removed', () => {
      const state: TestData = {
        dangerousFaults: {
          controlsGears: true,
        },
      };

      const result = testDataReducer(state, new RemoveDangerousFault(Competencies.controlsGears));

      expect(result.dangerousFaults.controlsGears).toBeUndefined();
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
      expect(result.vehicleChecks.tellMeQuestion.description).toBe('desc');
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

      const result = testDataReducer({}, new ShowMeQuestionSelected(newQuestionPayload));
      expect(result.vehicleChecks.showMeQuestion.code).toBe('S1');
      expect(result.vehicleChecks.showMeQuestion.description).toBe('desc');
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
            code: 'S2',
            description: 'desc2',
          },
        },
      };

      const result = testDataReducer(oldState, new ShowMeQuestionSelected(newQuestionPayload));
      expect(result.vehicleChecks.showMeQuestion.code).toBe('S1');
      expect(result.vehicleChecks.showMeQuestion.description).toBe('desc');
    });
  });

});
