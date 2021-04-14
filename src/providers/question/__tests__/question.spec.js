import { TestBed } from '@angular/core/testing';
import { QuestionProvider } from '../question';
import tellMeQuestionsCatBConstants from '../../../shared/constants/tell-me-questions/tell-me-questions.cat-b.constants';
import showMeQuestionsCatBConstants from '../../../shared/constants/show-me-questions/show-me-questions.cat-b.constants';
import tellMeQuestionsCatBeConstants from '../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import showMeQuestionsCatBeConstants from '../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import tellMeQuestionsVocationalConstants from '../../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';
import showMeQuestionsVocationalConstants from '../../../shared/constants/show-me-questions/show-me-questions.vocational.constants';
import tellMeQuestionsVocationalTrailerConstants from '../../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import showMeQuestionsVocationalTrailerConstants from '../../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';
import safetyQuestionsCatDConstants from '../../../shared/constants/safety-questions.cat-d.constants';
import { configureTestSuite } from 'ng-bullet';
describe('question provider', function () {
    var questionProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                QuestionProvider,
            ],
        });
    });
    beforeEach(function () {
        questionProvider = TestBed.get(QuestionProvider);
    });
    describe('getTellMeQuestions', function () {
        it('should return the correct questions for a category B test', function () {
            expect(questionProvider.getTellMeQuestions("B" /* B */)).toEqual(tellMeQuestionsCatBConstants);
        });
        it('should return the correct questions for a category B+E test', function () {
            expect(questionProvider.getTellMeQuestions("B+E" /* BE */)).toEqual(tellMeQuestionsCatBeConstants);
        });
        it('should return the correct questions for a category C test', function () {
            expect(questionProvider.getTellMeQuestions("C" /* C */)).toEqual(tellMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category CE test', function () {
            expect(questionProvider.getTellMeQuestions("C+E" /* CE */)).toEqual(tellMeQuestionsVocationalTrailerConstants);
        });
        it('should return the correct questions for a category C1 test', function () {
            expect(questionProvider.getTellMeQuestions("C1" /* C1 */)).toEqual(tellMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category C1E test', function () {
            expect(questionProvider.getTellMeQuestions("C1+E" /* C1E */)).toEqual(tellMeQuestionsVocationalTrailerConstants);
        });
        it('should return the correct questions for a category D test', function () {
            expect(questionProvider.getTellMeQuestions("D" /* D */)).toEqual(tellMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category DE test', function () {
            expect(questionProvider.getTellMeQuestions("D+E" /* DE */)).toEqual(tellMeQuestionsVocationalTrailerConstants);
        });
        it('should return the correct questions for a category D1 test', function () {
            expect(questionProvider.getTellMeQuestions("D1" /* D1 */)).toEqual(tellMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category D1E test', function () {
            expect(questionProvider.getTellMeQuestions("D1+E" /* D1E */)).toEqual(tellMeQuestionsVocationalTrailerConstants);
        });
        it('should return no questions for a non-supported category', function () {
            expect(questionProvider.getTellMeQuestions("B1" /* B1 */)).toEqual([]);
        });
    });
    describe('getShowMeQuestions', function () {
        it('should return the correct questions for a category B test', function () {
            expect(questionProvider.getShowMeQuestions("B" /* B */)).toEqual(showMeQuestionsCatBConstants);
        });
        it('should return the correct questions for a category B+E test', function () {
            expect(questionProvider.getShowMeQuestions("B+E" /* BE */)).toEqual(showMeQuestionsCatBeConstants);
        });
        it('should return the correct questions for a category C test', function () {
            expect(questionProvider.getShowMeQuestions("C" /* C */)).toEqual(showMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category CE test', function () {
            expect(questionProvider.getShowMeQuestions("C+E" /* CE */)).toEqual(showMeQuestionsVocationalTrailerConstants);
        });
        it('should return the correct questions for a category C1 test', function () {
            expect(questionProvider.getShowMeQuestions("C1" /* C1 */)).toEqual(showMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category C1E test', function () {
            expect(questionProvider.getShowMeQuestions("C1+E" /* C1E */)).toEqual(showMeQuestionsVocationalTrailerConstants);
        });
        it('should return the correct questions for a category D test', function () {
            expect(questionProvider.getShowMeQuestions("D" /* D */)).toEqual(showMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category DE test', function () {
            expect(questionProvider.getShowMeQuestions("D+E" /* DE */)).toEqual(showMeQuestionsVocationalTrailerConstants);
        });
        it('should return the correct questions for a category D1 test', function () {
            expect(questionProvider.getShowMeQuestions("D1" /* D1 */)).toEqual(showMeQuestionsVocationalConstants);
        });
        it('should return the correct questions for a category D1E test', function () {
            expect(questionProvider.getShowMeQuestions("D1+E" /* D1E */)).toEqual(showMeQuestionsVocationalTrailerConstants);
        });
        it('should return no questions for a non-supported category', function () {
            expect(questionProvider.getShowMeQuestions("B1" /* B1 */)).toEqual([]);
        });
    });
    describe('getVocationalSafetyQuestions', function () {
        it('should return the correct questions for a category D test', function () {
            expect(questionProvider.getVocationalSafetyQuestions("D" /* D */)).toEqual(safetyQuestionsCatDConstants);
        });
        it('should return the correct questions for a category D1 test', function () {
            expect(questionProvider.getVocationalSafetyQuestions("D1" /* D1 */)).toEqual(safetyQuestionsCatDConstants);
        });
        it('should return the correct questions for a category DE test', function () {
            expect(questionProvider.getVocationalSafetyQuestions("D+E" /* DE */)).toEqual(safetyQuestionsCatDConstants);
        });
        it('should return the correct questions for a category D1E test', function () {
            expect(questionProvider.getVocationalSafetyQuestions("D1+E" /* D1E */)).toEqual(safetyQuestionsCatDConstants);
        });
    });
});
//# sourceMappingURL=question.spec.js.map