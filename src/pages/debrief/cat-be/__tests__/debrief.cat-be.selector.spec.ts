import {
    SeriousFaults,
    DangerousFaults,
    DrivingFaults,
  } from '@dvsa/mes-test-schema/categories/Common';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import {
    displayDrivingFaultComments,
    getManoeuvreFaults,
    vehicleChecksExist,
  } from '../debrief.cat-be.selector';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

describe('debriefSelector', () => {
  const manoeuvres: CatBEUniqueTypes.Manoeuvres = {};

  describe('vehicleChecksExist', () => {
    it('should return false if there are no vehicle checks entered', ()  => {
      const emptyVehicleChecks: CatBEUniqueTypes.VehicleChecks = { showMeQuestions: [{}], tellMeQuestions: [{}] };
      const result = vehicleChecksExist(emptyVehicleChecks);
      expect(result).toBeFalsy();
    });

    it('should return true if there are vehicle checks (showMeQuestions) entered', ()  => {
      const populatedVehicleChecks: CatBEUniqueTypes.VehicleChecks =
        {
          showMeQuestions: [{ code: 'S01', description: 'test s01', outcome: 'P' }],
          tellMeQuestions: [{}],
        };
      const result = vehicleChecksExist(populatedVehicleChecks);
      expect(result).toBeTruthy();
    });

    it('should return true if there are vehicle checks (tellMeQuestions) entered', ()  => {
      const populatedVehicleChecks: CatBEUniqueTypes.VehicleChecks =
        {
          showMeQuestions: [{}],
          tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: 'DF' }],
        };
      const result = vehicleChecksExist(populatedVehicleChecks);
      expect(result).toBeTruthy();
    });
    it('should return false if there are vehicle checks but no outcome selected', ()  => {
      const populatedVehicleChecks: CatBEUniqueTypes.VehicleChecks =
        {
          showMeQuestions: [{ code: 'S01', description: 'test s01', outcome: null }],
          tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: null }],
        };
      const result = vehicleChecksExist(populatedVehicleChecks);
      expect(result).toBeFalsy();
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
      const testData: CatBEUniqueTypes.TestData = {
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
      const testData: CatBEUniqueTypes.TestData = {
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
      const testData: CatBEUniqueTypes.TestData = {
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
      const testData: CatBEUniqueTypes.TestData = {
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
      manoeuvres.reverseLeft = {
        selected: true,
        controlFault: 'DF',
        observationFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result.length).toBe(2);
    });

    it('should return an array length matching the number of manoeuvre serious faults', () => {
      manoeuvres.reverseLeft = {
        selected: true,
        controlFault: 'S',
        observationFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.S);
      expect(result.length).toBe(1);
    });

    it('should return an array length matching the number of manoeuvre dangerous faults', () => {
      manoeuvres.reverseLeft = {
        selected: true,
        controlFault: 'DF',
        observationFault: 'D',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.D);
      expect(result.length).toBe(1);
    });

    it('should return an array with a correctly formatted fault object ', () => {
      manoeuvres.reverseLeft = {
        selected: true,
        controlFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result[0].competencyDisplayName).toBe('Reverse left - Control');
      expect(result[0].faultCount).toBe(1);
    });
  });

});
