export type Details = {
  testCategory: string,
  slotType: string,
  driverNumber: string,
  applicationRef: string,
  specialNeeds: string | string[],
  candidateComments: {
    isSectionEmpty: boolean,
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
