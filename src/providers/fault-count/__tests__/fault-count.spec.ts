import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';
import { catBTestDataStateObject } from '../__mocks__/cat-B-test-data-state-object';
import { catBETestDataStateObject } from '../__mocks__/cat-BE-test-data-state-object';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { catCTestDataStateObject } from '../__mocks__/cat-C-test-data-state-object';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

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
  });

  describe('getDrivingFaultSumCount', () => {
    it('should call the category B specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatBE).toHaveBeenCalled();
    });
    it('should call the category C specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getDrivingFaultSumCountCatC).toHaveBeenCalled();
    });
  });

  describe('getSeriousFaultSumCount', () => {
    it('should call the category B specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((faultCountProvider as any).getSeriousFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((faultCountProvider as any).getSeriousFaultSumCountCatBE).toHaveBeenCalled();
    });
    it('should call the category C specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getSeriousFaultSumCountCatC).toHaveBeenCalled();
    });
  });

  describe('getDangerousFaultSumCount', () => {
    it('should call the category B specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((faultCountProvider as any).getDangerousFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((faultCountProvider as any).getDangerousFaultSumCountCatBE).toHaveBeenCalled();
    });
    it('should call the category C specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((faultCountProvider as any).getDangerousFaultSumCountCatC).toHaveBeenCalled();
    });
  });

  describe('getDrivingFaultSumCountCatB', () => {
    it('should return the driving fault for cat B count correctly', () => {
      expect((faultCountProvider as any).getDrivingFaultSumCountCatB(catBTestDataStateObject)).toBe(4);
    });
  });

  describe('getDrivingFaultSumCountCatBE', () => {
    it('should return the driving fault for cat BE count correctly', () => {
      expect((faultCountProvider as any).getDrivingFaultSumCountCatBE(catBETestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatC', () => {
    it('should return the driving fault for cat C count correctly', () => {
      expect((faultCountProvider as any).getDrivingFaultSumCountCatC(catCTestDataStateObject)).toBe(5);
    });
  });

  describe('getSeriousFaultSumCountCatB', () => {
    it('should return the serious faults count', () => {
      expect((faultCountProvider as any).getSeriousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
    });
    it('should return the correct count of serious faults', () => {
      const failedState: CatBUniqueTypes.TestData = {
        ...catBTestDataStateObject,
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.S,
          },
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.S,
        },
        vehicleChecks: {
          tellMeQuestion: {
            outcome: CompetencyOutcome.DF,
          },
          showMeQuestion: {
            outcome: CompetencyOutcome.S,
          },
        },
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      expect((faultCountProvider as any).getSeriousFaultSumCountCatB(failedState)).toBe(5);
    });
  });

  describe('getDangerousFaultSumCountCatB', () => {
    it('should return the dangerous faults count', () => {
      expect((faultCountProvider as any).getDangerousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
    });
    it('should return the correct number of dangerous faults', () => {
      const failedState: CatBUniqueTypes.TestData = {
        ...catBTestDataStateObject,
        manoeuvres: {
          forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.D,
          },
        },
        controlledStop: {
          selected: true,
          fault: CompetencyOutcome.D,
        },
        vehicleChecks: {
          tellMeQuestion: {
            outcome: CompetencyOutcome.DF,
          },
          showMeQuestion: {
            outcome: CompetencyOutcome.D,
          },
        },
      };
      expect((faultCountProvider as any).getDangerousFaultSumCountCatB(failedState)).toBe(4);
    });
  });

  describe('getSeriousFaultSumCountCatBE', () => {
    it('should return the serious faults count', () => {
      expect((faultCountProvider as any).getSeriousFaultSumCountCatBE(catBETestDataStateObject)).toBe(1);
    });
    it('should return the correct count of serious faults', () => {
      const failedState: CatBEUniqueTypes.TestData = {
        ...catBETestDataStateObject,
        vehicleChecks: {
          tellMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'DF',
          }],
          showMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'S',
          }],
        },
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      expect((faultCountProvider as any).getSeriousFaultSumCountCatBE(failedState)).toBe(2);
    });
  });

  describe('getDangerousFaultSumCountCatBE', () => {
    it('should return the dangerous faults count', () => {
      expect((faultCountProvider as any).getDangerousFaultSumCountCatBE(catBETestDataStateObject)).toBe(1);
    });
    it('should return the correct number of dangerous faults', () => {
      const failedState: CatBEUniqueTypes.TestData = {
        ...catBETestDataStateObject,
        vehicleChecks: {
          tellMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'DF',
          }],
          showMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'D',
          }],
        },
      };
      expect((faultCountProvider as any).getDangerousFaultSumCountCatBE(failedState)).toBe(1);
    });
  });
});
