import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';

import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { SafetyAndBalanceQuestions, QuestionResult } from '@dvsa/mes-test-schema/categories/AM2';

import { catAM1TestDataStateObject } from '../__mocks__/cat-AM1-test-data-state-object';
import { catBTestDataStateObject } from '../__mocks__/cat-B-test-data-state-object';
import { catBETestDataStateObject } from '../__mocks__/cat-BE-test-data-state-object';
import { catCTestDataStateObject } from '../__mocks__/cat-C-test-data-state-object';
import { catCETestDataStateObject } from '../__mocks__/cat-CE-test-data-state-object';
import { catC1ETestDataStateObject } from '../__mocks__/cat-C1E-test-data-state-object';
import { catC1TestDataStateObject } from '../__mocks__/cat-C1-test-data-state-object';
import { catDTestDataStateObject } from '../__mocks__/cat-D-test-data-state-object';
import { catDETestDataStateObject } from '../__mocks__/cat-DE-test-data-state-object';
import { catD1ETestDataStateObject } from '../__mocks__/cat-D1E-test-data-state-object';
import { catD1TestDataStateObject } from '../__mocks__/cat-D1-test-data-state-object';

import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

import { FaultCountBHelper } from '../cat-b/fault-count.cat-b';
import { FaultCountBEHelper } from '../cat-be/fault-count.cat-be';
import { FaultCountCHelper } from '../cat-c/fault-count.cat-c';
import { FaultCountDHelper } from '../cat-d/fault-count.cat-d';

import { configureTestSuite } from 'ng-bullet';
import { FaultCountAM1Helper } from '../cat-a-mod1/fault-count.cat-a-mod1';
import { FaultCountAM2Helper } from '../cat-a-mod2/fault-count.cat-a-mod2';

