import { of } from 'rxjs/observable/of';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

const fakeTestResult: StandardCarTestCATBSchema = {
  category: 'B',
  activityCode: '1',
  journalData: {
    applicationReference: {
      applicationId: 1,
      bookingSequence: 1,
      checkDigit: 1,
    },
    candidate: {

    },
    examiner: {
      staffNumber: '12345',
    },
    testCentre: {
      centreId: 1,
      costCode: '1',
    },
    testSlotAttributes: {
      slotId: 1,
      welshTest: false,
      start: '',
      vehicleSlotType: 'B',
      specialNeeds: false,
      extendedTest: false,
    },
  },
};

export class SearchProviderMock {

  driverNumberSearch =
    jasmine.createSpy('driverNumberSearch').and.returnValue(of([fakeTestResult]));

  applicationReferenceSearch =
    jasmine.createSpy('applicationReferenceSearch').and.returnValue(of([fakeTestResult]));

}
