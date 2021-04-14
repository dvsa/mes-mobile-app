import { pickBy, get, has } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
var FaultCountHomeTestHelper = /** @class */ (function () {
    function FaultCountHomeTestHelper() {
    }
    FaultCountHomeTestHelper.getManoeuvreCountIfAny = function (data, competencyType) {
        var manoeuvreCount = 0;
        var hasManoeuvre = has(data, 'manoeuvres');
        if (hasManoeuvre) {
            var manoeuvres = get(data, 'manoeuvres', {});
            manoeuvreCount = sumManoeuvreFaults(manoeuvres, competencyType);
        }
        return manoeuvreCount;
    };
    FaultCountHomeTestHelper.getDrivingFaultSumCountCatHomeTest = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks, highwayCodeSafety = data.highwayCodeSafety;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;
        var hcodeSafetyHasDrivingFault = (highwayCodeSafety && highwayCodeSafety.drivingFault) ? 1 : 0;
        var result = faultTotal +
            FaultCountHomeTestHelper.getManoeuvreCountIfAny(data, CompetencyOutcome.DF) +
            FaultCountHomeTestHelper.getVehicleChecksFaultCountCatHomeTest(vehicleChecks).drivingFaults +
            controlledStopHasDrivingFault +
            hcodeSafetyHasDrivingFault;
        return result;
    };
    FaultCountHomeTestHelper.getSeriousFaultSumCountHomeTest = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, controlledStop = data.controlledStop, eyesightTest = data.eyesightTest, highwayCodeSafety = data.highwayCodeSafety;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;
        var controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
        var hcodeSafetyHasSeriousFault = (highwayCodeSafety && highwayCodeSafety.seriousFault) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            FaultCountHomeTestHelper.getManoeuvreCountIfAny(data, CompetencyOutcome.S) +
            controlledStopSeriousFaults +
            hcodeSafetyHasSeriousFault +
            eyesightTestSeriousFaults;
        return result;
    };
    FaultCountHomeTestHelper.getDangerousFaultSumCountHomeTest = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, controlledStop = data.controlledStop;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            FaultCountHomeTestHelper.getManoeuvreCountIfAny(data, CompetencyOutcome.D) +
            controlledStopDangerousFaults;
        return result;
    };
    FaultCountHomeTestHelper.getVehicleChecksFaultCountCatHomeTest = function (vehicleChecks) {
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
        if (totalFaultCount > 0) {
            return {
                drivingFaults: 1,
                seriousFaults: 0,
            };
        }
        return {
            drivingFaults: 0,
            seriousFaults: 0,
        };
    };
    return FaultCountHomeTestHelper;
}());
export { FaultCountHomeTestHelper };
//# sourceMappingURL=fault-count.cat-home-test.js.map