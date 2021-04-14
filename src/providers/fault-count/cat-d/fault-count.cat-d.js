import { pickBy, get } from 'lodash';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
var FaultCountDHelper = /** @class */ (function () {
    function FaultCountDHelper() {
    }
    FaultCountDHelper.getDangerousFaultSumCountCatD = function (data) {
        return FaultCountDHelper.getDangerousFaultSumCountNonTrailer(data);
    };
    FaultCountDHelper.getDangerousFaultSumCountCatDE = function (data) {
        return FaultCountDHelper.getDangerousFaultSumCountTrailer(data);
    };
    FaultCountDHelper.getDangerousFaultSumCountCatD1E = function (data) {
        return FaultCountDHelper.getDangerousFaultSumCountTrailer(data);
    };
    FaultCountDHelper.getDangerousFaultSumCountCatD1 = function (data) {
        return FaultCountDHelper.getDangerousFaultSumCountNonTrailer(data);
    };
    FaultCountDHelper.getSeriousFaultSumCountCatD = function (data) {
        return FaultCountDHelper.getSeriousFaultSumCountNonTrailer(data);
    };
    FaultCountDHelper.getSeriousFaultSumCountCatD1 = function (data) {
        return FaultCountDHelper.getSeriousFaultSumCountNonTrailer(data);
    };
    FaultCountDHelper.getSeriousFaultSumCountCatDE = function (data) {
        return FaultCountDHelper.getSeriousFaultSumCountTrailer(data);
    };
    FaultCountDHelper.getSeriousFaultSumCountCatD1E = function (data) {
        return FaultCountDHelper.getSeriousFaultSumCountTrailer(data);
    };
    FaultCountDHelper.getDrivingFaultSumCountCatD = function (data) {
        return FaultCountDHelper.getDrivingFaultSumCountNonTrailer(data);
    };
    FaultCountDHelper.getDrivingFaultSumCountCatD1 = function (data) {
        return FaultCountDHelper.getDrivingFaultSumCountNonTrailer(data);
    };
    FaultCountDHelper.getDrivingFaultSumCountCatDE = function (data) {
        return FaultCountDHelper.getDrivingFaultSumCountTrailer(data);
    };
    FaultCountDHelper.getDrivingFaultSumCountCatD1E = function (data) {
        return FaultCountDHelper.getDrivingFaultSumCountTrailer(data);
    };
    FaultCountDHelper.getSafetyQuestionsFaultCount = function (safetyQuestions) {
        if (!safetyQuestions) {
            return { drivingFaults: 0 };
        }
        var getFaults = function (safetyQuestion) {
            return safetyQuestion.outcome === CompetencyOutcome.DF;
        };
        var fault = safetyQuestions.questions.some(getFaults) ? { drivingFaults: 1 } : { drivingFaults: 0 };
        return fault;
    };
    FaultCountDHelper.getVehicleChecksFaultCountCatD = function (vehicleChecks) {
        return FaultCountDHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks);
    };
    FaultCountDHelper.getVehicleChecksFaultCountCatDE = function (vehicleChecks) {
        return FaultCountDHelper.getVehicleChecksFaultCountTrailer(vehicleChecks);
    };
    FaultCountDHelper.getVehicleChecksFaultCountCatD1 = function (vehicleChecks) {
        return FaultCountDHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks);
    };
    FaultCountDHelper.getVehicleChecksFaultCountCatD1E = function (vehicleChecks) {
        return FaultCountDHelper.getVehicleChecksFaultCountTrailer(vehicleChecks);
    };
    FaultCountDHelper.getVehicleChecksFaultCountNonTrailer = function (vehicleChecks) {
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
    FaultCountDHelper.getVehicleChecksFaultCountTrailer = function (vehicleChecks) {
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
        if (totalFaultCount === 2) {
            return {
                drivingFaults: 1,
                seriousFaults: 1,
            };
        }
        return {
            drivingFaults: totalFaultCount,
            seriousFaults: 0,
        };
    };
    FaultCountDHelper.getDrivingFaultSumCountNonTrailer = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, pcvDoorExercise = data.pcvDoorExercise, safetyQuestions = data.safetyQuestions;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var pcvDoorExerciseFaultCount = get(pcvDoorExercise, 'drivingFault') ? 1 : 0;
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountDHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks).drivingFaults +
            pcvDoorExerciseFaultCount +
            FaultCountDHelper.getSafetyQuestionsFaultCount(safetyQuestions).drivingFaults;
        return result;
    };
    FaultCountDHelper.getDrivingFaultSumCountTrailer = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, uncoupleRecouple = data.uncoupleRecouple, pcvDoorExercise = data.pcvDoorExercise, safetyQuestions = data.safetyQuestions;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var uncoupleRecoupleHasDrivingFault = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.DF) ? 1 : 0;
        var pcvDoorExerciseFaultCount = get(pcvDoorExercise, 'drivingFault') ? 1 : 0;
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountDHelper.getVehicleChecksFaultCountTrailer(vehicleChecks).drivingFaults +
            uncoupleRecoupleHasDrivingFault +
            pcvDoorExerciseFaultCount +
            FaultCountDHelper.getSafetyQuestionsFaultCount(safetyQuestions).drivingFaults;
        return result;
    };
    FaultCountDHelper.getSeriousFaultSumCountNonTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, pcvDoorExercise = data.pcvDoorExercise;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var vehicleCheckSeriousFaults = vehicleChecks ? FaultCountDHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks).seriousFaults : 0;
        var pcvDoorExerciseFaultCount = get(pcvDoorExercise, 'seriousFault') ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            vehicleCheckSeriousFaults +
            pcvDoorExerciseFaultCount;
        return result;
    };
    FaultCountDHelper.getSeriousFaultSumCountTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, uncoupleRecouple = data.uncoupleRecouple, pcvDoorExercise = data.pcvDoorExercise;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var vehicleCheckSeriousFaults = vehicleChecks ? FaultCountDHelper.getVehicleChecksFaultCountTrailer(vehicleChecks).seriousFaults : 0;
        var uncoupleRecoupleSeriousFaults = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;
        var pcvDoorExerciseFaultCount = get(pcvDoorExercise, 'seriousFault') ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            vehicleCheckSeriousFaults +
            uncoupleRecoupleSeriousFaults +
            pcvDoorExerciseFaultCount;
        return result;
    };
    FaultCountDHelper.getDangerousFaultSumCountNonTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, manoeuvres = data.manoeuvres, pcvDoorExercise = data.pcvDoorExercise;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var pcvDoorExerciseFaultCount = get(pcvDoorExercise, 'dangerousFault') ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
            pcvDoorExerciseFaultCount;
        return result;
    };
    FaultCountDHelper.getDangerousFaultSumCountTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, manoeuvres = data.manoeuvres, uncoupleRecouple = data.uncoupleRecouple, pcvDoorExercise = data.pcvDoorExercise;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var uncoupleRecoupleDangerousFaults = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.D) ? 1 : 0;
        var pcvDoorExerciseFaultCount = get(pcvDoorExercise, 'dangerousFault') ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
            pcvDoorExerciseFaultCount +
            uncoupleRecoupleDangerousFaults;
        return result;
    };
    return FaultCountDHelper;
}());
export { FaultCountDHelper };
//# sourceMappingURL=fault-count.cat-d.js.map