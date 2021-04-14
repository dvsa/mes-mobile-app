import { FaultSummaryCatAM1Helper } from '../fault-summary.cat-a-mod1';
import { catAM1TestDataStateObject } from './cat-AM1-test-data-mock';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Competencies } from '../../../../modules/tests/test-data/test-data.constants';
describe('FaultSummaryCatAM1Helper', function () {
    describe('createEmergencyStopFaultSummary', function () {
        it('should return a fault summary for emergency stop', function () {
            var resultSummary = FaultSummaryCatAM1Helper.getSpeedCheckEmergencyStop({ outcome: CompetencyOutcome.S })[0];
            expect(resultSummary.competencyIdentifier).toBe(Competencies.speedCheckEmergency);
            expect(resultSummary.faultCount).toBe(1);
        });
        it('should return a fault summary for avoidance', function () {
            var resultSummary = FaultSummaryCatAM1Helper.getSpeedCheckAvoidance({ outcome: CompetencyOutcome.S })[0];
            expect(resultSummary.competencyIdentifier).toBe(Competencies.speedCheckAvoidance);
            expect(resultSummary.faultCount).toBe(1);
        });
    });
    describe('matchCompetenciesIncludingComments', function () {
        it('should match competencies with its corresponding comments', function () {
            var singleFaultCompetencies = catAM1TestDataStateObject.singleFaultCompetencies;
            var expected = {
                slowControl: CompetencyOutcome.S,
                slowControlComments: 'slowControlComments',
                controlledStop: CompetencyOutcome.S,
                controlledStopComments: 'controlledStopComments',
                emergencyStop: CompetencyOutcome.S,
                emergencyStopComments: 'emergencyStopComments',
                avoidance: CompetencyOutcome.S,
                avoidanceComments: 'avoidanceComments',
            };
            var result = FaultSummaryCatAM1Helper.matchCompetenciesIncludingComments(singleFaultCompetencies, CompetencyOutcome.S);
            expect(result).toEqual(expected);
        });
        it('should get called whenever the helper\'s main methods are used', function () {
            spyOn(FaultSummaryCatAM1Helper, 'matchCompetenciesIncludingComments').and.callThrough();
            FaultSummaryCatAM1Helper.getDrivingFaultsCatAM1(catAM1TestDataStateObject);
            FaultSummaryCatAM1Helper.getSeriousFaultsCatAM1(catAM1TestDataStateObject);
            FaultSummaryCatAM1Helper.getDangerousFaultsCatAM1(catAM1TestDataStateObject);
            expect(FaultSummaryCatAM1Helper.matchCompetenciesIncludingComments).toHaveBeenCalledTimes(3);
        });
    });
});
//# sourceMappingURL=fault-summary.cat-a-mod1.spec.js.map