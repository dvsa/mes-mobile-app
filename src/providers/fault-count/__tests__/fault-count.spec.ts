import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { FaultCountProvider } from '../fault-count';
import { TestBed } from '@angular/core/testing';
import { catBTestDataStateObject } from '../__mocks__/cat-B-test-data-state-object';
import { catBETestDataStateObject } from '../__mocks__/cat-BE-test-data-state-object';
import { TestCategory } from '../../../shared/models/test-category';

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
  });

  describe('getDrivingFaultSumCount', () => {
    it('should call the category B specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect(faultCountProvider.getDrivingFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the driving fault sum count', () => {
      faultCountProvider.getDrivingFaultSumCount(TestCategory.BE, catBTestDataStateObject);
      expect(faultCountProvider.getDrivingFaultSumCountCatBE).toHaveBeenCalled();
    });
  });

  describe('getSeriousFaultSumCount', () => {
    it('should call the category B specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect(faultCountProvider.getSeriousFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the serious fault sum count', () => {
      faultCountProvider.getSeriousFaultSumCount(TestCategory.BE, catBTestDataStateObject);
      expect(faultCountProvider.getSeriousFaultSumCountCatBE).toHaveBeenCalled();
    });
  });

  describe('getDangerousFaultSumCount', () => {
    it('should call the category B specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.B, catBTestDataStateObject);
      expect(faultCountProvider.getDangerousFaultSumCountCatB).toHaveBeenCalled();
    });
    it('should call the category BE specific method for getting the dangerous fault sum count', () => {
      faultCountProvider.getDangerousFaultSumCount(TestCategory.BE, catBTestDataStateObject);
      expect(faultCountProvider.getDangerousFaultSumCountCatBE).toHaveBeenCalled();
    });
  });

  describe('getDrivingFaultSumCountCatB', () => {
    it('should return the driving fault for cat B count correctly', () => {
      expect(faultCountProvider.getDrivingFaultSumCountCatB(catBTestDataStateObject)).toBe(4);
    });
  });

  describe('getDrivingFaultSumCountCatBE', () => {
    it('should return the driving fault for cat BE count correctly', () => {
      expect(faultCountProvider.getDrivingFaultSumCountCatBE(catBETestDataStateObject)).toBe(5);
    });
  });

  describe('getSeriousFaultSumCountCatB', () => {
    it('should return the serious faults count', () => {
      expect(faultCountProvider.getSeriousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
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
      expect(faultCountProvider.getSeriousFaultSumCountCatB(failedState)).toBe(5);
    });
  });

  describe('getDangerousFaultSumCountCatB', () => {
    it('should return the dangerous faults count', () => {
      expect(faultCountProvider.getDangerousFaultSumCountCatB(catBTestDataStateObject)).toBe(1);
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
      expect(faultCountProvider.getDangerousFaultSumCountCatB(failedState)).toBe(4);
    });
  });

});
