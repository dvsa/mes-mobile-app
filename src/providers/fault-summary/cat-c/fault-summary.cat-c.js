var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { endsWith, forOwn, get, transform } from 'lodash';
import { CommentSource, CompetencyIdentifiers } from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults, getCompetencyComment } from '../../../shared/helpers/get-competency-faults';
import { manoeuvreCompetencyLabelsCatC, manoeuvreTypeLabelsCatC, } from '../../../shared/constants/competencies/catc-manoeuvres';
var FaultSummaryCatCHelper = /** @class */ (function () {
    function FaultSummaryCatCHelper() {
    }
    FaultSummaryCatCHelper.getDrivingFaultsNonTrailer = function (data, category, vehicleChecksScore) {
        return __spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getManoeuvreFaultsCatC(data.manoeuvres, CompetencyOutcome.DF)), this.getVehicleCheckDrivingFaultsCatC(data.vehicleChecks, category, vehicleChecksScore));
    };
    FaultSummaryCatCHelper.getSeriousFaultsNonTrailer = function (data) {
        return __spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getManoeuvreFaultsCatC(data.manoeuvres, CompetencyOutcome.S)), this.getVehicleCheckSeriousFaultsNonTrailer(data.vehicleChecks));
    };
    FaultSummaryCatCHelper.getDangerousFaultsNonTrailer = function (data) {
        return __spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), this.getManoeuvreFaultsCatC(data.manoeuvres, CompetencyOutcome.D));
    };
    FaultSummaryCatCHelper.getDrivingFaultsTrailer = function (data, category, vehicleChecksScore) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getManoeuvreFaultsCatC(data.manoeuvres, CompetencyOutcome.DF)), this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.DF)), this.getVehicleCheckDrivingFaultsCatC(data.vehicleChecks, category, vehicleChecksScore));
    };
    FaultSummaryCatCHelper.getSeriousFaultsTrailer = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getManoeuvreFaultsCatC(data.manoeuvres, CompetencyOutcome.S)), this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.S)), this.getVehicleCheckSeriousFaultsTrailer(data.vehicleChecks));
    };
    FaultSummaryCatCHelper.getDangerousFaultsTrailer = function (data) {
        return __spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), this.getManoeuvreFaultsCatC(data.manoeuvres, CompetencyOutcome.D)), this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.D));
    };
    FaultSummaryCatCHelper.createManoeuvreFaultCatC = function (key, type, competencyComment) {
        var manoeuvreFaultSummary = {
            comment: competencyComment || '',
            competencyIdentifier: "" + type + manoeuvreCompetencyLabelsCatC[key],
            competencyDisplayName: manoeuvreTypeLabelsCatC[type] + " - " + manoeuvreCompetencyLabelsCatC[key],
            source: CommentSource.MANOEUVRES + "-" + type + "-" + manoeuvreCompetencyLabelsCatC[key],
            faultCount: 1,
        };
        return manoeuvreFaultSummary;
    };
    FaultSummaryCatCHelper.getManoeuvreFaultsCatC = function (manoeuvres, faultType) {
        var _this = this;
        var faultsEncountered = [];
        // TODO: Replace any with Manoeuvres and change the transform function
        forOwn(manoeuvres, function (manoeuvre, type) {
            var faults = !manoeuvre.selected ? [] : transform(manoeuvre, function (result, value, key) {
                if (endsWith(key, CompetencyIdentifiers.FAULT_SUFFIX) && value === faultType) {
                    var competencyComment = getCompetencyComment(key, manoeuvre.controlFaultComments, manoeuvre.observationFaultComments);
                    result.push(_this.createManoeuvreFaultCatC(key, type, competencyComment));
                }
            }, []);
            faultsEncountered.push.apply(faultsEncountered, faults);
        });
        return faultsEncountered;
    };
    FaultSummaryCatCHelper.getVehicleCheckDrivingFaultsCatC = function (vehicleChecks, category, vehicleCheckFaults) {
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
    FaultSummaryCatCHelper.getVehicleCheckSeriousFaultsNonTrailer = function (vehicleChecks) {
        var result = [];
        if (!vehicleChecks) {
            return result;
        }
        var showMeQuestions = get(vehicleChecks, 'showMeQuestions', []);
        var tellMeQuestions = get(vehicleChecks, 'tellMeQuestions', []);
        var showMeFaults = showMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.DF; });
        var tellMeFaults = tellMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.DF; });
        var seriousFaultCount = showMeFaults.length + tellMeFaults.length === 5 ? 1 : 0;
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
    FaultSummaryCatCHelper.getVehicleCheckSeriousFaultsTrailer = function (vehicleChecks) {
        var result = [];
        if (!vehicleChecks) {
            return result;
        }
        var showMeQuestions = get(vehicleChecks, 'showMeQuestions', []);
        var tellMeQuestions = get(vehicleChecks, 'tellMeQuestions', []);
        var showMeFaults = showMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.DF; });
        var tellMeFaults = tellMeQuestions.filter(function (fault) { return fault.outcome === CompetencyOutcome.DF; });
        var seriousFaultCount = showMeFaults.length + tellMeFaults.length === 2 ? 1 : 0;
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
    FaultSummaryCatCHelper.getUncoupleRecoupleFault = function (uncoupleRecouple, faultType) {
        var returnCompetencies = [];
        if (!uncoupleRecouple || uncoupleRecouple.fault !== faultType) {
            return returnCompetencies;
        }
        var result = {
            competencyDisplayName: CompetencyDisplayName.UNCOUPLE_RECOUPLE,
            competencyIdentifier: 'uncoupleRecouple',
            comment: uncoupleRecouple.faultComments || '',
            source: CommentSource.UNCOUPLE_RECOUPLE,
            faultCount: 1,
        };
        returnCompetencies.push(result);
        return returnCompetencies;
    };
    return FaultSummaryCatCHelper;
}());
export { FaultSummaryCatCHelper };
//# sourceMappingURL=fault-summary.cat-c.js.map