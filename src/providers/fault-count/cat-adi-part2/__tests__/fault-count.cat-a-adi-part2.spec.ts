import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { FaultCountADIPart2Helper } from '../fault-count.cat-adi-part2';
import {
  catADI2TestDataStateObjectControlledStopDrivingFaults,
  catADI2TestDataStateObjectSeriousFaults,
  catADI2TestDataStateObjectManoeuvreFaults,
  catADI2TestDataStateObjectNoDrivingFaults,
  catADI2TestDataStateObjectTellMeFaults,
} from '../../__mocks__/cat-ADI2-test-data-state-object';
// import { FaultCountAM2Helper } from '../fault-count.cat-a-mod2';
// import {
//     catAM2TestDataStateObject,
//     safetyAndBalanceMock0Faults,
//     safetyAndBalanceMock2FaultsSafety,
//     safetyAndBalanceMock2FaultsSafetyAndBalance,
//     safetyAndBalanceMock3FaultsSafetyAndBalance,
// } from '../../__mocks__/cat-AM2-test-data-state-object';

fdescribe('FaultCountADIPart2Helper', () => {

  configureTestSuite(() => {
    TestBed.configureTestingModule({});
  });

  describe('getDrivingFaultSumCountCatADIPart2', () => {
    it('Should return 0 when no driving faults exist', () => {
      const temp =
        FaultCountADIPart2Helper.getDrivingFaultSumCountCatADIPart2(catADI2TestDataStateObjectNoDrivingFaults);
      expect(temp).toEqual(0);
    });

    it('Should return 1 when manoeuvre fault exists', () => {
      const temp =
        FaultCountADIPart2Helper.getDrivingFaultSumCountCatADIPart2(catADI2TestDataStateObjectManoeuvreFaults);
      expect(temp).toEqual(1);
    });

    it('Should return 2 when 2 vehicle check driving fault exists', () => {
      const temp =
        FaultCountADIPart2Helper.getDrivingFaultSumCountCatADIPart2(catADI2TestDataStateObjectTellMeFaults);
      expect(temp).toEqual(2);
    });

    it('Should return 1 when a controlledStop driving fault exists', () => {
      const temp =
        FaultCountADIPart2Helper.
        getDrivingFaultSumCountCatADIPart2(catADI2TestDataStateObjectControlledStopDrivingFaults);
      expect(temp).toEqual(1);
    });

    describe('getSeriousFaultSumCountCatADIPart2', () => {
      it('Should return 0 when no serious faults exist', () => {
        const temp =
          FaultCountADIPart2Helper.getSeriousFaultSumCountCatADIPart2(catADI2TestDataStateObjectNoDrivingFaults);
        expect(temp).toEqual(0);
      });

      it('Should return 1 when serious fault exists (1 for each type', () => {
        const temp =
          FaultCountADIPart2Helper.
          getDrivingFaultSumCountCatADIPart2(catADI2TestDataStateObjectSeriousFaults);
        expect(temp).toEqual(3);
      });
    });
  });
});
