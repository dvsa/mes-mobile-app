import { FaultSummaryProvider } from '../fault-summary';
import { TestBed } from '@angular/core/testing';
import { TestData } from '@dvsa/mes-test-schema/categories/common';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

describe('faultSummaryProvider', () => {

  let faultSummaryProvider: FaultSummaryProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultSummaryProvider,
        FaultCountProvider,
      ],
    });

    faultSummaryProvider = TestBed.get(FaultSummaryProvider);
  });

  describe('getDrivingFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no driving faults', () => {
        const result = faultSummaryProvider.getDrivingFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of driving faults > 0', () => {
        const data: TestData = {
          drivingFaults: {
            useOfMirrorsChangeDirection: 1,
            useOfMirrorsSignalling: 2,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return faults in reverse order of fault count', () => {
        const data: TestData = {
          drivingFaults: {
            useOfSpeed: 1,
            controlsSteering: 2,
            junctionsObservation: 5,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result[0].faultCount).toEqual(5);
        expect(result[1].faultCount).toEqual(2);
        expect(result[2].faultCount).toEqual(1);
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBUniqueTypes.TestData = {
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'DF',
            selected: true,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any vehicle checks faults', () => {
        const data: CatBUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestion: {
              outcome: 'DF',
            },
            showMeQuestion: {
              outcome: 'DF',
            },
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no driving faults', () => {
        const result = faultSummaryProvider.getDrivingFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of driving faults > 0', () => {
        const data: TestData = {
          drivingFaults: {
            useOfMirrorsChangeDirection: 1,
            useOfMirrorsSignalling: 2,
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
              controlFault: 'DF',
              observationFault: 'DF',
            },
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
        expect(result[0].competencyDisplayName).toEqual('Reverse - Control');
        expect(result[1].competencyDisplayName).toEqual('Reverse - Observation');
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'DF',
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any vehicle checks faults when there are 4 driving faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
            showMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(4);
      });
      it('should correctly return any vehicle checks faults when there are 5 driving faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
            showMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
          },
        };
        const result = faultSummaryProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(4);
      });
    });
  });

  describe('getSeriousFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getSeriousFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          seriousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return an eyesight fail fault if one exists', () => {
        const data: CatBUniqueTypes.TestData = {
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'test-fault-comment',
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result[0].competencyIdentifier).toEqual('eyesightTest');
        expect(result[0].comment).toEqual('test-fault-comment');
      });
      it('should correctly return any vehicle checks faults', () => {
        const data: CatBUniqueTypes.TestData = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: 'S',
            },
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'S',
            selected: true,
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should return an array length matching the number of manoeuvre driving faults', () => {
        const data: CatBUniqueTypes.TestData = {
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: 'S',
              observationFault: 'S',
            },
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getSeriousFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          seriousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should return an eyesight fail fault if one exists', () => {
        const data: CatBUniqueTypes.TestData = {
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'test-fault-comment',
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result[0].competencyIdentifier).toEqual('eyesightTest');
        expect(result[0].comment).toEqual('test-fault-comment');
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
              controlFault: 'S',
              observationFault: 'S',
            },
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'S',
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any vehicle checks faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          vehicleChecks: {
            tellMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
            showMeQuestions: [
              { outcome: 'DF' },
              { outcome: 'DF' },
            ],
          },
        };
        const result = faultSummaryProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(1);
      });
    });
  });

  describe('getDangerousFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getDangerousFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return an array length matching the number of manoeuvre driving faults', () => {
        const data: CatBUniqueTypes.TestData = {
          manoeuvres: {
            forwardPark: {
              selected: true,
              controlFault: 'D',
              observationFault: 'D',
            },
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any vehicle checks faults', () => {
        const data: CatBUniqueTypes.TestData = {
          vehicleChecks: {
            showMeQuestion: {
              outcome: 'D',
            },
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'D',
            selected: true,
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultSummaryProvider.getDangerousFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any manoeuvre faults', () => {
        const data: CatBEUniqueTypes.TestData = {
          manoeuvres: {
            reverseLeft: {
              selected: true,
              controlFault: 'D',
              observationFault: 'D',
            },
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'D',
          },
        };
        const result = faultSummaryProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
    });
  });

});
