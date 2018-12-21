export interface TestSlot {
  booking: any,
  slotDetail: any,
  testCentre: any,
  vehicleSlotType: string
}

export interface JournalModel {
  isLoading: boolean,
  testSlot: TestSlot[],
  error: any,
}