import { FaultsDataRowComponent } from '../faults-data-row';
import { FaultSummary } from '../../../../../shared/models/fault-marking.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('FaultsDataRowComponent', () => {
  describe('deafultSettings', () => {
    it('should have 15 as minDrivingFaultCount when the component is created', () => {
      const component = new FaultsDataRowComponent();

      expect(component.minDrivingFaultCount).toBe(15);
    });
  });

  describe('showFaultComment', () => {
    const faultSummary: FaultSummary = {
      competencyIdentifier: 'compId',
      competencyDisplayName: 'dispName',
      faultCount: 2,
      comment: 'comment',
    };

    it('should return false when drivingFaultCount is less than minDrivingFaultCount', () => {
      const component = new FaultsDataRowComponent();

      component.drivingFaultCount = 5;
      component.minDrivingFaultCount = 6;

      const result = component.showFaultComment(faultSummary);

      expect(result).toBe(false);
    });

    it('should return false when drivingFaultCount is equal to minDrivingFaultCount', () => {
      const component = new FaultsDataRowComponent();

      component.drivingFaultCount = 6;
      component.minDrivingFaultCount = 6;

      const result = component.showFaultComment(faultSummary);

      expect(result).toBe(false);
    });

    it('should return false when there are no comments', () => {
      const localFaultSummary = {
        ...faultSummary,
        comment: undefined,
      };
      const component = new FaultsDataRowComponent();

      component.drivingFaultCount = 7;
      component.minDrivingFaultCount = 6;

      const result = component.showFaultComment(localFaultSummary);

      expect(result).toBe(false);
    });

    it('should return true when drivingFaultCount is greater than minDrivingFaultCount and has comments', () => {
      const component = new FaultsDataRowComponent();

      component.drivingFaultCount = 7;
      component.minDrivingFaultCount = 6;

      const result = component.showFaultComment(faultSummary);

      expect(result).toBe(true);
    });
  });

  describe('getDriverType', () => {
    it('should riding for EUA1M1', () => {
      const component = new FaultsDataRowComponent();
      expect(component.getDriverType(TestCategory.EUA1M1)).toBe('riding');
    });

    it('should riding for EUAM2', () => {
      const component = new FaultsDataRowComponent();
      expect(component.getDriverType(TestCategory.EUAM2)).toBe('riding');
    });

    it('should driving for not Cat A', () => {
      const component = new FaultsDataRowComponent();
      expect(component.getDriverType(TestCategory.B)).toBe('driving');
    });
  });
});
