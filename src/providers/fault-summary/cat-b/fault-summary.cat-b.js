var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { endsWith, forOwn, transform } from 'lodash';
import { CommentSource, CompetencyIdentifiers } from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { manoeuvreCompetencyLabels as manoeuvreCompetencyLabelsCatB, manoeuvreTypeLabels as manoeuvreTypeLabelsCatB, } from '../../../shared/constants/competencies/catb-manoeuvres';
import { getCompetencyFaults, getCompetencyComment } from '../../../shared/helpers/get-competency-faults';
var FaultSummaryCatBHelper = /** @class */ (function () {
    function FaultSummaryCatBHelper() {
    }
    FaultSummaryCatBHelper.getDrivingFaultsCatB = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getManoeuvreFaultsCatB(data.manoeuvres, CompetencyOutcome.DF)), this.getControlledStopFault(data.controlledStop, CompetencyOutcome.DF)), this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.DF));
    };
    FaultSummaryCatBHelper.getSeriousFaultsCatB = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getManoeuvreFaultsCatB(data.manoeuvres, CompetencyOutcome.S)), this.getControlledStopFault(data.controlledStop, CompetencyOutcome.S)), this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.S)), this.getEyesightTestSeriousFault(data.eyesightTest));
    };
    FaultSummaryCatBHelper.getDangerousFaultsCatB = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), this.getManoeuvreFaultsCatB(data.manoeuvres, CompetencyOutcome.D)), this.getControlledStopFault(data.controlledStop, CompetencyOutcome.D)), this.getVehicleCheckFaultsCatB(data.vehicleChecks, CompetencyOutcome.D));
    };
    FaultSummaryCatBHelper.getEyesightTestSeriousFault = function (eyesightTest) {
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
    FaultSummaryCatBHelper.getControlledStopFault = function (controlledStop, faultType) {
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
    FaultSummaryCatBHelper.createManoeuvreFaultCatB = function (key, type, competencyComment) {
        var manoeuvreFaultSummary = {
            comment: competencyComment || '',
            competencyIdentifier: "" + type + manoeuvreCompetencyLabelsCatB[key],
            competencyDisplayName: manoeuvreTypeLabelsCatB[type] + " - " + manoeuvreCompetencyLabelsCatB[key],
            source: CommentSource.MANOEUVRES + "-" + type + "-" + manoeuvreCompetencyLabelsCatB[key],
            faultCount: 1,
        };
        return manoeuvreFaultSummary;
    };
    FaultSummaryCatBHelper.getVehicleCheckFaultsCatB = function (vehicleChecks, faultType) {
        var result = [];
        if (!vehicleChecks) {
            return result;
        }
        var isValidDangerousFault = faultType === CompetencyOutcome.D &&
            vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D;
        var isValidSeriousFault = faultType === CompetencyOutcome.S &&
            vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S;
        var isValidDrivingFault = faultType === CompetencyOutcome.DF &&
            (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF ||
                vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF);
        if (isValidDangerousFault || isValidSeriousFault || isValidDrivingFault) {
            var competency = {
                comment: vehicleChecks.showMeTellMeComments || '',
                competencyIdentifier: CommentSource.VEHICLE_CHECKS,
                competencyDisplayName: CompetencyDisplayName.SHOW_ME_TELL_ME,
                source: CommentSource.VEHICLE_CHECKS,
                faultCount: 1,
            };
            result.push(competency);
        }
        return result;
    };
    FaultSummaryCatBHelper.getManoeuvreFaultsCatB = function (manoeuvres, faultType) {
        var _this = this;
        var faultsEncountered = [];
        // TODO: Replace any with Manoeuvres and change the transform function
        forOwn(manoeuvres, function (manoeuvre, type) {
            var faults = !manoeuvre.selected ? [] : transform(manoeuvre, function (result, value, key) {
                if (endsWith(key, CompetencyIdentifiers.FAULT_SUFFIX) && value === faultType) {
                    var competencyComment = getCompetencyComment(key, manoeuvre.controlFaultComments, manoeuvre.observationFaultComments);
                    result.push(_this.createManoeuvreFaultCatB(key, type, competencyComment));
                }
            }, []);
            faultsEncountered.push.apply(faultsEncountered, faults);
        });
        return faultsEncountered;
    };
    return FaultSummaryCatBHelper;
}());
export { FaultSummaryCatBHelper };
//# sourceMappingURL=fault-summary.cat-b.js.map