var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { CommentSource, CompetencyIdentifiers } from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
var FaultSummaryCatAM2Helper = /** @class */ (function () {
    function FaultSummaryCatAM2Helper() {
    }
    FaultSummaryCatAM2Helper.getDrivingFaultsCatAM2 = function (data) {
        return __spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getSafetyAndBalanceFaults(data.safetyAndBalanceQuestions));
    };
    FaultSummaryCatAM2Helper.getSeriousFaultsCatAM2 = function (data) {
        return __spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getEyesightTestSeriousFault(data.eyesightTest));
    };
    FaultSummaryCatAM2Helper.getDangerousFaultsCatAM2 = function (data) {
        return __spreadArray([], getCompetencyFaults(data.dangerousFaults));
    };
    FaultSummaryCatAM2Helper.getEyesightTestSeriousFault = function (eyesightTest) {
        if (!eyesightTest || !eyesightTest.seriousFault) {
            return [];
        }
        return [{
                competencyDisplayName: CompetencyDisplayName.EYESIGHT_TEST,
                competencyIdentifier: CompetencyIdentifiers.EYESIGHT_TEST,
                comment: eyesightTest.faultComments || '',
                source: CommentSource.EYESIGHT_TEST,
                faultCount: 1,
            }];
    };
    FaultSummaryCatAM2Helper.getSafetyAndBalanceFaults = function (safetyAndBalance) {
        if (!safetyAndBalance) {
            return [];
        }
        var allSafetyQuestions = safetyAndBalance.safetyQuestions;
        var allBalanceQuestions = safetyAndBalance.balanceQuestions;
        var someSafetyQuestionsFailed = allSafetyQuestions.some(function (v) { return v.outcome === CompetencyOutcome.DF; });
        var someBalanceQuestionsFailed = allBalanceQuestions.some(function (v) { return v.outcome === CompetencyOutcome.DF; });
        if (someSafetyQuestionsFailed || someBalanceQuestionsFailed) {
            return [{
                    competencyDisplayName: CompetencyDisplayName.SAFETY_AND_BALANCE_QUESTIONS,
                    competencyIdentifier: 'safetyAndBalanceQuestions',
                    source: CommentSource.SAFETY_AND_BALANCE_QUESTIONS,
                    comment: safetyAndBalance.safetyAndBalanceComments || '',
                    faultCount: 1,
                }];
        }
        return [];
    };
    return FaultSummaryCatAM2Helper;
}());
export { FaultSummaryCatAM2Helper };
//# sourceMappingURL=fault-summary.cat-a-mod2.js.map