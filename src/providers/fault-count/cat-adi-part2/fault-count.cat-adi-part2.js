import { pickBy } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { sumManoeuvreFaults } from '../../../shared/helpers/faults';
var FaultCountADIPart2Helper = /** @class */ (function () {
    function FaultCountADIPart2Helper() {
    }
    FaultCountADIPart2Helper.getDrivingFaultSumCountCatADIPart2 = function (data) {
        // The way how we store the driving faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, manoeuvres = data.manoeuvres, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks;
        var faultTotal = 0;
        getCompetencyFaults(drivingFaults).forEach(function (fault) { return faultTotal = faultTotal + fault.faultCount; });
        var controlledStopHasDrivingFault = (controlledStop && controlledStop.fault === CompetencyOutcome.DF) ? 1 : 0;
        var result = faultTotal +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.DF) +
            FaultCountADIPart2Helper.getVehicleChecksFaultCountCatADIPart2(vehicleChecks).drivingFaults +
            controlledStopHasDrivingFault;
        return result;
    };
    FaultCountADIPart2Helper.getSeriousFaultSumCountCatADIPart2 = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, manoeuvres = data.manoeuvres, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks, eyesightTest = data.eyesightTest;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var controlledStopSeriousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.S) ? 1 : 0;
        var eyesightTestSeriousFaults = (eyesightTest && eyesightTest.seriousFault) ? 1 : 0;
        var seriousFaultFromVehicleChecks = (vehicleChecks && vehicleChecks.seriousFault) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.S) +
            seriousFaultFromVehicleChecks +
            controlledStopSeriousFaults +
            eyesightTestSeriousFaults;
        return result;
    };
    FaultCountADIPart2Helper.getDangerousFaultSumCountCatADIPart2 = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var dangerousFaults = data.dangerousFaults, manoeuvres = data.manoeuvres, controlledStop = data.controlledStop, vehicleChecks = data.vehicleChecks;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var controlledStopDangerousFaults = (controlledStop && controlledStop.fault === CompetencyOutcome.D) ? 1 : 0;
        var dangerousFaultFromVehicleChecks = (vehicleChecks && vehicleChecks.dangerousFault) ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            sumManoeuvreFaults(manoeuvres, CompetencyOutcome.D) +
            dangerousFaultFromVehicleChecks +
            controlledStopDangerousFaults;
        return result;
    };
    FaultCountADIPart2Helper.getVehicleChecksFaultCountCatADIPart2 = function (vehicleChecks) {
        if (!vehicleChecks) {
            return {
                drivingFaults: 0,
                seriousFaults: 0,
            };
        }
        var tellMeQuestions = vehicleChecks.tellMeQuestions, showMeQuestions = vehicleChecks.showMeQuestions;
        var total = 0;
        if (tellMeQuestions) {
            total += tellMeQuestions.reduce(function (acc, question) {
                if (question.outcome === CompetencyOutcome.DF) {
                    return acc + 1;
                }
                return acc;
            }, 0);
        }
        if (showMeQuestions) {
            total += showMeQuestions.reduce(function (acc, question) {
                if (question.outcome === CompetencyOutcome.DF) {
                    return acc + 1;
                }
                return acc;
            }, 0);
        }
        return {
            drivingFaults: total,
            seriousFaults: 0,
        };
    };
    FaultCountADIPart2Helper.getVehicleChecksByOutcomeFaultCountCatADIPart2 = function (vehicleChecks, outcome) {
        if (!vehicleChecks) {
            return 0;
        }
        var tellMeQuestions = vehicleChecks.tellMeQuestions, showMeQuestions = vehicleChecks.showMeQuestions;
        var total = 0;
        if (tellMeQuestions) {
            total += tellMeQuestions.reduce(function (acc, question) {
                if (question.outcome === outcome) {
                    return acc + 1;
                }
                return acc;
            }, 0);
        }
        if (showMeQuestions) {
            total += showMeQuestions.reduce(function (acc, question) {
                if (question.outcome === outcome) {
                    return acc + 1;
                }
                return acc;
            }, 0);
        }
        return total;
    };
    FaultCountADIPart2Helper.getShowMeFaultCount = function (vehicleChecks) {
        var emptyResults = {
            drivingFaults: 0,
            seriousFaults: 0,
        };
        if (!vehicleChecks) {
            return emptyResults;
        }
        var showMeQuestions = vehicleChecks.showMeQuestions;
        if (!showMeQuestions) {
            return emptyResults;
        }
        var total = showMeQuestions.reduce(function (acc, question) {
            if (question.outcome === CompetencyOutcome.DF) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return {
            drivingFaults: total,
            seriousFaults: 0,
        };
    };
    FaultCountADIPart2Helper.getTellMeFaultCount = function (vehicleChecks) {
        var emptyResults = {
            drivingFaults: 0,
            seriousFaults: 0,
        };
        if (!vehicleChecks) {
            return emptyResults;
        }
        var tellMeQuestions = vehicleChecks.tellMeQuestions;
        if (!tellMeQuestions) {
            return emptyResults;
        }
        var total = tellMeQuestions.reduce(function (acc, question) {
            if (question.outcome === CompetencyOutcome.DF) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return {
            drivingFaults: total,
            seriousFaults: 0,
        };
    };
    return FaultCountADIPart2Helper;
}());
export { FaultCountADIPart2Helper };
//# sourceMappingURL=fault-count.cat-adi-part2.js.map