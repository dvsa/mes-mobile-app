var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { endsWith, forOwn, transform, has, get } from 'lodash';
import { CommentSource, CompetencyIdentifiers } from '../../../shared/models/fault-marking.model';
import { CompetencyDisplayName } from '../../../shared/models/competency-display-name';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { manoeuvreCompetencyLabels as manoeuvreCompetencyLabelsCatHomeTest, manoeuvreTypeLabels as manoeuvreTypeLabelsCatHomeTest, } from '../../../shared/constants/competencies/catb-manoeuvres';
import { getCompetencyFaults, getCompetencyComment } from '../../../shared/helpers/get-competency-faults';
var FaultSummaryCatHomeTestHelper = /** @class */ (function () {
    function FaultSummaryCatHomeTestHelper() {
    }
    FaultSummaryCatHomeTestHelper.getDrivingFaultsCatHomeTest = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), this.getManoeuvreFaultsIfAny(data, CompetencyOutcome.DF)), this.getControlledStop(data, CompetencyOutcome.DF)), this.getHighwayCodeSafety(data, 'drivingFault')), this.getVehicleCheckFaultsCatHomeTest(data.vehicleChecks, CompetencyOutcome.DF));
    };
    FaultSummaryCatHomeTestHelper.getSeriousFaultsCatHomeTest = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), this.getManoeuvreFaultsIfAny(data, CompetencyOutcome.S)), this.getVehicleCheckFaultsCatHomeTest(data.vehicleChecks, CompetencyOutcome.S)), this.getControlledStop(data, CompetencyOutcome.S)), this.getHighwayCodeSafety(data, 'seriousFault')), this.getEyesightTestSeriousFault(data.eyesightTest));
    };
    FaultSummaryCatHomeTestHelper.getDangerousFaultsCatHomeTest = function (data) {
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), this.getManoeuvreFaultsIfAny(data, CompetencyOutcome.D)), this.getVehicleCheckFaultsCatHomeTest(data.vehicleChecks, CompetencyOutcome.D)), this.getControlledStop(data, CompetencyOutcome.D));
    };
    FaultSummaryCatHomeTestHelper.getControlledStop = function (data, outcomeType) {
        var controlledStop = data.controlledStop;
        if (!controlledStop || !controlledStop.fault) {
            return [];
        }
        var controlledStopCount = (controlledStop && controlledStop.fault === outcomeType) ? 1 : 0;
        if (controlledStopCount > 0) {
            return [{
                    competencyDisplayName: CompetencyDisplayName.CONTROLLED_STOP,
                    competencyIdentifier: CompetencyIdentifiers.CONTROLLED_STOP,
                    comment: controlledStop.faultComments || '',
                    source: CommentSource.CONTROLLED_STOP,
                    faultCount: controlledStopCount,
                }];
        }
        return [];
    };
    FaultSummaryCatHomeTestHelper.getHighwayCodeSafety = function (data, property) {
        var highwayCodeSafety = data.highwayCodeSafety;
        if (!highwayCodeSafety) {
            return [];
        }
        var gotHighwayCodeSafetyFault = get(data, "highwayCodeSafety." + property, false);
        var highwayCodeSafetyCount = (gotHighwayCodeSafetyFault) ? 1 : 0;
        if (highwayCodeSafetyCount > 0) {
            return [{
                    competencyDisplayName: CompetencyDisplayName.HIGHWAY_CODE_SAFETY,
                    competencyIdentifier: CompetencyIdentifiers.HIGHWAY_CODE_SAFETY,
                    comment: highwayCodeSafety.faultComments || '',
                    source: CommentSource.HIGHWAY_CODE_SAFETY,
                    faultCount: highwayCodeSafetyCount,
                }];
        }
        return [];
    };
    FaultSummaryCatHomeTestHelper.getEyesightTestSeriousFault = function (eyesightTest) {
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
    FaultSummaryCatHomeTestHelper.createManoeuvreFaultCatHomeTest = function (key, type, competencyComment) {
        var manoeuvreFaultSummary = {
            comment: competencyComment || '',
            competencyIdentifier: "" + type + manoeuvreCompetencyLabelsCatHomeTest[key],
            competencyDisplayName: manoeuvreTypeLabelsCatHomeTest[type] + " - " + manoeuvreCompetencyLabelsCatHomeTest[key],
            source: CommentSource.MANOEUVRES + "-" + type + "-" + manoeuvreCompetencyLabelsCatHomeTest[key],
            faultCount: 1,
        };
        return manoeuvreFaultSummary;
    };
    FaultSummaryCatHomeTestHelper.getVehicleCheckFaultsCatHomeTest = function (vehicleChecks, faultType) {
        var result = [];
        if (!vehicleChecks || !vehicleChecks.showMeQuestions || !vehicleChecks.tellMeQuestions) {
            return result;
        }
        var faultCount = 0;
        vehicleChecks.showMeQuestions.map(function (fault) {
            if (fault.outcome === faultType) {
                faultCount = faultCount + 1;
            }
        });
        vehicleChecks.tellMeQuestions.map(function (fault) {
            if (fault.outcome === faultType) {
                faultCount = faultCount + 1;
            }
        });
        if (faultCount > 0) {
            var competency = {
                comment: vehicleChecks.showMeTellMeComments || '',
                competencyIdentifier: CommentSource.VEHICLE_CHECKS,
                competencyDisplayName: CompetencyDisplayName.VEHICLE_CHECKS,
                source: CommentSource.VEHICLE_CHECKS,
                faultCount: 1,
            };
            result.push(competency);
        }
        return result;
    };
    FaultSummaryCatHomeTestHelper.getManoeuvreFaultsIfAny = function (data, faultType) {
        var emptyResult = [];
        var hasManoeuvre = has(data, 'manoeuvres');
        if (hasManoeuvre) {
            var manoeuvres = get(data, 'manoeuvres', {});
            return this.getManoeuvreFaultsCatHomeTest(manoeuvres, faultType);
        }
        return emptyResult;
    };
    FaultSummaryCatHomeTestHelper.getManoeuvreFaultsCatHomeTest = function (manoeuvres, faultType) {
        var _this = this;
        var faultsEncountered = [];
        // TODO: Replace any with Manoeuvres and change the transform function
        forOwn(manoeuvres, function (manoeuvre, type) {
            var faults = !manoeuvre.selected ? [] : transform(manoeuvre, function (result, value, key) {
                if (endsWith(key, CompetencyIdentifiers.FAULT_SUFFIX) && value === faultType) {
                    var competencyComment = getCompetencyComment(key, manoeuvre.controlFaultComments, manoeuvre.observationFaultComments);
                    result.push(_this.createManoeuvreFaultCatHomeTest(key, type, competencyComment));
                }
            }, []);
            faultsEncountered.push.apply(faultsEncountered, faults);
        });
        return faultsEncountered;
    };
    return FaultSummaryCatHomeTestHelper;
}());
export { FaultSummaryCatHomeTestHelper };
//# sourceMappingURL=fault-summary.cat-home-test.js.map