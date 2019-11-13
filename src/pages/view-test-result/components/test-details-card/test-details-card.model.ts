import { TestCategory } from '../../../../shared/models/test-category';

export interface TestDetailsModel {
  date: string;
  time: string;
  applicationReference: string;
  category: TestCategory;
  slotType: string;
  specialNeeds: string[];
  previousCancellations: string[];
  entitlementCheck: boolean;
}
