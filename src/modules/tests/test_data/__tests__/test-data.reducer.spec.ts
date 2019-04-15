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
} from '../test-data.actions';
import { Competencies, LegalRequirements, ExaminerActions } from '../test-data.constants';
import { TestData } from '@dvsa/mes-test-schema/categories/B';
import {
  ManoeuvreTypes,
} from '../../../../pages/test-report/components/manoeuvres-popover/manoeuvres-popover.constants';

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
        new RecordManoeuvresSelection(ManoeuvreTypes.selectedReverseParkRoad),
      );
      expect(result.manoeuvres[ManoeuvreTypes.selectedReverseParkRoad]).toEqual(true);
    });
    it('should replace current with selected manoeuvre', () => {
      initialState.manoeuvres = { selectedReverseParkCarpark: true };
      const result = testDataReducer(
        initialState,
        new RecordManoeuvresSelection(ManoeuvreTypes.selectedReverseParkRoad),
      );
      expect(result.manoeuvres[ManoeuvreTypes.selectedReverseParkRoad]).toEqual(true);
      expect(result.manoeuvres.selectedReverseParkCarpark).toBeUndefined();
    });
    it('should keep any controlled stop data when changing selected manoeuvre', () => {
      initialState.manoeuvres = {
        selectedReverseParkCarpark: true,
        selectedControlledStop: true,
        outcomeControlledStop: 'S',
      };
      const result = testDataReducer(
        initialState,
        new RecordManoeuvresSelection(ManoeuvreTypes.selectedReverseParkRoad),
      );
      expect(result.manoeuvres[ManoeuvreTypes.selectedReverseParkRoad]).toEqual(true);
      expect(result.manoeuvres.selectedReverseParkCarpark).toBeUndefined();
      expect(result.manoeuvres.selectedControlledStop).toBeTruthy();
      expect(result.manoeuvres.outcomeControlledStop).toBe('S');
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

  describe('TOGGLE_CONTROL_ECO', () => {
    it('should toggle control eco fault (true when dispatched first time)', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new ToggleControlEco());
      expect(result.eco.adviceGivenControl).toBeTruthy();
    });

    it('should toggle control eco fault (false when dispatched second time)', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new ToggleControlEco());
      const result = testDataReducer(modifiedState, new ToggleControlEco());
      expect(result.eco.adviceGivenControl).toBeFalsy();
    });
  });

  describe('TOGGLE_PLANNING_ECO', () => {
    it('should toggle the planning eco fault (true when dispatched first time)', () => {
      const state: TestData = {
        eco: {},
      };
      const result = testDataReducer(state, new TogglePlanningEco());
      expect(result.eco.adviceGivenPlanning).toBeTruthy();
    });

    it('should toggle planning eco fault (false when dispatched second time)', () => {
      const state: TestData = {
        eco: {},
      };
      const modifiedState = testDataReducer(state, new TogglePlanningEco());
      const result = testDataReducer(modifiedState, new TogglePlanningEco());

      expect(result.eco.adviceGivenPlanning).toBeFalsy();

    });
  });
  describe('TOGGLE_CONTROLLED_STOP', () => {
    it('should toggle the controlled stop (true when dispatched first time)', () => {
      const state: TestData = {
        manoeuvres: {},
      };
      const result = testDataReducer(state, new ToggleControlledStop());
      expect(result.manoeuvres.selectedControlledStop).toBeTruthy();
    });

    it('should toggle the controlled stop (false when dispatched second time)', () => {
      const state: TestData = {
        manoeuvres: {},
      };
      const modifiedState = testDataReducer(state, new ToggleControlledStop());
      const result = testDataReducer(modifiedState, new ToggleControlledStop());

      expect(result.manoeuvres.selectedControlledStop).toBeFalsy();

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
});
