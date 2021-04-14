var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { lgvQuestion5, lgvQuestions } from '../../shared/constants/cpc-questions/cpc-lgv-questions.constants';
import { pcvQuestion5, pcvQuestions } from '../../shared/constants/cpc-questions/cpc-pcv-questions.constants';
import { questionCombinations, QuestionNumber, } from '../../shared/constants/cpc-questions/cpc-question-combinations.constants';
var CPCQuestionProvider = /** @class */ (function () {
    function CPCQuestionProvider() {
        var _this = this;
        this.getQuestionCombination = function (combinationCode) {
            return questionCombinations.find(function (question) { return question.code === combinationCode; });
        };
        this.getQuestionsByVehicleType = function (combinationCode) {
            return combinationCode.includes('LGV') ? lgvQuestions : pcvQuestions;
        };
        this.getQuestionScore = function (question, questionNumber) {
            var scorePerAnswer = 5;
            if (questionNumber === QuestionNumber.FIVE) {
                scorePerAnswer = 2;
            }
            var result = Object.keys(question).reduce(function (sum, key) {
                if (key.indexOf('answer') > -1) {
                    return sum + (question[key].selected ? scorePerAnswer : 0);
                }
                return sum;
            }, 0);
            if (questionNumber === QuestionNumber.FIVE) {
                return _this.roundToNearestFive(result);
            }
            return result;
        };
        this.roundToNearestFive = function (sum) { return Math.round(sum / 5) * 5; };
        this.getTotalQuestionScore = function (testData) {
            return Object.keys(testData).reduce(function (sum, key) {
                if (key.indexOf('question') > -1 && typeof testData[key] === 'object') {
                    return sum + (testData[key].score || 0);
                }
                return sum;
            }, 0);
        };
        this.getQuestion5ByVehicleType = function (combinationCode) {
            return combinationCode.includes('LGV') ? lgvQuestion5 : pcvQuestion5;
        };
        this.getQuestionsBank = function (combinationCode) {
            var questions = _this.getQuestionCombination(combinationCode).questions;
            return _this.getQuestionsByVehicleType(combinationCode)
                .filter(function (item) { return questions.includes(item.questionCode); })
                .sort(function (a, b) {
                return questions.indexOf(a.questionCode) - questions.indexOf(b.questionCode);
            });
        };
        this.getCombinations = function (testCategory) {
            switch (testCategory) {
                case "CCPC" /* CCPC */:
                    return questionCombinations.filter(function (questions) { return questions.code.includes('LGV'); });
                case "DCPC" /* DCPC */:
                    return questionCombinations.filter(function (questions) { return questions.code.includes('PCV'); });
                default:
                    return [];
            }
        };
    }
    CPCQuestionProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], CPCQuestionProvider);
    return CPCQuestionProvider;
}());
export { CPCQuestionProvider };
//# sourceMappingURL=cpc-questions.js.map