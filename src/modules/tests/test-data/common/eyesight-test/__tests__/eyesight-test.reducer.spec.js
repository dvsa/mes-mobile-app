import { eyesightTestReducer, initialState } from '../eyesight-test.reducer';
import { EyesightTestPassed, EyesightTestFailed, EyesightTestReset, EyesightTestAddComment, } from '../eyesight-test.actions';
describe('Eyesight Test Reducer', function () {
    describe('EYESIGHT_TEST_PASSED', function () {
        it('updates the complete status to true', function () {
            var state = {};
            var result = eyesightTestReducer(state, new EyesightTestPassed());
            expect(result.complete).toEqual(true);
        });
        it('removes an eyesight test serious fault', function () {
            var state = {
                complete: true,
                seriousFault: true,
            };
            var result = eyesightTestReducer(state, new EyesightTestPassed());
            expect(result.complete).toEqual(true);
            expect(result.seriousFault).toEqual(false);
        });
    });
    describe('EYESIGHT_TEST_FAILED', function () {
        it('updates the eyesight status to failed', function () {
            var state = {
                complete: false,
            };
            var result = eyesightTestReducer(state, new EyesightTestFailed());
            expect(result.complete).toBe(true);
            expect(result.seriousFault).toBe(true);
        });
    });
    describe('EYESIGHT_TEST_RESET', function () {
        it('sets the state to the initial state', function () {
            var state = {
                complete: true,
            };
            var result = eyesightTestReducer(state, new EyesightTestReset());
            expect(result).toBe(initialState);
        });
    });
    describe('EYESIGHT_TEST_ADD_COMMENT', function () {
        it('sets the eyesight test fault comments', function () {
            var state = {
                complete: true,
                seriousFault: true,
            };
            var result = eyesightTestReducer(state, new EyesightTestAddComment('Eyesight test comment'));
            expect(result.faultComments).toEqual('Eyesight test comment');
        });
    });
});
//# sourceMappingURL=eyesight-test.reducer.spec.js.map