var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { get, forOwn, transform, endsWith } from 'lodash';
import { CommentSource, CompetencyIdentifiers } from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { manoeuvreCompetencyLabels as manoeuvreCompetencyLabelsCatAdiPart2, manoeuvreTypeLabels as manoeuvreTypeLabelsCatAdiPart2, } from '../../../shared/constants/competencies/catadi2-manoeuvres';
import { getCompetencyFaults, getCompetencyComment } from '../../../shared/helpers/get-competency-faults';
var FaultSummaryCatAdiPart2Helper = /** @class */ (function () {
    function FaultSummaryCatAdiPart2Helper() {
    }
    FaultSummaryCatAdiPart2Helper.getDrivingFaultsCatAdiPart2 = function (data, vehicleChecksScore) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getManoeuvreFaultsCatAdiPart2(data.manoeuvres, CompetencyOutcome.DF)), this.getControlledStopFault(data.controlledStop, CompetencyOutcome.DF)), this.getVehicleCheckDrivingFaultsCatAdiPart2(data.vehicleChecks, vehicleChecksScore));
    };
    FaultSummaryCatAdiPart2Helper.getSeriousFaultsCatAdiPart2 = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getManoeuvreFaultsCatAdiPart2(data.manoeuvres, CompetencyOutcome.S)), this.getControlledStopFault(data.controlledStop, CompetencyOutcome.S)), this.getVehicleCheckSeriousFaultsCatAdiPart2(data.vehicleChecks)), this.getEyesightTestSeriousFault(data.eyesightTest));
    };
    FaultSummaryCatAdiPart2Helper.getDangerousFaultsCatAdiPart2 = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), this.getManoeuvreFaultsCatAdiPart2(data.manoeuvres, CompetencyOutcome.D)), this.getControlledStopFault(data.controlledStop, CompetencyOutcome.D)), this.getVehicleCheckDangerousFaultsCatAdiPart2(data.vehicleChecks));
    };
    FaultSummaryCatAdiPart2Helper.getEyesightTestSeriousFault = function (eyesightTest) {
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
    FaultSummaryCatAdiPart2Helper.getControlledStopFault = function (controlledStop, faultType) {
        var returnCompetencies = [];
        if (!controlledStop || controlledStop.fault !== faultType) {
            return returnCompetencies;
        }
        var result = {
            competencyDisplayName: CompetencyDisplayName.CONTROLLED_STOP,
            competencyIdentifier: CompetencyIdentifiers.CONTROLLED_STOP,
            comment: controlledStop.faultComments || '',
            source: CommentSource.CONTROLLED_STOP,
            faultCount: 1,
        };
        returnCompetencies.push(result);
        return returnCompetencies;
    };
    FaultSummaryCatAdiPart2Helper.createManoeuvreFaultCatAdiPart2 = function (key, type, competencyComment, index) {
        var manoeuvreFaultSummary = {
            comment: competencyComment || '',
            competencyIdentifier: "" + type + manoeuvreCompetencyLabelsCatAdiPart2[key],
            competencyDisplayName: manoeuvreTypeLabelsCatAdiPart2[type] + " - " + manoeuvreCompetencyLabelsCatAdiPart2[key],
            source: CommentSource.MANOEUVRES + "-" + index + "-" + type + "-" + manoeuvreCompetencyLabelsCatAdiPart2[key],
            faultCount: 1,
        };
        return manoeuvreFaultSummary;
    };
    FaultSummaryCatAdiPart2Helper.getVehicleCheckDrivingFaultsCatAdiPart2 = function (vehicleChecks, vehicleCheckFaults) {
        var result = [];
        if (!vehicleChecks || !vehicleChecks.showMeQuestions || !vehicleChecks.tellMeQuestions) {
            return result;
        }
        var dangerousFaults = vehicleChecks.showMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.D; });
        var seriousFaults = vehicleChecks.showMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.S; });
        if (dangerousFaults.length > 0 || seriousFaults.length > 0) {
            return result;
        }
        if (vehicleCheckFaults.drivingFaults > 0) {
            var competency = {
                comment: vehicleChecks.showMeTellMeComments || '',
                competencyIdentifier: CommentSource.VEHICLE_CHECKS,
                competencyDisplayName: CompetencyDisplayName.VEHICLE_CHECKS,
                source: CommentSource.VEHICLE_CHECKS,
                faultCount: vehicleCheckFaults.drivingFaults,
            };
            result.push(competency);
        }
        return result;
    };
    FaultSummaryCatAdiPart2Helper.getVehicleCheckSeriousFaultsCatAdiPart2 = function (vehicleChecks) {
        var result = [];
        if (!vehicleChecks) {
            return result;
        }
        var showMeQuestions = get(vehicleChecks, 'showMeQuestions', []);
        var tellMeQuestions = get(vehicleChecks, 'tellMeQuestions', []);
        var showMeFaults = showMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.DF; });
        var tellMeFaults = tellMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.DF; });
        var seriousFaultCount = (vehicleChecks.seriousFault || (showMeFaults.length + tellMeFaults.length === 5)) ? 1 : 0;
        var competency = {
            comment: vehicleChecks.showMeTellMeComments || '',
            competencyIdentifier: CommentSource.VEHICLE_CHECKS,
            competencyDisplayName: CompetencyDisplayName.VEHICLE_CHECKS,
            source: CommentSource.VEHICLE_CHECKS,
            faultCount: seriousFaultCount,
        };
        seriousFaultCount > 0 && result.push(competency);
        return result;
    };
    FaultSummaryCatAdiPart2Helper.getVehicleCheckDangerousFaultsCatAdiPart2 = function (vehicleChecks) {
        var result = [];
        if (!vehicleChecks) {
            return result;
        }
        var dangerousFaultCount = vehicleChecks.dangerousFault ? 1 : 0;
        var competency = {
            comment: vehicleChecks.showMeTellMeComments || '',
            competencyIdentifier: CommentSource.VEHICLE_CHECKS,
            competencyDisplayName: CompetencyDisplayName.VEHICLE_CHECKS,
            source: CommentSource.VEHICLE_CHECKS,
            faultCount: dangerousFaultCount,
        };
        dangerousFaultCount > 0 && result.push(competency);
        return result;
    };
    FaultSummaryCatAdiPart2Helper.getManoeuvreFaultsCatAdiPart2 = function (manoeuvres, faultType) {
        var _this = this;
        var faultsEncountered = [];
        manoeuvres.forEach(function (manoeuvre, position) {
            forOwn(manoeuvre, function (manoeuvre, type) {
                var faults = [];
                if (!manoeuvre.selected) {
                    faults = [];
                }
                else {
                    faults = transform(manoeuvre, function (result, value, key) {
                        if (endsWith(key, CompetencyIdentifiers.FAULT_SUFFIX) && value === faultType) {
                            var competencyComment = getCompetencyComment(key, manoeuvre.controlFaultComments, manoeuvre.observationFaultComments);
                            result.push(_this.createManoeuvreFaultCatAdiPart2(key, type, competencyComment, position));
                        }
                    }, []);
                }
                faultsEncountered.push.apply(faultsEncountered, faults);
            });
        });
        return faultsEncountered;
    };
    return FaultSummaryCatAdiPart2Helper;
}());
export { FaultSummaryCatAdiPart2Helper };
//# sourceMappingURL=fault-summary.cat-adi-part2.js.map