import { ecoReducer } from '../eco.reducer';
import { ToggleEco, ToggleControlEco, TogglePlanningEco } from '../eco.actions';
describe('Eco Reducer', function () {
    describe('TOGGLE_ECO', function () {
        it('should toggle eco (true when dispatched first time)', function () {
            var state = {};
            var result = ecoReducer(state, new ToggleEco());
            expect(result.completed).toEqual(true);
        });
        it('should toggle eco (false when dispatched second time)', function () {
            var state = {};
            var modifiedState = ecoReducer(state, new ToggleEco());
            var result = ecoReducer(modifiedState, new ToggleEco());
            expect(result.completed).toEqual(false);
        });
    });
    describe('TOGGLE_CONTROL_ECO', function () {
        it('should toggle control eco fault (true when dispatched first time)', function () {
            var state = {};
            var result = ecoReducer(state, new ToggleControlEco());
            expect(result.adviceGivenControl).toEqual(true);
        });
        it('should toggle control eco fault (false when dispatched second time)', function () {
            var state = {};
            var modifiedState = ecoReducer(state, new ToggleControlEco());
            var result = ecoReducer(modifiedState, new ToggleControlEco());
            expect(result.adviceGivenControl).toEqual(false);
        });
    });
    describe('TOGGLE_PLANNING_ECO', function () {
        it('should toggle the planning eco fault (true when dispatched first time)', function () {
            var state = {};
            var result = ecoReducer(state, new TogglePlanningEco());
            expect(result.adviceGivenPlanning).toEqual(true);
        });
        it('should toggle planning eco fault (false when dispatched second time)', function () {
            var state = {};
            var modifiedState = ecoReducer(state, new TogglePlanningEco());
            var result = ecoReducer(modifiedState, new TogglePlanningEco());
            expect(result.adviceGivenPlanning).toEqual(false);
        });
    });
});
//# sourceMappingURL=eco.reducer.spec.js.map