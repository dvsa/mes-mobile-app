var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import tellMeQuestionsCatAdiPart2Constants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';
import showMeQuestionsCatAdiPart2Constants from '../../shared/constants/show-me-questions/show-me-questions.cat-adi-part2.constants';
import tellMeQuestionsCatBConstants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-b.constants';
import showMeQuestionsCatBConstants from '../../shared/constants/show-me-questions/show-me-questions.cat-b.constants';
import tellMeQuestionsCatBeConstants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import showMeQuestionsCatBeConstants from '../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
import tellMeQuestionsVocationalConstants from '../../shared/constants/tell-me-questions/tell-me-questions.vocational.constants';
import tellMeQuestionsVocationalTrailerConstants from '../../shared/constants/tell-me-questions/tell-me-questions.vocational-trailer.constants';
import showMeQuestionsVocationalConstants from '../../shared/constants/show-me-questions/show-me-questions.vocational.constants';
import showMeQuestionsVocationalTrailerConstants from '../../shared/constants/show-me-questions/show-me-questions.vocational-trailer.constants';
import safetyQuestionsCatAMod2Constants from '../../shared/constants/safety-questions.cat-a-mod2.constants';
import balanceQuestionsCatAMod2Constants from '../../shared/constants/balance-questions.cat-a-mod2.constants';
import safetyQuestionsCatDConstants from '../../shared/constants/safety-questions.cat-d.constants';
import showMeQuestionsCatHomeTestConstants from '../../shared/constants/show-me-questions/show-me-questions.cat-home-test.constants';
import tellMeQuestionsCatHomeTestConstants from '../../shared/constants/tell-me-questions/tell-me-questions.cat-home-test.constants';
var QuestionProvider = /** @class */ (function () {
    function QuestionProvider() {
    }
    QuestionProvider.prototype.getTellMeQuestions = function (testCategory) {
        switch (testCategory) {
            case "ADI2" /* ADI2 */:
                return tellMeQuestionsCatAdiPart2Constants;
            case "B" /* B */:
                return tellMeQuestionsCatBConstants;
            case "B+E" /* BE */:
                return tellMeQuestionsCatBeConstants;
            case "C" /* C */:
            case "C1" /* C1 */:
            case "D" /* D */:
            case "D1" /* D1 */:
                return tellMeQuestionsVocationalConstants;
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                return tellMeQuestionsVocationalTrailerConstants;
            case "K" /* K */:
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
                return tellMeQuestionsCatHomeTestConstants;
            default:
                return [];
        }
    };
    QuestionProvider.prototype.getShowMeQuestions = function (testCategory) {
        switch (testCategory) {
            case "ADI2" /* ADI2 */:
                return showMeQuestionsCatAdiPart2Constants;
            case "B" /* B */:
                return showMeQuestionsCatBConstants;
            case "B+E" /* BE */:
                return showMeQuestionsCatBeConstants;
            case "C" /* C */:
            case "C1" /* C1 */:
            case "D" /* D */:
            case "D1" /* D1 */:
                return showMeQuestionsVocationalConstants;
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                return showMeQuestionsVocationalTrailerConstants;
            case "K" /* K */:
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
                return showMeQuestionsCatHomeTestConstants;
            default:
                return [];
        }
    };
    QuestionProvider.prototype.getSafetyQuestions = function (testCategory) {
        switch (testCategory) {
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAM2" /* EUAM2 */:
            case "EUAMM2" /* EUAMM2 */:
                return safetyQuestionsCatAMod2Constants;
            default:
                return [];
        }
    };
    QuestionProvider.prototype.getBalanceQuestions = function (testCategory) {
        switch (testCategory) {
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAM2" /* EUAM2 */:
            case "EUAMM2" /* EUAMM2 */:
                return balanceQuestionsCatAMod2Constants;
            default:
                return [];
        }
    };
    QuestionProvider.prototype.getVocationalSafetyQuestions = function (testCategory) {
        switch (testCategory) {
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                return safetyQuestionsCatDConstants;
            default:
                return [];
        }
    };
    QuestionProvider = __decorate([
        Injectable()
    ], QuestionProvider);
    return QuestionProvider;
}());
export { QuestionProvider };
//# sourceMappingURL=question.js.map