import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { pcvDoorExerciseReducer } from '../pcv-door-exercise.reducer';
import {
  PcvDoorExerciseAddDrivingFault,
  PcvDoorExerciseAddSeriousFault,
  PcvDoorExerciseAddDangerousFault,
  PcvDoorExerciseRemoveDrivingFault,
  PcvDoorExerciseRemoveSeriousFault,
  PcvDoorExerciseRemoveDangerousFault,
  AddPcvDoorExerciseComment,
} from '../pcv-door-exercise.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('pcvDoorExerciseReducer' , () => {

  describe('Driving Fault', () => {

    describe('PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT', () => {
      it('should add the correct fault', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const result = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDrivingFault());
        expect(result.drivingFault).toEqual(true);
      });
    });

    describe('PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT', () => {
      it('should remove the fault', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const modifiedState = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDrivingFault());
        const result = pcvDoorExerciseReducer(modifiedState, new PcvDoorExerciseRemoveDrivingFault());
        expect(result.drivingFault).toBeFalsy();
        expect(result.drivingFaultComments).toBeUndefined();
      });
    });
  });

  describe('seriousFault', () => {

    describe('PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT', () => {
      it('should add the correct fault', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const result = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddSeriousFault());
        expect(result.seriousFault).toEqual(true);
      });
    });

    describe('PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT', () => {
      it('should remove the fault', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const modifiedState = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddSeriousFault());
        const result = pcvDoorExerciseReducer(modifiedState, new PcvDoorExerciseRemoveSeriousFault());
        expect(result.seriousFault).toEqual(false);
        expect(result.seriousFaultComments).toBeUndefined();
      });
    });
  });

  describe('dangerousFault', () => {

    describe('PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT', () => {
      it('should add the correct fault', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const result = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDangerousFault());
        expect(result.dangerousFault).toEqual(true);
      });
    });

    describe('PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT', () => {
      it('should remove the fault', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const modifiedState = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDangerousFault());
        const result = pcvDoorExerciseReducer(modifiedState, new PcvDoorExerciseRemoveDangerousFault());
        expect(result.dangerousFault).toEqual(false);
        expect(result.dangerousFaultComments).toBeUndefined();
      });
    });
  });

  describe('Comments', () => {

    describe('ADD_PCV_DOOR_EXERCISE_COMMENT', () => {
      it('should add a fault comment', () => {
        const state: CatDUniqueTypes.PcvDoorExercise = {};
        const resultDF = pcvDoorExerciseReducer(
          state,
          new AddPcvDoorExerciseComment(CompetencyOutcome.DF, 'drivingFaultComments', 'Test DF'),
        );
        const resultS = pcvDoorExerciseReducer(
          state,
          new AddPcvDoorExerciseComment(CompetencyOutcome.S, 'seriousFaultComments', 'Test S'),
        );
        const resultD = pcvDoorExerciseReducer(
          state,
          new AddPcvDoorExerciseComment(CompetencyOutcome.D, 'dangerousFaultComments', 'Test D'),
        );
        expect(resultDF.drivingFaultComments).toEqual('Test DF');
        expect(resultS.seriousFaultComments).toEqual('Test S');
        expect(resultD.dangerousFaultComments).toEqual('Test D');
      });
    });
  });
});
