import { pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
var FaultCountBHelper = /** @class */ (function () {
    function FaultCountBHelper() {
    }
    FaultCountBHelper.getDrivingFaultSumCountCatB = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountBHelper.getVehicleChecksFaultCountCatB(vehicleChecks) +
            controlledStopHasDrivingFault;
        return result;
    };
    FaultCountBHelper.getSeriousFaultSumCountCatB = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks, eyesightTest = data.eyesightTest;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var vehicleCheckSeriousFaults = (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) ? 1 : 0;
        var controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
        var eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            vehicleCheckSeriousFaults +
            controlledStopSeriousFaults +
            eyesightTestSeriousFaults;
        return result;
    };
    FaultCountBHelper.getDangerousFaultSumCountCatB = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, manoeuvres = data.manoeuvres, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var vehicleCheckDangerousFaults = (vehicleChecks && vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D) ? 1 : 0;
        var controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
            vehicleCheckDangerousFaults +
            controlledStopDangerousFaults;
        return result;
    };
    FaultCountBHelper.getVehicleChecksFaultCountCatB = function (vehicleChecks) {
        if (!vehicleChecks) {
            return 0;
        }
        var showMeQuestion = vehicleChecks.showMeQuestion, tellMeQuestion = vehicleChecks.tellMeQuestion;
        if (showMeQuestion.outcome === CompetencyOutcome.S || showMeQuestion.outcome === CompetencyOutcome.D) {
            return 0;
        }
        if (showMeQuestion.outcome === CompetencyOutcome.DF || tellMeQuestion.outcome === CompetencyOutcome.DF) {
            return 1;
        }
        return 0;
    };
    return FaultCountBHelper;
}());
export { FaultCountBHelper };
//# sourceMappingURL=fault-count.cat-b.js.map