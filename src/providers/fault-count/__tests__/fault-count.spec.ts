import { QuestionResult } from '@dvsa/mes-test-schema/categories/BE/partial';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';
import { catBTestDataStateObject } from '../__mocks__/cat-B-test-data-state-object';
import { catBETestDataStateObject } from '../__mocks__/cat-BE-test-data-state-object';
import { catCTestDataStateObject } from '../__mocks__/cat-C-test-data-state-object';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('FaultCountProvider', () => {

  let faultCountProvider: FaultCountProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultCountProvider,
      ],
    });

    faultCountProvider = TestBed.get(FaultCountProvider);

    spyOn(faultCountProvider, 'getDrivingFaultSumCountCatB').and.callThrough();
    spyOn(faultCountProvider, 'getSeriousFaultSumCountCatB').and.callThrough();
    spyOn(faultCountProvider, 'getDangerousFaultSumCountCatB').and.callThrough();

    spyOn(faultCountProvider, 'getDrivingFaultSumCountCatBE').and.callThrough();
    spyOn(faultCountProvider, 'getSeriousFaultSumCountCatBE').and.callThrough();
    spyOn(faultCountProvider, 'getDangerousFaultSumCountCatBE').and.callThrough();

    spyOn(faultCountProvider, 'getDrivingFaultSumCountCatC').and.callThrough();
    spyOn(faultCountProvider, 'getSeriousFaultSumCountCatC').and.callThrough();
    spyOn(faultCountProvider, 'getDangerousFaultSumCountCatC').and.callThrough();

    spyOn(faultCountProvider, 'vehicleChecksFaultSmallMediumTrailerLight').and.callThrough();
  });

  describe('getDrivingFaultSumCount', () => {
    it('should call the category B specific method for getting the driving fault sum count', () => {
      const result = faultCountProvider.getDrivingFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatB).toHaveBeenCalled();
      expect(result).toEqual(4);
    });
    it('should call the category BE specific method for getting the driving fault sum count', () => {
      const result = faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatBE).toHaveBeenCalled();
      expect(result).toEqual(5);
    });
    it('should call the category C specific method for getting the driving fault sum count', () => {
      const result = faultCountProvider.getDrivingFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatC).toHaveBeenCalled();
      expect(result).toEqual(4);
    });
    it('should call the category C specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatC).toHaveBeenCalled();
    });
  });

  describe('getSeriousFaultSumCount', () => {
    it('should call the category B specific method for getting the serious fault sum count', () => {
      const result = faultCountProvider.getSeriousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((faultCountProvider as any).getSeriousFaultSumCountCatB).toHaveBeenCalled();
      expect(result).toEqual(1);
    });
    it('should call the category BE specific method for getting the serious fault sum count', () => {
      const result = faultCountProvider.getSeriousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((faultCountProvider as any).getSeriousFaultSumCountCatBE).toHaveBeenCalled();
      expect(result).toEqual(1);
    });
    it('should call the category C specific method for getting the serious fault sum count', () => {
      const result = faultCountProvider.getSeriousFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getSeriousFaultSumCountCatC).toHaveBeenCalled();
      expect(result).toEqual(1);
    });
  });

  describe('getDangerousFaultSumCount', () => {
    it('should call the category B specific method for getting the dangerous fault sum count', () => {
      const result = faultCountProvider.getDangerousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((faultCountProvider as any).getDangerousFaultSumCountCatB).toHaveBeenCalled();
      expect(result).toEqual(1);
    });
    it('should call the category BE specific method for getting the dangerous fault sum count', () => {
      const result = faultCountProvider.getDangerousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((faultCountProvider as any).getDangerousFaultSumCountCatBE).toHaveBeenCalled();
      expect(result).toEqual(1);
    });
    it('should call the category C specific method for getting the dangerous fault sum count', () => {
      const result = faultCountProvider.getDangerousFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getDangerousFaultSumCountCatC).toHaveBeenCalled();
      expect(result).toEqual(1);
    });
  });

  // Vehicle Checks: CAT B
  describe('getVehicleChecksFaultCountCatB', () => {
    it('should return 1 if competency outcome is DF', () => {
      const result = faultCountProvider.getVehicleChecksFaultCountCatB(catBTestDataStateObject.vehicleChecks);
      expect(result).toEqual(1);
    })


    it('should return 0 if competency outcome is S or D', () => {
      const mockVehiclChecks = {
        tellMeQuestion: {
          outcome: CompetencyOutcome.S,
        },
        showMeQuestion: {
          outcome: CompetencyOutcome.D,
        },
      }
      const result = faultCountProvider.getVehicleChecksFaultCountCatB(mockVehiclChecks);
      expect(result).toEqual(0);
    })
  });

  // Vehicle Checks: CAT BE
  describe('getVehicleChecksFaultCountCatB', () => {
    it('should return 0 zero faults when all questions are passed', () => {
      const result = faultCountProvider.getVehicleChecksFaultCountCatBE(catBETestDataStateObject.vehicleChecks);
      expect((faultCountProvider as any).vehicleChecksFaultSmallMediumTrailerLight).toHaveBeenCalled();
      expect(result).toEqual({ drivingFaults: 0, seriousFaults: 0 });
    })

    it('should return 4 driving faults and 1 serious fault when there are 5 faults in total', () => {
      const mockVehiclChecks = {
        tellMeQuestions: [{
          code: 'string',
          description: 'string',
          outcome: 'DF',
        },
        {
          code: 'string',
          description: 'string',
          outcome: 'DF',
        },
        {
          code: 'string',
          description: 'string',
          outcome: 'DF',
        }] as QuestionResult[],
        showMeQuestions: [{
          code: 'string',
          description: 'string',
          outcome: 'DF',
        },
        {
          code: 'string',
          description: 'string',
          outcome: 'DF',
        }] as QuestionResult[],
      }
      const result = faultCountProvider.getVehicleChecksFaultCountCatBE(mockVehiclChecks);
      expect((faultCountProvider as any).vehicleChecksFaultSmallMediumTrailerLight).toHaveBeenCalled();
      expect(result).toEqual({ drivingFaults: 4, seriousFaults: 1 });
    })
  });
});
