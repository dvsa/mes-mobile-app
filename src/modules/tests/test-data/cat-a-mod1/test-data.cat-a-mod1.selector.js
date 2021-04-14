import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
export var getDrivingFaultCount = function (data, competency) { return data.drivingFaults[competency]; };
export var getSpeedRequirementNotMet = function (testData) {
    return testData.emergencyStop.outcome === CompetencyOutcome.S;
};
//# sourceMappingURL=test-data.cat-a-mod1.selector.js.map