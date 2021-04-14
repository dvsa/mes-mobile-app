import { getCompetencyFaults, calculateFaultCount } from '../get-competency-faults';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { fullCompetencyLabels } from '../../constants/competencies/competencies';
import { CompetencyOutcome } from '../../models/competency-outcome';
import { CommentSource } from '../../models/fault-marking.model';
// note: although competency labels come from a file called catb-competencies, these are in fact
// common to all competencies
describe('calculateFaultCount', function () {
    it('should return count of 1 if boolean is passed', function () {
        var result = calculateFaultCount(true);
        expect(result).toBe(1);
    });
    it('should return value passed in if value is a mumber', function () {
        var result = calculateFaultCount(4);
        expect(result).toBe(4);
    });
    it('should return 0 if passed null', function () {
        var result = calculateFaultCount(null);
        expect(result).toBe(0);
    });
});
describe('getCompetencyFaults', function () {
    it('should return an empty FaultSummary when no driving faults', function () {
        var drivingFaults = {};
        var result = getCompetencyFaults(drivingFaults);
        expect(result.length).toBe(0);
    });
    it('should return an empty FaultSummary when no serious faults', function () {
        var seriousFaults = {};
        var result = getCompetencyFaults(seriousFaults);
        expect(result.length).toBe(0);
    });
    it('should return an empty FaultSummary when no dangerous faults', function () {
        var dangerousFaults = {};
        var result = getCompetencyFaults(dangerousFaults);
        expect(result.length).toBe(0);
    });
    it('should return a FaultSummary containing the driving faults', function () {
        var drivingFaults = {
            controlsAccelerator: 4,
            controlsClutch: 3,
            ancillaryControls: 2,
        };
        var result = getCompetencyFaults(drivingFaults);
        expect(result.length).toBe(3);
        expect(result).toContain({
            comment: null,
            faultCount: 4,
            competencyIdentifier: Competencies.controlsAccelerator,
            competencyDisplayName: fullCompetencyLabels.controlsAccelerator,
            source: 'simple',
        });
        expect(result).toContain({
            comment: null,
            faultCount: 3,
            competencyIdentifier: Competencies.controlsClutch,
            competencyDisplayName: fullCompetencyLabels.controlsClutch,
            source: 'simple',
        });
        expect(result).toContain({
            comment: null,
            faultCount: 2,
            competencyIdentifier: Competencies.ancillaryControls,
            competencyDisplayName: fullCompetencyLabels.ancillaryControls,
            source: 'simple',
        });
    });
    it('should return a FaultSummary containing the serious faults', function () {
        var seriousFaults = {
            controlsAccelerator: true,
            controlsClutch: true,
            ancillaryControls: true,
        };
        var result = getCompetencyFaults(seriousFaults);
        expect(result.length).toBe(3);
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: Competencies.controlsAccelerator,
            competencyDisplayName: fullCompetencyLabels.controlsAccelerator,
            source: 'simple',
        });
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: Competencies.controlsClutch,
            competencyDisplayName: fullCompetencyLabels.controlsClutch,
            source: 'simple',
        });
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: Competencies.ancillaryControls,
            competencyDisplayName: fullCompetencyLabels.ancillaryControls,
            source: 'simple',
        });
    });
    it('should return a FaultSummary containing the dangerous faults', function () {
        var dangerousFaults = {
            controlsAccelerator: true,
            controlsClutch: true,
            ancillaryControls: true,
        };
        var result = getCompetencyFaults(dangerousFaults);
        expect(result.length).toBe(3);
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: Competencies.controlsAccelerator,
            competencyDisplayName: fullCompetencyLabels.controlsAccelerator,
            source: 'simple',
        });
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: Competencies.controlsClutch,
            competencyDisplayName: fullCompetencyLabels.controlsClutch,
            source: 'simple',
        });
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: Competencies.ancillaryControls,
            competencyDisplayName: fullCompetencyLabels.ancillaryControls,
            source: 'simple',
        });
    });
    it('should set the source value correctly if it is a single fault competency', function () {
        var faults = {
            controlsAccelerator: 1,
            controlsClutch: 2,
            useOfStand: CompetencyOutcome.S,
        };
        var result = getCompetencyFaults(faults);
        expect(result).toContain({
            comment: null,
            faultCount: 1,
            competencyIdentifier: 'useOfStand',
            competencyDisplayName: fullCompetencyLabels.useOfStand,
            source: CommentSource.SINGLE_FAULT_COMPETENCY,
        });
    });
});
//# sourceMappingURL=get-competency-faults.spec.js.map