import { safetyQuestionsCatDReducer } from '../safety-questions.cat-d.reducer';
import { SafetyQuestionOutcomeChanged, AddSafetyQuestionComment, } from '../safety-questions.cat-d.action';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
describe('Safety Questions Cat D Reducer', function () {
    var mockSafetyQuestions = {
        questions: [
            {
                description: 'Lebron',
                outcome: CompetencyOutcome.P,
            },
            {
                description: 'Kd',
                outcome: CompetencyOutcome.P,
            },
            {
                description: 'Dame',
                outcome: CompetencyOutcome.P,
            },
        ],
        faultComments: '',
    };
    describe('SAFETY_QUESTION_OUTCOME_CHANGED', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = mockSafetyQuestions;
            var result = safetyQuestionsCatDReducer(state, new SafetyQuestionOutcomeChanged('DF', 1));
            expect(result.questions[1].outcome).toEqual('DF');
        });
    });
    describe('ADD_SAFETY_QUESTION_COMMENT', function () {
        it('should update the outcome property for the object at the specified index', function () {
            var state = mockSafetyQuestions;
            var result = safetyQuestionsCatDReducer(state, new AddSafetyQuestionComment('DVSA rocks!!!'));
            expect(result.faultComments).toEqual('DVSA rocks!!!');
        });
    });
});
//# sourceMappingURL=safety-questionss.cat-d.reducer.spec.js.map