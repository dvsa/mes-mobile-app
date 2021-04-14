import { vehicleChecksCatCReducer, generateInitialState, } from '../vehicle-checks.cat-c.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../vehicle-checks.cat-c.action';
import { cloneDeep } from 'lodash';
describe('Vehicle Checks Cat C Reducer', function () {
    describe('SHOW_ME_QUESTION_SELECTED', function () {
        it('should add the show me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
            };
            var state = cloneDeep(generateInitialState("C" /* C */));
            var result = vehicleChecksCatCReducer(state, new ShowMeQuestionSelected(newQuestionPayload, 1));
            expect(result.showMeQuestions[1].code).toEqual('S1');
            expect(result.showMeQuestions[1].description).toEqual('desc');
        });
    });
    describe('SHOW_ME_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(generateInitialState("C" /* C */));
            state.showMeQuestions[1] = {
                code: 'S1',
                description: 'desc',
                outcome: 'P',
            };
            var result = vehicleChecksCatCReducer(state, new ShowMeQuestionOutcomeChanged('DF', 1));
            expect(result.showMeQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('TELL_ME_QUESTION_SELECTED', function () {
        it('should add the tell me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'T01',
                description: 'desc',
            };
            var state = cloneDeep(generateInitialState("C" /* C */));
            var result = vehicleChecksCatCReducer(state, new TellMeQuestionSelected(newQuestionPayload, 1));
            expect(result.tellMeQuestions[1].code).toEqual('T01');
            expect(result.tellMeQuestions[1].description).toEqual('desc');
        });
    });
    describe('TELL_ME_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(generateInitialState("C" /* C */));
            state.tellMeQuestions[1] = {
                code: 'T01',
                description: 'desc',
                outcome: 'P',
            };
            var result = vehicleChecksCatCReducer(state, new TellMeQuestionOutcomeChanged('DF', 1));
            expect(result.tellMeQuestions[1].outcome).toEqual('DF');
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-c.reducer.spec.js.map