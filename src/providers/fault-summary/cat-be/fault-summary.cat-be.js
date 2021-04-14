var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { endsWith, forOwn, get, transform } from 'lodash';
import { CommentSource, CompetencyIdentifiers } from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { manoeuvreCompetencyLabels as manoeuvreCompetencyLabelsCatBe, manoeuvreTypeLabels as manoeuvreTypeLabelsCatBe, } from '../../../shared/constants/competencies/catbe-manoeuvres';
import { getCompetencyFaults, getCompetencyComment } from '../../../shared/helpers/get-competency-faults';
var FaultSummaryCatBEHelper = /** @class */ (function () {
    function FaultSummaryCatBEHelper() {
    }
    FaultSummaryCatBEHelper.getDrivingFaultsCatBE = function (data, vehicleChecksScore) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getManoeuvreFaultsCatBE(data.manoeuvres, CompetencyOutcome.DF)), this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.DF)), this.getVehicleCheckDrivingFaultsCatBE(data.vehicleChecks, vehicleChecksScore));
    };
    FaultSummaryCatBEHelper.getSeriousFaultsCatBE = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getManoeuvreFaultsCatBE(data.manoeuvres, CompetencyOutcome.S)), this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.S)), this.getVehicleCheckSeriousFaultsCatBE(data.vehicleChecks)), this.getEyesightTestSeriousFault(data.eyesightTest));
    };
    FaultSummaryCatBEHelper.getDangerousFaultsCatBE = function (data) {
        return __spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), this.getManoeuvreFaultsCatBE(data.manoeuvres, CompetencyOutcome.D)), this.getUncoupleRecoupleFault(data.uncoupleRecouple, CompetencyOutcome.D));
    };
    FaultSummaryCatBEHelper.getEyesightTestSeriousFault = function (eyesightTest) {
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
    FaultSummaryCatBEHelper.getUncoupleRecoupleFault = function (uncoupleRecouple, faultType) {
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
    FaultSummaryCatBEHelper.createManoeuvreFaultCatBe = function (key, type, competencyComment) {
        var manoeuvreFaultSummary = {
            comment: competencyComment || '',
            competencyIdentifier: "" + type + manoeuvreCompetencyLabelsCatBe[key],
            competencyDisplayName: manoeuvreTypeLabelsCatBe[type] + " - " + manoeuvreCompetencyLabelsCatBe[key],
            source: CommentSource.MANOEUVRES + "-" + type + "-" + manoeuvreCompetencyLabelsCatBe[key],
            faultCount: 1,
        };
        return manoeuvreFaultSummary;
    };
    FaultSummaryCatBEHelper.getManoeuvreFaultsCatBE = function (manoeuvres, faultType) {
        var _this = this;
        var faultsEncountered = [];
        // TODO: Replace any with Manoeuvres and change the transform function
        forOwn(manoeuvres, function (manoeuvre, type) {
            var faults = !manoeuvre.selected ? [] : transform(manoeuvre, function (result, value, key) {
                if (endsWith(key, 'Fault') && value === faultType) {
                    var competencyComment = getCompetencyComment(key, manoeuvre.controlFaultComments, manoeuvre.observationFaultComments);
                    result.push(_this.createManoeuvreFaultCatBe(key, type, competencyComment));
                }
            }, []);
            faultsEncountered.push.apply(faultsEncountered, faults);
        });
        return faultsEncountered;
    };
    FaultSummaryCatBEHelper.getVehicleCheckSeriousFaultsCatBE = function (vehicleChecks) {
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
    FaultSummaryCatBEHelper.getVehicleCheckDrivingFaultsCatBE = function (vehicleChecks, vehicleCheckFaults) {
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
    return FaultSummaryCatBEHelper;
}());
export { FaultSummaryCatBEHelper };
//# sourceMappingURL=fault-summary.cat-be.js.map