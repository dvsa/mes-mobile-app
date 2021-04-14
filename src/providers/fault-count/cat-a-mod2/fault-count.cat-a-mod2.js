import { get, pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
var FaultCountAM2Helper = /** @class */ (function () {
    function FaultCountAM2Helper() {
    }
    FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2 = function (safetyAndBalanceQuestions) {
        if (!safetyAndBalanceQuestions) {
            return { drivingFaults: 0 };
        }
        var safetyQuestions = get(safetyAndBalanceQuestions, 'safetyQuestions', []);
        var balanceQuestions = get(safetyAndBalanceQuestions, 'balanceQuestions', []);
        var numberOfIncorrectSafetyAnswers = safetyQuestions.filter(function (safetyQuestion) {
            return safetyQuestion.outcome === CompetencyOutcome.DF;
        }).length;
        var numberOfIncorrectBalanceAnswers = balanceQuestions.filter(function (balanceQuestion) {
            return balanceQuestion.outcome === CompetencyOutcome.DF;
        }).length;
        var totalIncorrectAnswerCount = numberOfIncorrectSafetyAnswers + numberOfIncorrectBalanceAnswers;
        return {
            drivingFaults: (totalIncorrectAnswerCount >= 1) ? 1 : 0,
        };
    };
    FaultCountAM2Helper.getRidingFaultSumCountCatAM2 = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, safetyAndBalanceQuestions = data.safetyAndBalanceQuestions;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        faultTotal += FaultCountAM2Helper.getSafetyAndBalanceFaultCountCatAM2(safetyAndBalanceQuestions).drivingFaults;
        return faultTotal;
    };
    FaultCountAM2Helper.getSeriousFaultSumCountCatAM2 = function (data) {
        var seriousFaults = data.seriousFaults, eyesightTest = data.eyesightTest;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            eyesightTestSeriousFaults;
        return result;
    };
    FaultCountAM2Helper.getDangerousFaultSumCountCatAM2 = function (data) {
        var dangerousFaults = data.dangerousFaults;
        return Object.keys(pickBy(dangerousFaults)).length;
    };
    return FaultCountAM2Helper;
}());
export { FaultCountAM2Helper };
//# sourceMappingURL=fault-count.cat-a-mod2.js.map