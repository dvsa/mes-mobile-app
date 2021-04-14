import { initialState, safetyAndBalanceCatAMod2Reducer, } from '../safety-and-balance.cat-a-mod2.reducer';
import { SafetyQuestionSelected, SafetyQuestionOutcomeChanged, BalanceQuestionSelected, BalanceQuestionOutcomeChanged, AddSafetyAndBalanceComment, } from '../safety-and-balance.cat-a-mod2.actions';
import { cloneDeep } from 'lodash';
describe('Vehicle Checks Cat A Mod2 Reducer', function () {
    describe('SAFETY_QUESTION_SELECTED', function () {
        it('should add the safety question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
            };
            var state = cloneDeep(initialState);
            var result = safetyAndBalanceCatAMod2Reducer(state, new SafetyQuestionSelected(newQuestionPayload, 1));
            expect(result.safetyQuestions[1].code).toEqual('S1');
            expect(result.safetyQuestions[1].description).toEqual('desc');
        });
    });
    describe('SAFETY_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(initialState);
            state.safetyQuestions[1] = {
                code: 'S1',
                description: 'desc',
                outcome: 'P',
            };
            var result = safetyAndBalanceCatAMod2Reducer(state, new SafetyQuestionOutcomeChanged('DF', 1));
            expect(result.safetyQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('BALANCE_QUESTION_SELECTED', function () {
        it('should add the balance question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'B01',
                description: 'desc',
            };
            var state = cloneDeep(initialState);
            var result = safetyAndBalanceCatAMod2Reducer(state, new BalanceQuestionSelected(newQuestionPayload, 0));
            expect(result.balanceQuestions[0].code).toEqual('B01');
            expect(result.balanceQuestions[0].description).toEqual('desc');
        });
    });
    describe('BALANCE_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(initialState);
            state.balanceQuestions[1] = {
                code: 'B01',
                description: 'desc',
                outcome: 'P',
            };
            var result = safetyAndBalanceCatAMod2Reducer(state, new BalanceQuestionOutcomeChanged('DF', 1));
            expect(result.balanceQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('ADD_SAFETY_AND_BALANCE_COMMENT', function () {
        it('should update the safety and balance comments', function () {
            var state = cloneDeep(initialState);
            var result = safetyAndBalanceCatAMod2Reducer(state, new AddSafetyAndBalanceComment('Fell over twice.'));
            expect(result.safetyAndBalanceComments).toEqual('Fell over twice.');
        });
    });
});
//# sourceMappingURL=safety-and-balance.cat-a-mod2.reducer.spec.js.map