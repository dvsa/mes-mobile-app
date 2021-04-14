import { safetyQuestionsExist } from '../safety-questions.cat-d.selector';
describe('Safety Questions Selector Cat D', function () {
    describe('safetyQuestionsExist', function () {
        it('should return false if there are no safety questions entered', function () {
            var emptySafetyQuestions = { questions: [{}], faultComments: '' };
            var result = safetyQuestionsExist(emptySafetyQuestions);
            expect(result).toBeFalsy();
        });
        it('should return true if there are safety checks entered', function () {
            var populatedSafetyQuestions = {
                questions: [{ description: 'test s01', outcome: 'P' }],
                faultComments: '',
            };
            var result = safetyQuestionsExist(populatedSafetyQuestions);
            expect(result).toBeTruthy();
        });
        it('should return false if there are safety questions but no outcome selected', function () {
            var populatedSafetyQuestions = {
                questions: [{ description: 'test s01', outcome: null }],
                faultComments: '',
            };
            var result = safetyQuestionsExist(populatedSafetyQuestions);
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=safety-questions.cat-d.selector.spec.js.map