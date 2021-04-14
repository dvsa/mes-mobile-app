import { AddDangerousFault, RemoveDangerousFault, AddDangerousFaultComment } from '../dangerous-faults.actions';
import { Competencies } from '../../../test-data.constants';
import { dangerousFaultsReducer } from '../dangerous-faults.reducer';
describe('Dangerous Fault Reducer', function () {
    describe('ADD_DANGEROUS_FAULT', function () {
        it('should add a dangerous fault when none exist', function () {
            var state = {};
            var result = dangerousFaultsReducer(state, new AddDangerousFault(Competencies.followingDistance));
            expect(result.followingDistance).toEqual(true);
        });
        it('should not remove an existing dangerous faults when a new one is added', function () {
            var state = {
                followingDistance: true,
            };
            var result = dangerousFaultsReducer(state, new AddDangerousFault(Competencies.judgementCrossing));
            expect(result.followingDistance).toEqual(true);
            expect(result.judgementCrossing).toEqual(true);
        });
    });
    describe(('REMOVE_DANGEROUS_FAULT'), function () {
        it('should remove the competency from the state when a fault is removed', function () {
            var state = {
                controlsGears: true,
            };
            var result = dangerousFaultsReducer(state, new RemoveDangerousFault(Competencies.controlsGears));
            expect(result.controlsGears).toBeUndefined();
        });
        it('should do nothing if there is not a dangerous fault for the comptency', function () {
            var state = {
                controlsGears: true,
            };
            var result = dangerousFaultsReducer(state, new RemoveDangerousFault(Competencies.ancillaryControls));
            expect(result).toEqual(state);
        });
        it('should only remove the dangerous fault in the action', function () {
            var state = {
                followingDistance: true,
            };
            var result = dangerousFaultsReducer(state, new RemoveDangerousFault(Competencies.judgementCrossing));
            expect(result.followingDistance).toEqual(true);
            expect(result.judgementCrossing).toBeUndefined();
        });
    });
    describe('ADD_DANGEROUS_FAULT_COMMENT', function () {
        it('should add the provided comment', function () {
            var state = {};
            var result = dangerousFaultsReducer(state, new AddDangerousFaultComment(Competencies.ancillaryControls, 'Test'));
            expect(result.ancillaryControlsComments).toEqual('Test');
        });
    });
});
//# sourceMappingURL=dangerous-faults.reducer.spec.js.map