import { controlledStopReducer } from '../controlled-stop.reducer';
import { ToggleControlledStop, ControlledStopAddDrivingFault, ControlledStopAddSeriousFault, ControlledStopAddDangerousFault, ControlledStopRemoveFault, AddControlledStopComment, } from '../controlled-stop.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('Controlled Stop Reducer', function () {
    describe('TOGGLE_CONTROLLED_STOP', function () {
        it('should toggle the controlled stop (true when dispatched first time)', function () {
            var state = {};
            var result = controlledStopReducer(state, new ToggleControlledStop());
            expect(result.selected).toEqual(true);
        });
        it('should remove the controlled stop property when dispatched second time', function () {
            var state = {};
            var modifiedState = controlledStopReducer(state, new ToggleControlledStop());
            var result = controlledStopReducer(modifiedState, new ToggleControlledStop());
            expect(result.selected).toEqual(false);
        });
    });
    describe('CONTROLLED_STOP_ADD_DRIVING_FAULT', function () {
        it('should add the correct fault', function () {
            var state = {};
            var result = controlledStopReducer(state, new ControlledStopAddDrivingFault());
            expect(result.selected).toEqual(true);
            expect(result.fault).toEqual(CompetencyOutcome.DF);
        });
    });
    describe('CONTROLLED_STOP_ADD_SERIOUS_FAULT', function () {
        it('should add the correct fault', function () {
            var state = {};
            var result = controlledStopReducer(state, new ControlledStopAddSeriousFault());
            expect(result.selected).toEqual(true);
            expect(result.fault).toEqual(CompetencyOutcome.S);
        });
    });
    describe('CONTROLLED_STOP_ADD_DANGEROUS_FAULT', function () {
        it('should add the correct fault', function () {
            var state = {};
            var result = controlledStopReducer(state, new ControlledStopAddDangerousFault());
            expect(result.selected).toEqual(true);
            expect(result.fault).toEqual(CompetencyOutcome.D);
        });
    });
    describe('CONTROLLED_STOP_REMOVE_FAULT', function () {
        it('should remove the fault', function () {
            var state = {};
            var modifiedState = controlledStopReducer(state, new ControlledStopAddDangerousFault());
            var result = controlledStopReducer(modifiedState, new ControlledStopRemoveFault());
            expect(result.selected).toEqual(true);
            expect(result.fault).toBeUndefined();
            expect(result.faultComments).toBeUndefined();
        });
    });
    describe('ADD_CONTROLLED_STOP_COMMENT', function () {
        it('should add a fault comment', function () {
            var state = {};
            var result = controlledStopReducer(state, new AddControlledStopComment('Test'));
            expect(result.faultComments).toEqual('Test');
        });
    });
});
//# sourceMappingURL=controlled-stop.reducer.spec.js.map