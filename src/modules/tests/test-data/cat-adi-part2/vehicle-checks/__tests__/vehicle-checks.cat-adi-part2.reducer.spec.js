import { initialState, vehicleChecksCatADI2Reducer, } from '../vehicle-checks.cat-adi-part2.reducer';
import { TellMeQuestionSelected, TellMeQuestionOutcomeChanged, AddShowMeTellMeComment, } from '../vehicle-checks.cat-adi-part2.action';
import { cloneDeep } from 'lodash';
describe('Vehicle Checks Cat ADI2 Reducer', function () {
    describe('TELL_ME_QUESTION_SELECTED', function () {
        it('should add the tell me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'T01',
                description: 'desc',
            };
            var state = cloneDeep(initialState);
            var result = vehicleChecksCatADI2Reducer(state, new TellMeQuestionSelected(newQuestionPayload, 1));
            expect(result.tellMeQuestions[1].code).toEqual('T01');
            expect(result.tellMeQuestions[1].description).toEqual('desc');
        });
    });
    describe('TELL_ME_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(initialState);
            state.tellMeQuestions[1] = {
                code: 'T01',
                description: 'desc',
                outcome: 'P',
            };
            var result = vehicleChecksCatADI2Reducer(state, new TellMeQuestionOutcomeChanged('DF', 1));
            expect(result.tellMeQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('ADD_SHOW_ME_TELL_ME_COMMENT', function () {
        it('should update the vehicle checks comments', function () {
            var state = cloneDeep(initialState);
            var result = vehicleChecksCatADI2Reducer(state, new AddShowMeTellMeComment('So many mistakes.'));
            expect(result.showMeTellMeComments).toEqual('So many mistakes.');
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-adi-part2.reducer.spec.js.map