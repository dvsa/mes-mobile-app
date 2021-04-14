var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { CommentSource } from '../../../shared/models/fault-marking.model';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
import { get, pickBy, startsWith } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { fullCompetencyLabels } from '../../../shared/constants/competencies/competencies';
var FaultSummaryCatAM1Helper = /** @class */ (function () {
    function FaultSummaryCatAM1Helper() {
    }
    FaultSummaryCatAM1Helper.getDrivingFaultsCatAM1 = function (data) {
        var singleFaultCompetenciesWithDrivingFaults = FaultSummaryCatAM1Helper
            .matchCompetenciesIncludingComments(data.singleFaultCompetencies, CompetencyOutcome.DF);
        return __spreadArray(__spreadArray([], getCompetencyFaults(data.drivingFaults)), getCompetencyFaults(singleFaultCompetenciesWithDrivingFaults));
    };
    FaultSummaryCatAM1Helper.getSeriousFaultsCatAM1 = function (data) {
        var singleFaultCompetenciesWithSeriousFaults = FaultSummaryCatAM1Helper
            .matchCompetenciesIncludingComments(data.singleFaultCompetencies, CompetencyOutcome.S);
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray([], getCompetencyFaults(data.seriousFaults)), getCompetencyFaults(singleFaultCompetenciesWithSeriousFaults)), FaultSummaryCatAM1Helper.getSpeedCheckAvoidance(data.avoidance)), FaultSummaryCatAM1Helper.getSpeedCheckEmergencyStop(data.emergencyStop));
    };
    FaultSummaryCatAM1Helper.getDangerousFaultsCatAM1 = function (data) {
        var singleFaultCompetenciesWithDangerousFaults = FaultSummaryCatAM1Helper
            .matchCompetenciesIncludingComments(data.singleFaultCompetencies, CompetencyOutcome.D);
        return __spreadArray(__spreadArray([], getCompetencyFaults(data.dangerousFaults)), getCompetencyFaults(singleFaultCompetenciesWithDangerousFaults));
    };
    FaultSummaryCatAM1Helper.getSpeedCheckAvoidance = function (avoidance) {
        var result = [];
        if (get(avoidance, 'outcome') === CompetencyOutcome.S) {
            var source = CommentSource.SPEED_REQUIREMENTS + "-" + Competencies.speedCheckAvoidance;
            result.push(FaultSummaryCatAM1Helper.createFaultSummary(Competencies.speedCheckAvoidance, fullCompetencyLabels.speedCheckAvoidance, avoidance.comments, source));
        }
        return result;
    };
    FaultSummaryCatAM1Helper.getSpeedCheckEmergencyStop = function (emergencyStop) {
        var result = [];
        if (get(emergencyStop, 'outcome') === CompetencyOutcome.S) {
            var source = CommentSource.SPEED_REQUIREMENTS + "-" + Competencies.speedCheckEmergency;
            result.push(FaultSummaryCatAM1Helper.createFaultSummary(Competencies.speedCheckEmergency, fullCompetencyLabels.speedCheckEmergency, emergencyStop.comments, source));
        }
        return result;
    };
    FaultSummaryCatAM1Helper.matchCompetenciesIncludingComments = function (singleFaultCompetencies, outcome) {
        var matchedCompetencies = pickBy(singleFaultCompetencies, function (val) { return val === outcome; });
        var matchedComments = pickBy(singleFaultCompetencies, function (val, key) { return Object.keys(matchedCompetencies).filter(function (val) { return startsWith(key, val); }).length > 0; });
        return __assign(__assign({}, matchedCompetencies), matchedComments);
    };
    FaultSummaryCatAM1Helper.createFaultSummary = function (competencyIdentifier, competencyName, competencyComments, source) {
        if (source === void 0) { source = CommentSource.SIMPLE; }
        return {
            competencyIdentifier: competencyIdentifier,
            source: source,
            competencyDisplayName: competencyName,
            comment: competencyComments || '',
            faultCount: 1,
        };
    };
    return FaultSummaryCatAM1Helper;
}());
export { FaultSummaryCatAM1Helper };
//# sourceMappingURL=fault-summary.cat-a-mod1.js.map