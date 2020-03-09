import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { vehicleChecksExist } from '../vehicle-checks.cat-adi-part2.selector';

describe('Vehicle Checks Selector Cat BE', () => {

  describe('vehicleChecksExist', () => {
    it('should return false if there are no vehicle checks entered', ()  => {
      const emptyVehicleChecks: CatADI2UniqueTypes.VehicleChecks = { tellMeQuestions: [{}] };
      const result = vehicleChecksExist(emptyVehicleChecks);
      expect(result).toBeFalsy();
    });
    it('should return true if there are vehicle checks (tellMeQuestions) entered', ()  => {
      const populatedVehicleChecks: CatADI2UniqueTypes.VehicleChecks =
        {
          tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: 'DF' }],
        };
      const result = vehicleChecksExist(populatedVehicleChecks);
      expect(result).toBeTruthy();
    });
    it('should return false if there are vehicle checks but no outcome selected', ()  => {
      const populatedVehicleChecks: CatADI2UniqueTypes.VehicleChecks =
        {
          tellMeQuestions: [{ code: 'T01', description: 'test T01', outcome: null }],
        };
      const result = vehicleChecksExist(populatedVehicleChecks);
      expect(result).toBeFalsy();
    });
  });
});
