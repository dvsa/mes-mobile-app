import { FaultListProvider } from '../fault-list';
import { TestBed } from '@angular/core/testing';
import { TestData } from '@dvsa/mes-test-schema/categories/Common';
import { TestCategory } from '../../../shared/models/test-category';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

describe('faultListProvider', () => {

  let faultListProvider: FaultListProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FaultListProvider,
      ],
    });

    faultListProvider = TestBed.get(FaultListProvider);
  });

  describe('getDrivingFaultsList', () => {
    describe('Common', () => {
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
    });
    describe('Category B', () => {
      it('should return an array length matching the number of manoeuvre driving faults', () => {
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
    });
  });

  describe('getSeriousFaultsList', () => {
    describe('Common', () => {
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
    });
    describe('Category B', () => {
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
  });

  describe('getDangerousFaultsList', () => {
    describe('Common', () => {
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
    });
    describe('Category B', () => {
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
    });
  });

});
