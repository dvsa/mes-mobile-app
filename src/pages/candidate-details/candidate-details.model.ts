export type Details = {
  testCategory: string,
  slotType: string,
  driverNumber: string,
  applicationRef: string,
  candidateComments: {
    isSectionEmpty: boolean,
    specialNeeds: string,
    previousCancellations: { initiator: string }[],
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
