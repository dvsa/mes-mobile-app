import { CompetencyIdentifiers, CommentSource } from '../../shared/models/fault-marking.model';
import { fullCompetencyLabels } from '../constants/competencies/competencies';
import { forOwn, isBoolean, isNumber } from 'lodash';
export var getCompetencyFaults = function (faults) {
    var faultsEncountered = [];
    forOwn(faults, function (value, key, obj) {
        var faultCount = calculateFaultCount(value);
        if (faultCount > 0 && !key.endsWith(CompetencyIdentifiers.COMMENTS_SUFFIX)) {
            var label = key;
            var comment = obj["" + key + CompetencyIdentifiers.COMMENTS_SUFFIX] || null;
            var faultSummary = {
                comment: comment,
                faultCount: faultCount,
                competencyIdentifier: key,
                competencyDisplayName: fullCompetencyLabels[label],
                source: CommentSource.SIMPLE,
            };
            faultsEncountered.push(faultSummary);
        }
    });
    return faultsEncountered.sort(function (a, b) { return b.faultCount - a.faultCount; });
};
export var getCompetencyComment = function (key, controlFaultComments, observationFaultComments) {
    if (key === CompetencyIdentifiers.CONTROL_FAULT) {
        return controlFaultComments || '';
    }
    return observationFaultComments || '';
};
export var calculateFaultCount = function (value) {
    if (isBoolean(value)) {
        return value ? 1 : 0;
    }
    if (isNumber(value)) {
        return value;
    }
    return 0;
};
//# sourceMappingURL=competency.js.map