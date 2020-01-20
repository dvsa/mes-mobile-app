import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';
import { catBTestDataStateObject } from '../__mocks__/cat-B-test-data-state-object';
import { catBETestDataStateObject } from '../__mocks__/cat-BE-test-data-state-object';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { catCTestDataStateObject } from '../__mocks__/cat-C-test-data-state-object';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { catCETestDataStateObject } from '../__mocks__/cat-CE-test-data-state-object';
import { catC1ETestDataStateObject } from '../__mocks__/cat-C1E-test-data-state-object';
import { catC1TestDataStateObject } from '../__mocks__/cat-C1-test-data-state-object';

import { FaultCountBHelper } from '../cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from '../cat-be/fault-count.cat-be';
import { FaultCountCHelper } from '../cat-c/fault-count.cat-c';

describe('FaultCountProvider', () => {

  let faultCountProvider: FaultCountProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultCountProvider,
      ],
    });

    faultCountProvider = TestBed.get(FaultCountProvider);

    spyOn(FaultCountBHelper, 'getDrivingFaultSumCountCatB').and.callThrough();
    spyOn(FaultCountBHelper, 'getSeriousFaultSumCountCatB').and.callThrough();
    spyOn(FaultCountBHelper, 'getDangerousFaultSumCountCatB').and.callThrough();

    spyOn(FaultCountBEHelper, 'getDrivingFaultSumCountCatBE').and.callThrough();
    spyOn(FaultCountBEHelper, 'getSeriousFaultSumCountCatBE').and.callThrough();
    spyOn(FaultCountBEHelper, 'getDangerousFaultSumCountCatBE').and.callThrough();

    spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatC').and.callThrough();
    spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatC').and.callThrough();
    spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatC').and.callThrough();

    spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatC1').and.callThrough();
    spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatC1').and.callThrough();
    spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatC1').and.callThrough();

    spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatCE').and.callThrough();
    spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatCE').and.callThrough();
    spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatCE').and.callThrough();

    spyOn(FaultCountCHelper, 'getDrivingFaultSumCountCatC1E').and.callThrough();
    spyOn(FaultCountCHelper, 'getSeriousFaultSumCountCatC1E').and.callThrough();
    spyOn(FaultCountCHelper, 'getDangerousFaultSumCountCatC1E').and.callThrough();
  });

  describe('getDrivingFaultSumCount', () => {
    it('should call the category B specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((FaultCountBHelper as any).getDrivingFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((FaultCountBEHelper as any).getDrivingFaultSumCountCatBE).toHaveBeenCalled();
    });
    it('should call the category C specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC).toHaveBeenCalled();
    });
    it('should call the category CE specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.CE, catCETestDataStateObject);
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatCE).toHaveBeenCalled();
    });
    it('should call the category C1E specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.C1E, catC1ETestDataStateObject);
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC1E).toHaveBeenCalled();
    });
    it('should call the category C1 specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.C1, catC1TestDataStateObject);
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC1).toHaveBeenCalled();
    });
  });

  describe('getSeriousFaultSumCount', () => {
    it('should call the category B specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((FaultCountBHelper as any).getSeriousFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((FaultCountBEHelper as any).getSeriousFaultSumCountCatBE).toHaveBeenCalled();
    });
    it('should call the category C specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((FaultCountCHelper as any).getSeriousFaultSumCountCatC).toHaveBeenCalled();
    });
    it('should call the category CE specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.CE, catCETestDataStateObject);
      expect((FaultCountCHelper as any).getSeriousFaultSumCountCatCE).toHaveBeenCalled();
    });
    it('should call the category C1 specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.C1, catC1TestDataStateObject);
      expect((FaultCountCHelper as any).getSeriousFaultSumCountCatC1).toHaveBeenCalled();
    });
    it('should call the category C1E specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.C1E, catC1ETestDataStateObject);
      expect((FaultCountCHelper as any).getSeriousFaultSumCountCatC1E).toHaveBeenCalled();
    });
  });

  describe('getDangerousFaultSumCount', () => {
    it('should call the category B specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect((FaultCountBHelper as any).getDangerousFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
      expect((FaultCountBEHelper as any).getDangerousFaultSumCountCatBE).toHaveBeenCalled();
    });
    it('should call the category C specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.C, catCTestDataStateObject);
      expect((FaultCountCHelper as any).getDangerousFaultSumCountCatC).toHaveBeenCalled();
    });
    it('should call the category C1 specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.C1, catC1TestDataStateObject);
      expect((FaultCountCHelper as any).getDangerousFaultSumCountCatC1).toHaveBeenCalled();
    });
    it('should call the category CE specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.CE, catCETestDataStateObject);
      expect((FaultCountCHelper as any).getDangerousFaultSumCountCatCE).toHaveBeenCalled();
    });
    it('should call the category C1E specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.C1E, catC1ETestDataStateObject);
      expect((FaultCountCHelper as any).getDangerousFaultSumCountCatC1E).toHaveBeenCalled();
    });
  });

  describe('getDrivingFaultSumCountCatB', () => {
    it('should return the driving fault for cat B count correctly', () => {
      expect((FaultCountBHelper as any).getDrivingFaultSumCountCatB(catBTestDataStateObject)).toBe(4);
    });
  });

  describe('getDrivingFaultSumCountCatBE', () => {
    it('should return the driving fault for cat BE count correctly', () => {
      expect((FaultCountBEHelper as any).getDrivingFaultSumCountCatBE(catBETestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatC', () => {
    it('should return the driving fault for cat C count correctly', () => {
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC(catCTestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatC1', () => {
    it('should return the driving fault for cat C1 count correctly', () => {
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC1(catC1TestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatCE', () => {
    it('should return the driving fault for cat CE count correctly', () => {
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC(catCETestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatC1E', () => {
    it('should return the driving fault for cat C1E count correctly', () => {
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC1E(catC1ETestDataStateObject)).toBe(5);
    });
  });

  describe('getSeriousFaultSumCountCatB', () => {
    it('should return the serious faults count', () => {
      expect((FaultCountBHelper as any).getSeriousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
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
      expect((FaultCountBHelper as any).getSeriousFaultSumCountCatB(failedState)).toBe(5);
    });
  });

  describe('getDangerousFaultSumCountCatB', () => {
    it('should return the dangerous faults count', () => {
      expect((FaultCountBHelper as any).getDangerousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
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
      expect((FaultCountBHelper as any).getDangerousFaultSumCountCatB(failedState)).toBe(4);
    });
  });

  describe('getSeriousFaultSumCountCatBE', () => {
    it('should return the serious faults count', () => {
      expect((FaultCountBEHelper as any).getSeriousFaultSumCountCatBE(catBETestDataStateObject)).toBe(1);
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
            outcome: 'DF',
          }],
        },
        eyesightTest: {
          complete: true,
          seriousFault: true,
        },
      };
      expect((FaultCountBEHelper as any).getSeriousFaultSumCountCatBE(failedState)).toBe(2);
    });
  });

  describe('getDangerousFaultSumCountCatBE', () => {
    it('should return the dangerous faults count', () => {
      expect((FaultCountBEHelper as any).getDangerousFaultSumCountCatBE(catBETestDataStateObject)).toBe(1);
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
            outcome: 'DF',
          }],
        },
      };
      expect((FaultCountBEHelper as any).getDangerousFaultSumCountCatBE(failedState)).toBe(1);
    });
  });
});
