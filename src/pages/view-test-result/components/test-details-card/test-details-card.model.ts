export interface TestDetailsModel {
  date: string;
  time: string;
  applicationReference: string;
  category: string;
  slotType: string;
  specialNeeds: string[];
  previousCancellations: string[];
  entitlementCheck: boolean;
}
