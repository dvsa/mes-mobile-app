import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
import { getSingleFaultCompetencies, hasCompetencyDrivingFault, hasCompetencySeriousFault, hasCompetencyDangerousFault, } from '../single-fault-competencies.selector';
import { SingleFaultCompetencyNames } from '../../../test-data.constants';
describe('single fault competencies selector', function () {
    describe('getSingleFaultCompetencies', function () {
        it('should return singleFaultCompetencies from test data', function () {
            var testData = {
                singleFaultCompetencies: {
                    slalom: CompetencyOutcome.DF,
                },
            };
            var result = getSingleFaultCompetencies(testData);
            expect(result).toEqual(testData.singleFaultCompetencies);
        });
    });
    describe('hasCompetencyDrivingFault', function () {
        it('should return false when competency does not have driving fault', function () {
            var _a;
            var competencyName = SingleFaultCompetencyNames.slalom;
            var singleFaultCompetencies = (_a = {},
                _a[competencyName] = CompetencyOutcome.S,
                _a);
            var result = hasCompetencyDrivingFault(singleFaultCompetencies, competencyName);
            expect(result).toBe(false);
        });
        it('should return true when competency has driving fault', function () {
            var _a;
            var competencyName = SingleFaultCompetencyNames.slalom;
            var singleFaultCompetencies = (_a = {},
                _a[competencyName] = CompetencyOutcome.DF,
                _a);
            var result = hasCompetencyDrivingFault(singleFaultCompetencies, competencyName);
            expect(result).toBe(true);
        });
    });
    describe('hasCompetencySeriousFault', function () {
        it('should return false when competency does not have serious fault', function () {
            var _a;
            var competencyName = SingleFaultCompetencyNames.slalom;
            var singleFaultCompetencies = (_a = {},
                _a[competencyName] = CompetencyOutcome.DF,
                _a);
            var result = hasCompetencySeriousFault(singleFaultCompetencies, competencyName);
            expect(result).toBe(false);
        });
        it('should return true when competency has serious fault', function () {
            var _a;
            var competencyName = SingleFaultCompetencyNames.slalom;
            var singleFaultCompetencies = (_a = {},
                _a[competencyName] = CompetencyOutcome.S,
                _a);
            var result = hasCompetencySeriousFault(singleFaultCompetencies, competencyName);
            expect(result).toBe(true);
        });
    });
    describe('hasCompetencyDangerousFault', function () {
        it('should return false when competency does not have dangerous fault', function () {
            var _a;
            var competencyName = SingleFaultCompetencyNames.slalom;
            var singleFaultCompetencies = (_a = {},
                _a[competencyName] = CompetencyOutcome.DF,
                _a);
            var result = hasCompetencyDangerousFault(singleFaultCompetencies, competencyName);
            expect(result).toBe(false);
        });
        it('should return true when competency has dangerous fault', function () {
            var _a;
            var competencyName = SingleFaultCompetencyNames.slalom;
            var singleFaultCompetencies = (_a = {},
                _a[competencyName] = CompetencyOutcome.D,
                _a);
            var result = hasCompetencyDangerousFault(singleFaultCompetencies, competencyName);
            expect(result).toBe(true);
        });
    });
});
//# sourceMappingURL=single-fault-competencies.selector.spec.js.map