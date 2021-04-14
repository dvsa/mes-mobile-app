import { pickBy, get } from 'lodash';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { getCompetencyFaults } from '../../../shared/helpers/get-competency-faults';
var FaultCountAM1Helper = /** @class */ (function () {
    function FaultCountAM1Helper() {
    }
    FaultCountAM1Helper.getDangerousFaultSumCountCatAM1 = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var singleFaultCompetencies = data.singleFaultCompetencies, dangerousFaults = data.dangerousFaults;
        var dangerousFaultSumOfSimpleCompetencies = Object.keys(pickBy(dangerousFaults)).length;
        var controlledStopDangerousFaults = (get(singleFaultCompetencies, 'controlledStop') === CompetencyOutcome.D) ? 1 : 0;
        var useOfStandDangerousFaults = (get(singleFaultCompetencies, 'useOfStand') === CompetencyOutcome.D) ? 1 : 0;
        var manualHandlingDangerousFaults = (get(singleFaultCompetencies, 'manualHandling') === CompetencyOutcome.D) ? 1 : 0;
        var slalomDangerousFaults = (get(singleFaultCompetencies, 'slalom') === CompetencyOutcome.D) ? 1 : 0;
        var slowControlDangerousFaults = (get(singleFaultCompetencies, 'slowControl') === CompetencyOutcome.D) ? 1 : 0;
        var uTurnDangerousFaults = (get(singleFaultCompetencies, 'uTurn') === CompetencyOutcome.D) ? 1 : 0;
        var emergencyStopDangerousFaults = (get(singleFaultCompetencies, 'emergencyStop') === CompetencyOutcome.D) ? 1 : 0;
        var avoidanceDangerousFaults = (get(singleFaultCompetencies, 'avoidance') === CompetencyOutcome.D) ? 1 : 0;
        var result = dangerousFaultSumOfSimpleCompetencies +
            controlledStopDangerousFaults +
            useOfStandDangerousFaults +
            manualHandlingDangerousFaults +
            slalomDangerousFaults +
            slowControlDangerousFaults +
            uTurnDangerousFaults +
            emergencyStopDangerousFaults +
            avoidanceDangerousFaults;
        return result;
    };
    FaultCountAM1Helper.getSeriousFaultSumCountCatAM1 = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var seriousFaults = data.seriousFaults, singleFaultCompetencies = data.singleFaultCompetencies, emergencyStop = data.emergencyStop, avoidance = data.avoidance;
        var seriousFaultSumOfSimpleCompetencies = Object.keys(pickBy(seriousFaults)).length;
        var controlledStopSeriousFaults = (get(singleFaultCompetencies, 'controlledStop') === CompetencyOutcome.S) ? 1 : 0;
        var useOfStandSeriousFaults = (get(singleFaultCompetencies, 'useOfStand') === CompetencyOutcome.S) ? 1 : 0;
        var manualHandlingSeriousFaults = (get(singleFaultCompetencies, 'manualHandling') === CompetencyOutcome.S) ? 1 : 0;
        var slalomSeriousFaults = (get(singleFaultCompetencies, 'slalom') === CompetencyOutcome.S) ? 1 : 0;
        var slowControlSeriousFaults = (get(singleFaultCompetencies, 'slowControl') === CompetencyOutcome.S) ? 1 : 0;
        var uTurnSeriousFaults = (get(singleFaultCompetencies, 'uTurn') === CompetencyOutcome.S) ? 1 : 0;
        var emergencyStopSeriousFaults = (get(singleFaultCompetencies, 'emergencyStop') === CompetencyOutcome.S) ? 1 : 0;
        var avoidanceSeriousFaults = (get(singleFaultCompetencies, 'avoidance') === CompetencyOutcome.S) ? 1 : 0;
        var emergencyStopSpeedRequirementSeriousFaults = (get(emergencyStop, 'outcome') === CompetencyOutcome.S) ? 1 : 0;
        var avoidanceSpeedRequirementSeriousFaults = (get(avoidance, 'outcome') === CompetencyOutcome.S) ? 1 : 0;
        var result = seriousFaultSumOfSimpleCompetencies +
            controlledStopSeriousFaults +
            useOfStandSeriousFaults +
            manualHandlingSeriousFaults +
            slalomSeriousFaults +
            slowControlSeriousFaults +
            uTurnSeriousFaults +
            emergencyStopSeriousFaults +
            avoidanceSeriousFaults +
            emergencyStopSpeedRequirementSeriousFaults +
            avoidanceSpeedRequirementSeriousFaults;
        return result;
    };
    FaultCountAM1Helper.getRidingFaultSumCountCatAM1 = function (data) {
        // The way how we store serious faults differs for certain competencies
        // Because of this we need to pay extra attention on summing up all of them
        var drivingFaults = data.drivingFaults, singleFaultCompetencies = data.singleFaultCompetencies;
        var drivingFaultSumOfSimpleCompetencies = getCompetencyFaults(drivingFaults)
            .reduce((function (res, faultSummary) { return res + faultSummary.faultCount; }), 0);
        Object.keys(pickBy(drivingFaults)).length;
        var controlledStopDrivingFaults = (get(singleFaultCompetencies, 'controlledStop') === CompetencyOutcome.DF) ? 1 : 0;
        var useOfStandDrivingFaults = (get(singleFaultCompetencies, 'useOfStand') === CompetencyOutcome.DF) ? 1 : 0;
        var manualHandlingDrivingFaults = (get(singleFaultCompetencies, 'manualHandling') === CompetencyOutcome.DF) ? 1 : 0;
        var slalomDrivingFaults = (get(singleFaultCompetencies, 'slalom') === CompetencyOutcome.DF) ? 1 : 0;
        var slowControlDrivingFaults = (get(singleFaultCompetencies, 'slowControl') === CompetencyOutcome.DF) ? 1 : 0;
        var uTurnDrivingFaults = (get(singleFaultCompetencies, 'uTurn') === CompetencyOutcome.DF) ? 1 : 0;
        var emergencyStopRidingFaults = (get(singleFaultCompetencies, 'emergencyStop') === CompetencyOutcome.DF) ? 1 : 0;
        var avoidanceRidingFaults = (get(singleFaultCompetencies, 'avoidance') === CompetencyOutcome.DF) ? 1 : 0;
        var result = drivingFaultSumOfSimpleCompetencies +
            controlledStopDrivingFaults +
            useOfStandDrivingFaults +
            manualHandlingDrivingFaults +
            slalomDrivingFaults +
            slowControlDrivingFaults +
            uTurnDrivingFaults +
            emergencyStopRidingFaults +
            avoidanceRidingFaults;
        return result;
    };
    return FaultCountAM1Helper;
}());
export { FaultCountAM1Helper };
//# sourceMappingURL=fault-count.cat-a-mod1.js.map