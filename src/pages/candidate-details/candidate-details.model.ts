export type Details = {
  testCategory: string,
  slotType: string,
  meetingPlace: string,
  driverNumber: string,
  applicationRef: string,
  specialNeeds: string | string[],
  candidateComments: {
    isSectionEmpty: boolean,
    previousCancellations: string[],
  },
  entitlementCheck: {
    show: boolean,
  }
  phoneNumber: string,
  email: string,
  address: {
    street: string,
    city: string,
    postcode: string,
  },
};
