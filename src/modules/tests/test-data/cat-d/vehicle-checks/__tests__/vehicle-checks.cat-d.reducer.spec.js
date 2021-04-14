import { vehicleChecksCatDReducer, generateInitialState, } from '../vehicle-checks.cat-d.reducer';
import { ShowMeQuestionSelected, ShowMeQuestionOutcomeChanged, TellMeQuestionSelected, TellMeQuestionOutcomeChanged, } from '../vehicle-checks.cat-d.action';
import { cloneDeep } from 'lodash';
describe('Vehicle Checks Cat D Reducer', function () {
    describe('SHOW_ME_QUESTION_SELECTED', function () {
        it('should add the show me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'S1',
                description: 'desc',
            };
            var state = cloneDeep(generateInitialState("D" /* D */));
            var result = vehicleChecksCatDReducer(state, new ShowMeQuestionSelected(newQuestionPayload, 1));
            expect(result.showMeQuestions[1].code).toEqual('S1');
            expect(result.showMeQuestions[1].description).toEqual('desc');
        });
    });
    describe('SHOW_ME_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(generateInitialState("D" /* D */));
            state.showMeQuestions[1] = {
                code: 'S1',
                description: 'desc',
                outcome: 'P',
            };
            var result = vehicleChecksCatDReducer(state, new ShowMeQuestionOutcomeChanged('DF', 1));
            expect(result.showMeQuestions[1].outcome).toEqual('DF');
        });
    });
    describe('TELL_ME_QUESTION_SELECTED', function () {
        it('should add the tell me question in the payload to the array at the specified index', function () {
            var newQuestionPayload = {
                code: 'T01',
                description: 'desc',
            };
            var state = cloneDeep(generateInitialState("D" /* D */));
            var result = vehicleChecksCatDReducer(state, new TellMeQuestionSelected(newQuestionPayload, 1));
            expect(result.tellMeQuestions[1].code).toEqual('T01');
            expect(result.tellMeQuestions[1].description).toEqual('desc');
        });
    });
    describe('TELL_ME_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = cloneDeep(generateInitialState("D" /* D */));
            state.tellMeQuestions[1] = {
                code: 'T01',
                description: 'desc',
                outcome: 'P',
            };
            var result = vehicleChecksCatDReducer(state, new TellMeQuestionOutcomeChanged('DF', 1));
            expect(result.tellMeQuestions[1].outcome).toEqual('DF');
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-d.reducer.spec.js.map