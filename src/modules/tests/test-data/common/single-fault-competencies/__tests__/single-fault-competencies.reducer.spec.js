var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { singleFaultCompetenciesReducer, initialState } from '../single-fault-competencies.reducer';
import * as singleFaultCompetencyActions from '../single-fault-competencies.actions';
import { SingleFaultCompetencyNames } from '../../../test-data.constants';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('single fault competencies reducer', function () {
    describe('handle SetSingleFaultCompetencyOutcome', function () {
        it('should set the outcome for the specified single fault competency', function () {
            var state = __assign({}, initialState);
            var action = new singleFaultCompetencyActions.SetSingleFaultCompetencyOutcome(SingleFaultCompetencyNames.uTurn, CompetencyOutcome.DF);
            var result = singleFaultCompetenciesReducer(state, action);
            expect(result).toEqual(__assign(__assign({}, initialState), { uTurn: CompetencyOutcome.DF }));
        });
    });
    describe('handle remove single fault competency outcome', function () {
        it('should remove the specified single fault competency', function () {
            var _a, _b;
            var state = (_a = {},
                _a[SingleFaultCompetencyNames.uTurn] = CompetencyOutcome.DF,
                _a[SingleFaultCompetencyNames.controlledStop] = CompetencyOutcome.D,
                _a);
            var action = new singleFaultCompetencyActions.RemoveSingleFaultCompetencyOutcome(SingleFaultCompetencyNames.controlledStop);
            var result = singleFaultCompetenciesReducer(state, action);
            expect(result).toEqual((_b = {},
                _b[SingleFaultCompetencyNames.uTurn] = CompetencyOutcome.DF,
                _b));
        });
    });
    describe('handle add single fault comment', function () {
        it('should add a comment to the specified fault', function () {
            var state = __assign({}, initialState);
            var action = new singleFaultCompetencyActions.AddSingleFaultCompetencyComment(SingleFaultCompetencyNames.controlledStop, 'some controlled stop comments');
            var result = singleFaultCompetenciesReducer(state, action);
            expect(result).toEqual({
                controlledStopComments: 'some controlled stop comments',
            });
        });
    });
});
//# sourceMappingURL=single-fault-competencies.reducer.spec.js.map