import { pcvDoorExerciseReducer } from '../pcv-door-exercise.reducer';
import { PcvDoorExerciseAddDrivingFault, PcvDoorExerciseAddSeriousFault, PcvDoorExerciseAddDangerousFault, PcvDoorExerciseRemoveDrivingFault, PcvDoorExerciseRemoveSeriousFault, PcvDoorExerciseRemoveDangerousFault, AddPcvDoorExerciseComment, } from '../pcv-door-exercise.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('pcvDoorExerciseReducer', function () {
    describe('Driving Fault', function () {
        describe('PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT', function () {
            it('should add the correct fault', function () {
                var state = {};
                var result = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDrivingFault());
                expect(result.drivingFault).toEqual(true);
            });
        });
        describe('PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT', function () {
            it('should remove the fault', function () {
                var state = {};
                var modifiedState = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDrivingFault());
                var result = pcvDoorExerciseReducer(modifiedState, new PcvDoorExerciseRemoveDrivingFault());
                expect(result.drivingFault).toBeFalsy();
                expect(result.drivingFaultComments).toBeUndefined();
            });
        });
    });
    describe('seriousFault', function () {
        describe('PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT', function () {
            it('should add the correct fault', function () {
                var state = {};
                var result = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddSeriousFault());
                expect(result.seriousFault).toEqual(true);
            });
        });
        describe('PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT', function () {
            it('should remove the fault', function () {
                var state = {};
                var modifiedState = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddSeriousFault());
                var result = pcvDoorExerciseReducer(modifiedState, new PcvDoorExerciseRemoveSeriousFault());
                expect(result.seriousFault).toEqual(false);
                expect(result.seriousFaultComments).toBeUndefined();
            });
        });
    });
    describe('dangerousFault', function () {
        describe('PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT', function () {
            it('should add the correct fault', function () {
                var state = {};
                var result = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDangerousFault());
                expect(result.dangerousFault).toEqual(true);
            });
        });
        describe('PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT', function () {
            it('should remove the fault', function () {
                var state = {};
                var modifiedState = pcvDoorExerciseReducer(state, new PcvDoorExerciseAddDangerousFault());
                var result = pcvDoorExerciseReducer(modifiedState, new PcvDoorExerciseRemoveDangerousFault());
                expect(result.dangerousFault).toEqual(false);
                expect(result.dangerousFaultComments).toBeUndefined();
            });
        });
    });
    describe('Comments', function () {
        describe('ADD_PCV_DOOR_EXERCISE_COMMENT', function () {
            it('should add a fault comment', function () {
                var state = {};
                var resultDF = pcvDoorExerciseReducer(state, new AddPcvDoorExerciseComment(CompetencyOutcome.DF, 'drivingFaultComments', 'Test DF'));
                var resultS = pcvDoorExerciseReducer(state, new AddPcvDoorExerciseComment(CompetencyOutcome.S, 'seriousFaultComments', 'Test S'));
                var resultD = pcvDoorExerciseReducer(state, new AddPcvDoorExerciseComment(CompetencyOutcome.D, 'dangerousFaultComments', 'Test D'));
                expect(resultDF.drivingFaultComments).toEqual('Test DF');
                expect(resultS.seriousFaultComments).toEqual('Test S');
                expect(resultD.dangerousFaultComments).toEqual('Test D');
            });
        });
    });
});
//# sourceMappingURL=pcv-door-exercise.reducer.spec.js.map