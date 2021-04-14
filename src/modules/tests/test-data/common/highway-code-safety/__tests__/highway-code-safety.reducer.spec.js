import { highwayCodeSafetyReducer } from '../highway-code-safety.reducer';
import { ToggleHighwayCodeSafety, HighwayCodeSafetyAddDrivingFault, HighwayCodeSafetyAddSeriousFault, HighwayCodeSafetyRemoveFault, HighwayCodeSafetyAddComment, } from '../highway-code-safety.actions';
describe('Highway Code Safety Reducer', function () {
    describe('TOGGLE_HIGHWAY_CODE_SAFETY_STOP', function () {
        it('should toggle the highway code safety (true when dispatched first time)', function () {
            var state = {};
            var result = highwayCodeSafetyReducer(state, new ToggleHighwayCodeSafety());
            expect(result.selected).toEqual(true);
        });
        it('should remove the highway code safety property when dispatched second time', function () {
            var state = {};
            var modifiedState = highwayCodeSafetyReducer(state, new ToggleHighwayCodeSafety());
            var result = highwayCodeSafetyReducer(modifiedState, new ToggleHighwayCodeSafety());
            expect(result.selected).toEqual(false);
        });
    });
    describe('HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT', function () {
        it('should add the correct fault', function () {
            var state = {};
            var result = highwayCodeSafetyReducer(state, new HighwayCodeSafetyAddDrivingFault());
            expect(result.selected).toEqual(true);
            expect(result.drivingFault).toEqual(true);
        });
    });
    describe('HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT', function () {
        it('should add the correct fault', function () {
            var state = {};
            var result = highwayCodeSafetyReducer(state, new HighwayCodeSafetyAddSeriousFault());
            expect(result.selected).toEqual(true);
            expect(result.seriousFault).toEqual(true);
        });
    });
    describe('ADD_HIGHWAY_CODE_SAFETY_COMMENT', function () {
        it('should add a fault comment', function () {
            var state = {};
            var result = highwayCodeSafetyReducer(state, new HighwayCodeSafetyAddComment('Test'));
            expect(result.faultComments).toEqual('Test');
        });
    });
    describe('HIGHWAY_CODE_SAFETY_REMOVE_FAULT', function () {
        it('should remove the fault', function () {
            var state = {};
            var modifiedState = highwayCodeSafetyReducer(state, new HighwayCodeSafetyAddSeriousFault());
            var result = highwayCodeSafetyReducer(modifiedState, new HighwayCodeSafetyRemoveFault());
            expect(result.selected).toEqual(true);
            expect(result.seriousFault).toBeUndefined();
            expect(result.faultComments).toBeUndefined();
        });
    });
});
//# sourceMappingURL=highway-code-safety.reducer.spec.js.map