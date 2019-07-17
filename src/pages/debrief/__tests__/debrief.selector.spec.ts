import {
  SeriousFaults,
  DangerousFaults,
  DrivingFaults,
  TestData,
  Manoeuvres,
} from '@dvsa/mes-test-schema/categories/B';
import {
  getSeriousOrDangerousFaults,
  getDrivingFaults,
  displayDrivingFaultComments,
  getManoeuvreFaults,
} from '../debrief.selector';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

describe('debriefSelector', () => {
  const dangerousFaults: DangerousFaults = {};
  const seriousFaults: SeriousFaults = {};
  const drivingFaults: DrivingFaults = {};
  const manoeuvres: Manoeuvres = {};

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
      expect(result[0].faultCount).toBe(5);
      expect(result[1].faultCount).toBe(2);
      expect(result[2].faultCount).toBe(1);
    });

  });

  describe('displayDrivingFaultComments', () => {
    let localDangerousFaults: DangerousFaults = {};
    let localSeriousFaults: SeriousFaults = {};
    let localDrivingFaults: DrivingFaults = {};

    it('should return false if there are less than 16 driving faults', () => {
      localDangerousFaults = {};
      localSeriousFaults = {};
      localDrivingFaults.ancillaryControls = 1;
      const testData: TestData = {
        dangerousFaults: localDangerousFaults,
        seriousFaults: localSeriousFaults,
        drivingFaults: localDrivingFaults,
      };
      const result = displayDrivingFaultComments(testData);
      expect(result).toEqual(false);
    });

    it('should return true if there are more than 15 driving faults and no serious or dangerous faults', () => {
      localDrivingFaults = {
        controlsAccelerator: 2,
        controlsClutch: 3,
        controlsGears: 1,
        controlsFootbrake: 4,
        controlsParkingBrake: 3,
        controlsSteering: 2,
        precautions: 1,
      };
      const testData: TestData = {
        dangerousFaults: localDangerousFaults,
        seriousFaults: localSeriousFaults,
        drivingFaults: localDrivingFaults,
      };
      const result = displayDrivingFaultComments(testData);
      expect(result).toEqual(true);
    });

    it('should return false if there are more than 15 driving faults and a serious fault', () => {
      localDangerousFaults = {};
      localDrivingFaults = {
        controlsAccelerator: 2,
        controlsClutch: 3,
        controlsGears: 1,
        controlsFootbrake: 4,
        controlsParkingBrake: 3,
        controlsSteering: 2,
        precautions: 1,
      };
      localSeriousFaults.useOfSpeed = true;
      localSeriousFaults.controlsSteering = true;
      const testData: TestData = {
        dangerousFaults: localDangerousFaults,
        seriousFaults: localSeriousFaults,
        drivingFaults: localDrivingFaults,
      };
      const result = displayDrivingFaultComments(testData);
      expect(result).toEqual(false);
    });

    it('should return false if there are more than 15 driving faults and a dangerous fault', () => {
      localSeriousFaults = {};
      localDrivingFaults = {
        controlsAccelerator: 2,
        controlsClutch: 3,
        controlsGears: 1,
        controlsFootbrake: 4,
        controlsParkingBrake: 3,
        controlsSteering: 2,
        precautions: 1,
      };
      localDangerousFaults.useOfSpeed = true;
      localDangerousFaults.controlsSteering = true;
      const testData: TestData = {
        dangerousFaults: localDangerousFaults,
        seriousFaults: localSeriousFaults,
        drivingFaults: localDrivingFaults,
      };
      const result = displayDrivingFaultComments(testData);
      expect(result).toEqual(false);

    });

  });

  describe('getManoeuvreFaults', () => {
    it('should return an empty array if there are no manoeuvre driving faults', () => {
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result.length).toBe(0);
    });

    it('should return an array length matching the number of manoeuvre driving faults', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'DF',
        observationFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result.length).toBe(2);
    });

    it('should return an array length matching the number of manoeuvre serious faults', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'S',
        observationFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.S);
      expect(result.length).toBe(1);
    });

    it('should return an array length matching the number of manoeuvre dangerous faults', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'DF',
        observationFault: 'D',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.D);
      expect(result.length).toBe(1);
    });

    it('should return an array with a correctly formatted fault object ', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result[0].competencyDisplayName).toBe('Reverse right - Control');
      expect(result[0].faultCount).toBe(1);
    });
  });

});
