import { SeriousFaults, DangerousFaults, DrivingFaults } from '@dvsa/mes-test-schema/categories/B';
import { getSeriousOrDangerousFaults, getDrivingFaults } from '../debrief.selector';

describe('debriefSelector', () => {
  const dangerousFaults: DangerousFaults = {};
  const seriousFaults: SeriousFaults = {};
  const drivingFaults: DrivingFaults = {};

  describe('getSeriousOrDangerousFaults', () => {
    it('should return an empty array if there are no serious faults', () => {
      const result = getSeriousOrDangerousFaults(seriousFaults);
      expect(result.length).toBe(0);
    });

    it('should return an array matching the number of serious faults set to true', () => {
      seriousFaults.useOfSpeed = true;
      seriousFaults.controlsSteering = true;
      const result = getSeriousOrDangerousFaults(seriousFaults);
      expect(result.length).toBe(2);
    });

    it('should return an empty array if there are no dangerous faults', () => {
      const result = getSeriousOrDangerousFaults(dangerousFaults);
      expect(result.length).toBe(0);
    });

    it('should return an array matching the number of dangerous faults set to true', () => {
      dangerousFaults.useOfSpeed = true;
      dangerousFaults.controlsSteering = true;
      const result = getSeriousOrDangerousFaults(dangerousFaults);
      expect(result.length).toBe(2);
    });
  });

  describe('getDrivingFaults', () => {
    it('should return an empty array if there are no driving faults', () => {
      const result = getDrivingFaults(drivingFaults);
      expect(result.length).toBe(0);
    });

    it('should return an array matching the number of driving faults > 0', () => {
      drivingFaults.useOfSpeed = 1;
      drivingFaults.controlsSteering = 2;
      const result = getDrivingFaults(drivingFaults);
      expect(result.length).toBe(2);
    });

    it('should return faults in reverse order of fault count', () => {
      drivingFaults.useOfSpeed = 1;
      drivingFaults.controlsSteering = 2;
      drivingFaults.junctionsObservation = 5;
      const result = getDrivingFaults(drivingFaults);
      expect(result[0].count).toBe(5);
      expect(result[1].count).toBe(2);
      expect(result[2].count).toBe(1);
    });

  });
});
