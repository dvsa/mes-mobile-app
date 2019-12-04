import { DrivingFaults, SeriousFaults, DangerousFaults } from '@dvsa/mes-test-schema/categories/Common';
import { getCompetencyFaults, calculateFaultCount } from '../competency';
import { Competencies } from '../../../modules/tests/test-data/test-data.constants';
import { fullCompetencyLabels } from '../../../shared/constants/competencies/catb-competencies';

// note: although competency labels come from a file called catb-competencies, these are in fact
// common to all competencies
describe('calculateFaultCount', () => {
  it('should return count of 1 if boolean is passed', () => {
    const result = calculateFaultCount(true);
    expect(result).toBe(1);
  });

  it('should return value passed in if value is a mumber', () => {
    const result = calculateFaultCount(4);
    expect(result).toBe(4);
  });
  it('should return 0 if passed null', () => {
    const result = calculateFaultCount(null);
    expect(result).toBe(0);
  });

});
describe('getCompetencyFaults', () => {
  it('should return an empty FaultSummary when no driving faults', () => {
    const drivingFaults: DrivingFaults = {};

    const result = getCompetencyFaults(drivingFaults);
    expect(result.length).toBe(0);
  });

  it('should return an empty FaultSummary when no serious faults', () => {
    const seriousFaults: SeriousFaults = {};

    const result = getCompetencyFaults(seriousFaults);
    expect(result.length).toBe(0);
  });
  it('should return an empty FaultSummary when no dangerous faults', () => {
    const dangerousFaults: DangerousFaults = {};

    const result = getCompetencyFaults(dangerousFaults);
    expect(result.length).toBe(0);
  });

  it('should return a FaultSummary containing the driving faults', () => {
    const drivingFaults: DrivingFaults =
      { controlsAccelerator: 4,
        controlsClutch: 3,
        ancillaryControls: 2,
      };

    const result = getCompetencyFaults(drivingFaults);

    expect(result.length).toBe(3);
    expect(result).toContain(
      {
        comment: null,
        faultCount: 4,
        competencyIdentifier: Competencies.controlsAccelerator,
        competencyDisplayName: fullCompetencyLabels.controlsAccelerator,
        source: 'simple',
      });
    expect(result).toContain(
      {
        comment: null,
        faultCount: 3,
        competencyIdentifier: Competencies.controlsClutch,
        competencyDisplayName: fullCompetencyLabels.controlsClutch,
        source: 'simple',
      });
    expect(result).toContain(
      {
        comment: null,
        faultCount: 2,
        competencyIdentifier: Competencies.ancillaryControls,
        competencyDisplayName: fullCompetencyLabels.ancillaryControls,
        source: 'simple',
      });
  });

  it('should return a FaultSummary containing the serious faults', () => {
    const seriousFaults: SeriousFaults =
      { controlsAccelerator: true,
        controlsClutch: true,
        ancillaryControls: true,
      };

    const result = getCompetencyFaults(seriousFaults);

    expect(result.length).toBe(3);
    expect(result).toContain(
      {
        comment: null,
        faultCount: 1,
        competencyIdentifier: Competencies.controlsAccelerator,
        competencyDisplayName: fullCompetencyLabels.controlsAccelerator,
        source: 'simple',
      });
    expect(result).toContain(
      {
        comment: null,
        faultCount: 1,
        competencyIdentifier: Competencies.controlsClutch,
        competencyDisplayName:fullCompetencyLabels.controlsClutch,
        source: 'simple',
      });
    expect(result).toContain(
      {
        comment: null,
        faultCount: 1,
        competencyIdentifier: Competencies.ancillaryControls,
        competencyDisplayName: fullCompetencyLabels.ancillaryControls,
        source: 'simple',
      });
  });

  it('should return a FaultSummary containing the dangerous faults', () => {
    const dangerousFaults: DangerousFaults =
      { controlsAccelerator: true,
        controlsClutch: true,
        ancillaryControls: true,
      };

    const result = getCompetencyFaults(dangerousFaults);

    expect(result.length).toBe(3);
    expect(result).toContain(
      {
        comment: null,
        faultCount: 1,
        competencyIdentifier: Competencies.controlsAccelerator,
        competencyDisplayName: fullCompetencyLabels.controlsAccelerator,
        source: 'simple',
      });
    expect(result).toContain(
      {
        comment: null,
        faultCount: 1,
        competencyIdentifier: Competencies.controlsClutch,
        competencyDisplayName: fullCompetencyLabels.controlsClutch,
        source: 'simple',
      });
    expect(result).toContain(
      {
        comment: null,
        faultCount: 1,
        competencyIdentifier: Competencies.ancillaryControls,
        competencyDisplayName: fullCompetencyLabels.ancillaryControls,
        source: 'simple',
      });
  });

});
