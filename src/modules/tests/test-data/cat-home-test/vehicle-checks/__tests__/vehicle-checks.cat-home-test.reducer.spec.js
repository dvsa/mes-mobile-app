import { initialState, vehicleChecksCatHomeTestReducer, } from '../vehicle-checks.cat-home-test.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, AddShowMeTellMeComment, } from '../vehicle-checks.cat-home-test.action';
import { cloneDeep } from 'lodash';
describe('Vehicle Checks Cat HOME Reducer', function () {
    describe('SHOW_ME_QUESTION_SELECTED', function () {
        it('should add the show me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
            };
            var state = cloneDeep(initialState);
            var result = vehicleChecksCatHomeTestReducer(state, new ShowMeQuestionSelected(newQuestionPayload, 0));
            expect(result.showMeQuestions[0].code).toEqual('S1');
            expect(result.showMeQuestions[0].description).toEqual('desc');
        });
    });
    describe('SHOW_ME_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(initialState);
            state.showMeQuestions[1] = {
                code: 'S1',
                description: 'desc',
                outcome: 'P',
            };
            var result = vehicleChecksCatHomeTestReducer(state, new ShowMeQuestionOutcomeChanged('DF', 1));
            expect(result.showMeQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('TELL_ME_QUESTION_SELECTED', function () {
        it('should add the tell me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'T01',
                description: 'desc',
            };
            var state = cloneDeep(initialState);
            var result = vehicleChecksCatHomeTestReducer(state, new TellMeQuestionSelected(newQuestionPayload, 0));
            expect(result.tellMeQuestions[0].code).toEqual('T01');
            expect(result.tellMeQuestions[0].description).toEqual('desc');
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
            var result = vehicleChecksCatHomeTestReducer(state, new TellMeQuestionOutcomeChanged('DF', 1));
            expect(result.tellMeQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('ADD_SHOW_ME_TELL_ME_COMMENT', function () {
        it('should update the vehicle checks comments', function () {
            var state = cloneDeep(initialState);
            var result = vehicleChecksCatHomeTestReducer(state, new AddShowMeTellMeComment('So many mistakes.'));
            expect(result.showMeTellMeComments).toEqual('So many mistakes.');
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-home-test.reducer.spec.js.map