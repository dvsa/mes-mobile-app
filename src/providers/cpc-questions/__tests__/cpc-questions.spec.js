import { CPCQuestionProvider } from '../cpc-questions';
import { configureTestSuite } from 'ng-bullet';
import { TestBed } from '@angular/core/testing';
import { lgvQuestion5 } from '../../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { pcvQuestion5 } from '../../../shared/constants/cpc-questions/cpc-pcv-questions.constants';
import { QuestionNumber, } from '../../../shared/constants/cpc-questions/cpc-question-combinations.constants';
import { question, question5 } from '../../../modules/tests/test-data/cat-cpc/_tests_/test-data.cat-cpc.mock';
describe('CPC Question Provider', function () {
    var cpcQuestionProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                CPCQuestionProvider,
            ],
        });
    });
    beforeEach(function () {
        cpcQuestionProvider = TestBed.get(CPCQuestionProvider);
    });
    describe('getQuestionsBank', function () {
        it('should return 4 questions for given lgv combination code', function () {
            var questions = cpcQuestionProvider.getQuestionsBank('LGV1');
            expect(questions.length).toEqual(4);
        });
        it('should return 4 questions for given pcv combination code', function () {
            var questions = cpcQuestionProvider.getQuestionsBank('PCV8');
            expect(questions.length).toEqual(4);
        });
    });
    describe('getQuestion5ByVehicleType', function () {
        it('should return the question 5 for the LGV', function () {
            var question5 = cpcQuestionProvider.getQuestion5ByVehicleType('LGV1');
            expect(question5).toEqual(lgvQuestion5);
        });
        it('should return the question 5 for the PSV', function () {
            var question5 = cpcQuestionProvider.getQuestion5ByVehicleType('PCV8');
            expect(question5).toEqual(pcvQuestion5);
        });
    });
    describe('getCombinations', function () {
        it('should return a list of only LGV codes for CCPC', function () {
            var combinations = cpcQuestionProvider.getCombinations("CCPC" /* CCPC */);
            var allCodesLGV = combinations
                .every(function (combination) { return combination.code.indexOf('LGV') > -1; });
            var shortCodes = combinations.map(function (combinations) { return combinations.code; });
            expect(allCodesLGV).toBe(true);
            expect(shortCodes).toEqual(['LGV1', 'LGV2', 'LGV3', 'LGV4', 'LGV5', 'LGV6', 'LGV7', 'LGV8']);
        });
        it('should return a list of only PCV codes for DCPC', function () {
            var combinations = cpcQuestionProvider.getCombinations("DCPC" /* DCPC */);
            var allCodesPCV = combinations
                .every(function (combination) { return combination.code.indexOf('PCV') > -1; });
            var shortCodes = combinations.map(function (combinations) { return combinations.code; });
            expect(allCodesPCV).toBe(true);
            expect(shortCodes).toEqual(['PCV1', 'PCV2', 'PCV3', 'PCV4', 'PCV5', 'PCV6', 'PCV7', 'PCV8']);
        });
    });
    describe('getQuestionScore', function () {
        beforeEach(function () {
            spyOn(cpcQuestionProvider, 'roundToNearestFive').and.callThrough();
        });
        it('should increment the total question score by 5 for every answer that is true', function () {
            var score = cpcQuestionProvider.getQuestionScore(question('1'), QuestionNumber.ONE);
            expect(cpcQuestionProvider.roundToNearestFive).not.toHaveBeenCalled();
            expect(score).toEqual(10);
        });
        it('should increment the total question5 score by 2 for every answer that is true and round to closest 5', function () {
            var score = cpcQuestionProvider.getQuestionScore(question5(), QuestionNumber.FIVE);
            // 8 trues with a score of 2 each = 16
            expect(cpcQuestionProvider.roundToNearestFive).toHaveBeenCalledWith(16);
            // score then gets rounded to nearest 5 from 16 down to 15
            expect(score).toEqual(15);
        });
    });
    describe('getTotalQuestionScore', function () {
        it('should sum the score value in each', function () {
            var testData = {
                combination: 'LGV1',
                question1: question('3'),
                question2: question('8'),
                question3: question('2'),
                question4: question('6'),
                question5: question5(),
                totalPercent: null,
            };
            var score = cpcQuestionProvider.getTotalQuestionScore(testData);
            expect(score).toEqual(95);
        });
    });
});
//# sourceMappingURL=cpc-questions.spec.js.map