import { ActivityCodes } from '../../../shared/models/activity-codes';

export class TestResultProviderMock {
  calculateCatBTestResult = jasmine.createSpy('calculateCatBTestResult').and.returnValue(ActivityCodes.PASS);
}
