import { pickBy, get } from 'lodash';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
var FaultCountCHelper = /** @class */ (function () {
    function FaultCountCHelper() {
    }
    FaultCountCHelper.getDangerousFaultSumCountCatC = function (data) {
        return FaultCountCHelper.getDangerousFaultSumCountNonTrailer(data);
    };
    FaultCountCHelper.getDangerousFaultSumCountCatCE = function (data) {
        return FaultCountCHelper.getDangerousFaultSumCountTrailer(data);
    };
    FaultCountCHelper.getDangerousFaultSumCountCatC1E = function (data) {
        return FaultCountCHelper.getDangerousFaultSumCountTrailer(data);
    };
    FaultCountCHelper.getDangerousFaultSumCountCatC1 = function (data) {
        return FaultCountCHelper.getDangerousFaultSumCountNonTrailer(data);
    };
    FaultCountCHelper.getSeriousFaultSumCountCatC = function (data) {
        return FaultCountCHelper.getSeriousFaultSumCountNonTrailer(data);
    };
    FaultCountCHelper.getSeriousFaultSumCountCatC1 = function (data) {
        return FaultCountCHelper.getSeriousFaultSumCountNonTrailer(data);
    };
    FaultCountCHelper.getSeriousFaultSumCountCatCE = function (data) {
        return FaultCountCHelper.getSeriousFaultSumCountTrailer(data);
    };
    FaultCountCHelper.getSeriousFaultSumCountCatC1E = function (data) {
        return FaultCountCHelper.getSeriousFaultSumCountTrailer(data);
    };
    FaultCountCHelper.getDrivingFaultSumCountCatC = function (data) {
        return FaultCountCHelper.getDrivingFaultSumCountNonTrailer(data);
    };
    FaultCountCHelper.getDrivingFaultSumCountCatC1 = function (data) {
        return FaultCountCHelper.getDrivingFaultSumCountNonTrailer(data);
    };
    FaultCountCHelper.getDrivingFaultSumCountCatCE = function (data) {
        return FaultCountCHelper.getDrivingFaultSumCountTrailer(data);
    };
    FaultCountCHelper.getDrivingFaultSumCountCatC1E = function (data) {
        return FaultCountCHelper.getDrivingFaultSumCountTrailer(data);
    };
    FaultCountCHelper.getVehicleChecksFaultCountNonTrailer = function (vehicleChecks) {
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
    FaultCountCHelper.getVehicleChecksFaultCountTrailer = function (vehicleChecks) {
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
    FaultCountCHelper.getDrivingFaultSumCountNonTrailer = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountCHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks).drivingFaults;
        return result;
    };
    FaultCountCHelper.getDrivingFaultSumCountTrailer = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, uncoupleRecouple = data.uncoupleRecouple;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var uncoupleRecoupleHasDrivingFault = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.DF) ? 1 : 0;
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountCHelper.getVehicleChecksFaultCountTrailer(vehicleChecks).drivingFaults +
            uncoupleRecoupleHasDrivingFault;
        return result;
    };
    FaultCountCHelper.getSeriousFaultSumCountNonTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var vehicleCheckSeriousFaults = vehicleChecks ? FaultCountCHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks).seriousFaults : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            vehicleCheckSeriousFaults;
        return result;
    };
    FaultCountCHelper.getSeriousFaultSumCountTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, vehicleChecks = data.vehicleChecks, uncoupleRecouple = data.uncoupleRecouple;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var vehicleCheckSeriousFaults = vehicleChecks ? FaultCountCHelper.getVehicleChecksFaultCountTrailer(vehicleChecks).seriousFaults : 0;
        var uncoupleRecoupleSeriousFaults = (uncoupleRecouple && uncoupleRecouple.fault === CompetencyOutcome.S) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            vehicleCheckSeriousFaults +
            uncoupleRecoupleSeriousFaults;
        return result;
    };
    FaultCountCHelper.getDangerousFaultSumCountNonTrailer = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, manoeuvres = data.manoeuvres;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var result = dangerousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D);
        return result;
    };
    FaultCountCHelper.getDangerousFaultSumCountTrailer = function (data) {
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
    FaultCountCHelper.getVehicleChecksFaultCountCatC = function (vehicleChecks) {
        return FaultCountCHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks);
    };
    FaultCountCHelper.getVehicleChecksFaultCountCatCE = function (vehicleChecks) {
        return FaultCountCHelper.getVehicleChecksFaultCountTrailer(vehicleChecks);
    };
    FaultCountCHelper.getVehicleChecksFaultCountCatC1 = function (vehicleChecks) {
        return FaultCountCHelper.getVehicleChecksFaultCountNonTrailer(vehicleChecks);
    };
    FaultCountCHelper.getVehicleChecksFaultCountCatC1E = function (vehicleChecks) {
        return FaultCountCHelper.getVehicleChecksFaultCountTrailer(vehicleChecks);
    };
    return FaultCountCHelper;
}());
export { FaultCountCHelper };
//# sourceMappingURL=fault-count.cat-c.js.map