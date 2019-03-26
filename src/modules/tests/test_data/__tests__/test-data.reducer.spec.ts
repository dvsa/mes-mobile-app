import { testDataReducer, initialState } from '../test-data.reducer';
import { AddDrivingFault } from '../test-data.actions';
import { Competencies } from '../test-data.constants';
import { TestData, TestRequirements } from '@dvsa/mes-test-schema/categories/B';

const testRequirements: TestRequirements = {
  angledStart: false,
  hillStart: false,
  normalStart1: false,
  normalStart2: false,
};

describe('TestDataReducer reducer', () => {
  it('should add a driving fault when no driving faults exist', () => {
    const result = testDataReducer(initialState, new AddDrivingFault({
      competency: Competencies.controlsGears,
      newFaultCount: 1,
    }));
    expect(result.drivingFaults.controlsGears).toBe(1);
  });
  it('should update a driving fault when it already exists', () => {
    const state: TestData = {
      testRequirements,
      eco: {},
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
  it('should not remove an exisitng driving fault when a new one is added', () => {
    const state: TestData = {
      testRequirements,
      eco: {},
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
