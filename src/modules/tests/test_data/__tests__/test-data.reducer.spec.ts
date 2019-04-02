import { testDataReducer, initialState } from '../test-data.reducer';
import {
  AddDrivingFault,
  AddSeriousFault,
  ToggleNormalStart1,
  ToggleNormalStart2,
  ToggleAngledStart,
  ToggleHillStart,
  AddDangerousFault,
} from '../test-data.actions';
import { Competencies } from '../test-data.constants';
import { TestData } from '@dvsa/mes-test-schema/categories/B';

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

      const result = testDataReducer(state, new ToggleNormalStart1());

      expect(result.testRequirements.normalStart1).toBeTruthy();
    });

    it('should toggle normal start 1 to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleNormalStart1());
      const result = testDataReducer(modifiedState, new ToggleNormalStart1());

      expect(result.testRequirements.normalStart1).toBeFalsy();
    });
  });

  describe('TOGGLE NORMAL START 2', () => {
    it('should toggle normal start 2 to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleNormalStart2());

      expect(result.testRequirements.normalStart2).toBeTruthy();
    });

    it('should toggle normal start 2 to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleNormalStart2());
      const result = testDataReducer(modifiedState, new ToggleNormalStart2());

      expect(result.testRequirements.normalStart2).toBeFalsy();
    });
  });

  describe('TOGGLE ANGLED START', () => {
    it('should toggle angeld start to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleAngledStart());

      expect(result.testRequirements.angledStart).toBeTruthy();
    });

    it('should toggle angled start to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleAngledStart());
      const result = testDataReducer(modifiedState, new ToggleAngledStart());

      expect(result.testRequirements.angledStart).toBeFalsy();
    });
  });

  describe('TOGGLE HILL START', () => {
    it('should toggle hill start to complete (true) when dispatched first time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const result = testDataReducer(state, new ToggleHillStart());

      expect(result.testRequirements.hillStart).toBeTruthy();
    });

    it('should toggle hill start to incomplete (false) when dispatched second time', () => {
      const state: TestData = {
        testRequirements: {},
      };

      const modifiedState = testDataReducer(state, new ToggleHillStart());
      const result = testDataReducer(modifiedState, new ToggleHillStart());

      expect(result.testRequirements.hillStart).toBeFalsy();
    });
  });
});
