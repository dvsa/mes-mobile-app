import { ActivityCodes } from '../../../shared/models/activity-codes';
import { of } from 'rxjs';

export class TestResultProviderMock {
  calculateCatBTestResult = jasmine.createSpy('calculateCatBTestResult').and.returnValue(ActivityCodes.PASS);
  calculateCatCPCTestResult = jasmine.createSpy('calculateCatCPCTestResult').and.returnValue(of(ActivityCodes.PASS));
  calculateTestResult = jasmine.createSpy('calculateCatCPCTestResult').and.returnValue(of(ActivityCodes.PASS));
}
