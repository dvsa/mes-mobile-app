import { FaultListProvider } from '../fault-list';
import { TestBed } from '@angular/core/testing';
import { TestData } from '@dvsa/mes-test-schema/categories/Common';
import { TestCategory } from '../../../shared/models/test-category';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { FaultCountProvider } from '../../fault-count/fault-count';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

describe('faultListProvider', () => {

  let faultListProvider: FaultListProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultListProvider,
        FaultCountProvider,
      ],
    });

    faultListProvider = TestBed.get(FaultListProvider);
  });

  describe('getDrivingFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no driving faults', () => {
        const result = faultListProvider.getDrivingFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of driving faults > 0', () => {
        const data: TestData = {
          drivingFaults: {
            useOfMirrorsChangeDirection: 1,
            useOfMirrorsSignalling: 2,
          },
        };
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'DF',
            selected: true,
          },
        };
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no driving faults', () => {
        const result = faultListProvider.getDrivingFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of driving faults > 0', () => {
        const data: TestData = {
          drivingFaults: {
            useOfMirrorsChangeDirection: 1,
            useOfMirrorsSignalling: 2,
          },
        };
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.BE);
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
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'DF',
          },
        };
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.BE);
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
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.BE);
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
        const result = faultListProvider.getDrivingFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(4);
      });
    });
  });

  describe('getSeriousFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultListProvider.getSeriousFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          seriousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
      it('should return an eyesight fail fault if one exists', () => {
        const data: TestData = {
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'test-fault-comment',
          },
        };
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'S',
            selected: true,
          },
        };
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(2);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultListProvider.getSeriousFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          seriousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should return an eyesight fail fault if one exists', () => {
        const data: TestData = {
          eyesightTest: {
            complete: true,
            seriousFault: true,
            faultComments: 'test-fault-comment',
          },
        };
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.BE);
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
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'S',
          },
        };
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.BE);
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
        const result = faultListProvider.getSeriousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
        expect(result[0].faultCount).toEqual(1);
      });
    });
  });

  describe('getDangerousFaultsList', () => {
    describe('Category B', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultListProvider.getDangerousFaultsList({}, TestCategory.B);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.B);
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
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
      it('should correctly return any controlled stop faults', () => {
        const data: CatBUniqueTypes.TestData = {
          controlledStop: {
            fault: 'D',
            selected: true,
          },
        };
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.B);
        expect(result.length).toEqual(1);
      });
    });
    describe('Category B+E', () => {
      it('should return an empty array if there are no serious faults', () => {
        const result = faultListProvider.getDangerousFaultsList({}, TestCategory.BE);
        expect(result.length).toEqual(0);
      });
      it('should return an array matching the number of serious faults set to true', () => {
        const data: TestData = {
          dangerousFaults: {
            ancillaryControls: true,
            awarenessPlanning: true,
          },
        };
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.BE);
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
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(2);
      });
      it('should correctly return any uncouple recouple faults ', () => {
        const data: CatBEUniqueTypes.TestData = {
          uncoupleRecouple: {
            selected: true,
            fault: 'D',
          },
        };
        const result = faultListProvider.getDangerousFaultsList(data, TestCategory.BE);
        expect(result.length).toEqual(1);
      });
    });
  });

});
