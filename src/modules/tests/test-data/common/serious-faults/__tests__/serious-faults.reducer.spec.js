import { seriousFaultsReducer } from '../serious-faults.reducer';
import { AddSeriousFault, RemoveSeriousFault, AddSeriousFaultComment } from '../serious-faults.actions';
import { Competencies } from '../../../test-data.constants';
describe('Serious Faults Reducer', function () {
    describe('ADD SERIOUS FAULT', function () {
        it('should add a serious fault when none exist', function () {
            var state = {};
            var result = seriousFaultsReducer(state, new AddSeriousFault(Competencies.followingDistance));
            expect(result.followingDistance).toEqual(true);
        });
        it('should not remove an existing serious fault when a new one is added', function () {
            var state = {
                followingDistance: true,
            };
            var result = seriousFaultsReducer(state, new AddSeriousFault(Competencies.judgementCrossing));
            expect(result.followingDistance).toEqual(true);
            expect(result.judgementCrossing).toEqual(true);
        });
    });
    describe('REMOVE_SERIOUS_FAULT', function () {
        it('should remove the competency from the state when a fault is removed', function () {
            var state = {
                controlsGears: true,
            };
            var result = seriousFaultsReducer(state, new RemoveSeriousFault(Competencies.controlsGears));
            expect(result.controlsGears).toBeUndefined();
        });
    });
    describe('ADD_SERIOUS_FAULT_COMMENT', function () {
        it('should add a comment to the comptency', function () {
            var state = {};
            var result = seriousFaultsReducer(state, new AddSeriousFaultComment(Competencies.controlsGears, 'Test'));
            expect(result.controlsGearsComments).toEqual('Test');
        });
    });
});
//# sourceMappingURL=serious-faults.reducer.spec.js.map