describe('FaultCountProvider', () => {

  let faultCountProvider: FaultCountProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultCountProvider,
      ],
    });
  });

  beforeEach(() => {

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

    spyOn(FaultCountAM1Helper, 'getDangerousFaultSumCountCatAM1').and.callThrough();
    spyOn(FaultCountAM1Helper, 'getSeriousFaultSumCountCatAM1').and.callThrough();
    spyOn(FaultCountAM1Helper, 'getRidingFaultSumCountCatAM1').and.callThrough();

    spyOn(FaultCountAM2Helper, 'getSafetyAndBalanceFaultCountCatAM2').and.callThrough();

    spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatD').and.callThrough();
    spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatD').and.callThrough();
    spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatD').and.callThrough();

    spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatD1').and.callThrough();
    spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatD1').and.callThrough();
    spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatD1').and.callThrough();

    spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatDE').and.callThrough();
    spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatDE').and.callThrough();
    spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatDE').and.callThrough();

    spyOn(FaultCountDHelper, 'getDrivingFaultSumCountCatD1E').and.callThrough();
    spyOn(FaultCountDHelper, 'getSeriousFaultSumCountCatD1E').and.callThrough();
    spyOn(FaultCountDHelper, 'getDangerousFaultSumCountCatD1E').and.callThrough();

    spyOn(FaultCountDHelper, 'getSafetyQuestionsFaultCount').and.callThrough();
  });

  describe('getDrivingFaultSumCount', () => {
    describe('CAT A', () => {
      it('shoud call the category AM1 specific method for getting the riding fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.EUAM1, catAM1TestDataStateObject);
        expect((FaultCountAM1Helper as any).getRidingFaultSumCountCatAM1).toHaveBeenCalled();
      });
    });

    describe('CAT B', () => {
      it('should call the category B specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.B, catBTestDataStateObject);
        expect((FaultCountBHelper as any).getDrivingFaultSumCountCatB).toHaveBeenCalled();
      });
      it('should call the category BE specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, catBETestDataStateObject);
        expect((FaultCountBEHelper as any).getDrivingFaultSumCountCatBE).toHaveBeenCalled();
      });
    });

    describe('CAT C', () => {
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

    describe('CAT D', () => {
      it('should call the category D specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.D, catDTestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD).toHaveBeenCalled();
      });
      it('should call the category DE specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.DE, catDETestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatDE).toHaveBeenCalled();
      });
      it('should call the category D1E specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.D1E, catD1ETestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD1E).toHaveBeenCalled();
      });
      it('should call the category D1 specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.D1, catD1TestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD1).toHaveBeenCalled();
      });
    });
  });

  describe('getSeriousFaultSumCount', () => {
    describe('CAT B', () => {
      it('should call the category B specific method for getting the serious fault sum count', () => {
        faultCountProvider.getSeriousFaultSumCount(TestCategory.B, catBTestDataStateObject);
        expect((FaultCountBHelper as any).getSeriousFaultSumCountCatB).toHaveBeenCalled();
      });
      it('should call the category BE specific method for getting the serious fault sum count', () => {
        faultCountProvider.getSeriousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
        expect((FaultCountBEHelper as any).getSeriousFaultSumCountCatBE).toHaveBeenCalled();
      });
    });

    describe('CAT C', () => {
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

    describe('CAT D', () => {
      it('should call the category D specific method for getting the serious fault sum count', () => {
        faultCountProvider.getSeriousFaultSumCount(TestCategory.D, catDTestDataStateObject);
        expect((FaultCountDHelper as any).getSeriousFaultSumCountCatD).toHaveBeenCalled();
      });
      it('should call the category DE specific method for getting the serious fault sum count', () => {
        faultCountProvider.getSeriousFaultSumCount(TestCategory.DE, catDETestDataStateObject);
        expect((FaultCountDHelper as any).getSeriousFaultSumCountCatDE).toHaveBeenCalled();
      });
      it('should call the category D1 specific method for getting the serious fault sum count', () => {
        faultCountProvider.getSeriousFaultSumCount(TestCategory.D1, catD1TestDataStateObject);
        expect((FaultCountDHelper as any).getSeriousFaultSumCountCatD1).toHaveBeenCalled();
      });
      it('should call the category D1E specific method for getting the serious fault sum count', () => {
        faultCountProvider.getSeriousFaultSumCount(TestCategory.D1E, catD1ETestDataStateObject);
        expect((FaultCountDHelper as any).getSeriousFaultSumCountCatD1E).toHaveBeenCalled();
      });
    });
    it('should call the category AM1 specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.EUAM1, catAM1TestDataStateObject);
      expect((FaultCountAM1Helper as any).getSeriousFaultSumCountCatAM1).toHaveBeenCalled();
    });
  });

  describe('getDangerousFaultSumCount', () => {
    describe('CAT B', () => {
      it('should call the category B specific method for getting the dangerous fault sum count', () => {
        faultCountProvider.getDangerousFaultSumCount(TestCategory.B, catBTestDataStateObject);
        expect((FaultCountBHelper as any).getDangerousFaultSumCountCatB).toHaveBeenCalled();
      });
      it('should call the category BE specific method for getting the dangerous fault sum count', () => {
        faultCountProvider.getDangerousFaultSumCount(TestCategory.BE, catBETestDataStateObject);
        expect((FaultCountBEHelper as any).getDangerousFaultSumCountCatBE).toHaveBeenCalled();
      });
    });

    describe('CAT C', () => {
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

    describe('CAT D', () => {
      it('should call the category D specific method for getting the dangerous fault sum count', () => {
        faultCountProvider.getDangerousFaultSumCount(TestCategory.D, catDTestDataStateObject);
        expect((FaultCountDHelper as any).getDangerousFaultSumCountCatD).toHaveBeenCalled();
      });
      it('should call the category D1 specific method for getting the dangerous fault sum count', () => {
        faultCountProvider.getDangerousFaultSumCount(TestCategory.D1, catD1TestDataStateObject);
        expect((FaultCountDHelper as any).getDangerousFaultSumCountCatD1).toHaveBeenCalled();
      });
      it('should call the category DE specific method for getting the dangerous fault sum count', () => {
        faultCountProvider.getDangerousFaultSumCount(TestCategory.DE, catDETestDataStateObject);
        expect((FaultCountDHelper as any).getDangerousFaultSumCountCatDE).toHaveBeenCalled();
      });
      it('should call the category D1E specific method for getting the dangerous fault sum count', () => {
        faultCountProvider.getDangerousFaultSumCount(TestCategory.D1E, catD1ETestDataStateObject);
        expect((FaultCountDHelper as any).getDangerousFaultSumCountCatD1E).toHaveBeenCalled();
      });
    });
    it('should call the category AM1 specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.EUAM1, catAM1TestDataStateObject);
      expect((FaultCountAM1Helper as any).getDangerousFaultSumCountCatAM1).toHaveBeenCalled();
    });
  });

  describe('getDrivingFaultSumCount', () => {
    describe('CAT B', () => {
      it('should call the category B specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.B, catBTestDataStateObject);
        expect((FaultCountBHelper as any).getDrivingFaultSumCountCatB).toHaveBeenCalled();
      });
      it('should call the category BE specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, catBETestDataStateObject);
        expect((FaultCountBEHelper as any).getDrivingFaultSumCountCatBE).toHaveBeenCalled();
      });
    });

    describe('CAT C', () => {
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

    describe('CAT D', () => {
      it('should call the category D specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.D, catDTestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD).toHaveBeenCalled();
      });
      it('should call the category DE specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.DE, catDETestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatDE).toHaveBeenCalled();
      });
      it('should call the category D1E specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.D1E, catD1ETestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD1E).toHaveBeenCalled();
      });
      it('should call the category D1 specific method for getting the driving fault sum count', () => {
        faultCountProvider.getDrivingFaultSumCount(TestCategory.D1, catD1TestDataStateObject);
        expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD1).toHaveBeenCalled();
      });
    });

    it('shoud call the category AM1 specific method for getting the riding fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.EUAM1, catAM1TestDataStateObject);
      expect((FaultCountAM1Helper as any).getRidingFaultSumCountCatAM1).toHaveBeenCalled();
    });
  });

  describe('getSafetyQuestionsFaultSumCount', () => {
    describe('CAT D', () => {
      it('should call the category D method for getting the safetyQuestions fault sum count', () => {
        faultCountProvider.getSafetyQuestionsFaultCount(TestCategory.D, catDTestDataStateObject.safetyQuestions);
        expect((FaultCountDHelper as any).getSafetyQuestionsFaultCount).toHaveBeenCalled();
      });
      it('should call the category D method for getting the safetyQuestions fault sum count', () => {
        faultCountProvider.getSafetyQuestionsFaultCount(TestCategory.DE, catDTestDataStateObject.safetyQuestions);
        expect((FaultCountDHelper as any).getSafetyQuestionsFaultCount).toHaveBeenCalled();
      });
      it('should call the category D method for getting the safetyQuestions fault sum count', () => {
        faultCountProvider.getSafetyQuestionsFaultCount(TestCategory.D1E, catDTestDataStateObject.safetyQuestions);
        expect((FaultCountDHelper as any).getSafetyQuestionsFaultCount).toHaveBeenCalled();
      });
      it('should call the category D method for getting the safetyQuestions fault sum count', () => {
        faultCountProvider.getSafetyQuestionsFaultCount(TestCategory.D1, catDTestDataStateObject.safetyQuestions);
        expect((FaultCountDHelper as any).getSafetyQuestionsFaultCount).toHaveBeenCalled();
      });

      it('should return the correct number of driving faults', () => {
        const faultsState: CatDUniqueTypes.SafetyQuestions = {
          questions: [
            {
              description: 'string',
              outcome: 'DF',
            },
            {
              description: 'string',
              outcome: 'DF',
            },
            {
              description: 'string',
              outcome: 'P',
            },
          ],
        };
        expect((FaultCountDHelper as any).getSafetyQuestionsFaultCount(faultsState)).toEqual({ drivingFaults: 1 });
      });
    });
  });

  describe('getSafetyAndBalanceFaultCount', () => {
    describe('CAT A Mod 2', () => {
      it('should return the correct number of driving faults', () => {
        const safetyAndBalanceQuestions: SafetyAndBalanceQuestions = {
          safetyQuestions: [
            {
              outcome: 'DF',
            },
            {
              outcome: 'DF',
            },
          ] as QuestionResult[],
          balanceQuestions: [
            {
              outcome: 'DF',
            },
          ] as QuestionResult[],
        };

        expect((FaultCountAM2Helper as any).getSafetyAndBalanceFaultCountCatAM2(safetyAndBalanceQuestions))
          .toEqual({ drivingFaults: 1 });
      });
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
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatCE(catCETestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatC1E', () => {
    it('should return the driving fault for cat C1E count correctly', () => {
      expect((FaultCountCHelper as any).getDrivingFaultSumCountCatC1E(catC1ETestDataStateObject)).toBe(5);
    });
  });

  describe('getRidingFaultSumCountCatAM1', () => {
    it('should return the driving fault for cat AM1 count correctly', () => {
      expect((FaultCountAM1Helper as any).getRidingFaultSumCountCatAM1(catAM1TestDataStateObject)).toBe(5);
    });
  });

  describe('getDrivingFaultSumCountCatD', () => {
    it('should return the driving fault for cat D count correctly', () => {
      expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD(catDTestDataStateObject)).toBe(6);
    });
  });

  describe('getDrivingFaultSumCountCatD1', () => {
    it('should return the driving fault for cat D1 count correctly', () => {
      expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD1(catD1TestDataStateObject)).toBe(6);
    });
  });

  describe('getDrivingFaultSumCountCatDE', () => {
    it('should return the driving fault for cat DE count correctly', () => {
      expect((FaultCountDHelper as any).getDrivingFaultSumCountCatDE(catDETestDataStateObject)).toBe(6);
    });
  });

  describe('getDrivingFaultSumCountCatD1E', () => {
    it('should return the driving fault for cat D1E count correctly', () => {
      expect((FaultCountDHelper as any).getDrivingFaultSumCountCatD1E(catD1ETestDataStateObject)).toBe(6);
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

  describe('getDangerousFaultSumCountCatAM1', () => {
    it('should return the dangerous faults count', () => {
      expect((FaultCountAM1Helper as any).getDangerousFaultSumCountCatAM1(catAM1TestDataStateObject)).toBe(5);
    });
  });

  describe('getSeriousFaultSumCountCatAM1', () => {
    it('should return the serious faults count', () => {
      expect((FaultCountAM1Helper as any).getSeriousFaultSumCountCatAM1(catAM1TestDataStateObject)).toBe(3);
    });
  });
});
