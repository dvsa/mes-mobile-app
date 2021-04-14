import { pickBy, get } from 'lodash';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
var FaultCountBEHelper = /** @class */ (function () {
    function FaultCountBEHelper() {
    }
    FaultCountBEHelper.getVehicleChecksFaultCountCatBE = function (vehicleChecks) {
        if (!vehicleChecks) {
            return { seriousFaults: 0, drivingFaults: 0 };
        }
        var showMeQuestions = get(vehicleChecks, 'showMeQuestions', []);
        var tellMeQuestions = get(vehicleChecks, 'tellMeQuestions', []);
        var numberOfShowMeFaults = showMeQuestions.filter(function (showMeQuestion) {
            return showMeQuestion.outcome === CompetencyOutcome.DF;
        }).length;
        var numberOfTellMeFaults = tellMeQuestions.filter(function (tellMeQuestion) {
            return tellMeQuestion.outcome === CompetencyOutcome.DF;
        }).length;
        var totalFaultCount = numberOfShowMeFaults + numberOfTellMeFaults;
        if (totalFaultCount === 5) {
            return {
                drivingFaults: 4,
                seriousFaults: 1,
            };
        }
        return {
            drivingFaults: totalFaultCount,
            seriousFaults: 0,
        };
    };
    FaultCountBEHelper.getDrivingFaultSumCountCatBE = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, uncoupleRecouple = data.uncoupleRecouple;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var uncoupleRecoupleHasDrivingFault = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.DF) ? 1 : 0;
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountBEHelper.getVehicleChecksFaultCountCatBE(vehicleChecks).drivingFaults +
            uncoupleRecoupleHasDrivingFault;
        return result;
    };
    FaultCountBEHelper.getSeriousFaultSumCountCatBE = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, uncoupleRecouple = data.uncoupleRecouple, eyesightTest = data.eyesightTest;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var vehicleCheckSeriousFaults = vehicleChecks ? FaultCountBEHelper.getVehicleChecksFaultCountCatBE(vehicleChecks).seriousFaults : 0;
        var uncoupleRecoupleSeriousFaults = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;
        var eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            vehicleCheckSeriousFaults +
            eyesightTestSeriousFaults +
            uncoupleRecoupleSeriousFaults;
        return result;
    };
    FaultCountBEHelper.getDangerousFaultSumCountCatBE = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, manoeuvres = data.manoeuvres, uncoupleRecouple = data.uncoupleRecouple;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var uncoupleRecoupleDangerousFaults = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.D) ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
            uncoupleRecoupleDangerousFaults;
        return result;
    };
    return FaultCountBEHelper;
}());
export { FaultCountBEHelper };
//# sourceMappingURL=fault-count.cat-be.js.map