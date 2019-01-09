
export type Details = {
  testCategory: {
    text: string,
    icon: string,
  },
  slotType: {
    text: string,
    icon: string,
  },
  driverNumber: string,
  applicationRef: string,
  candidateComments: {
    specialNeeds: string,
    previousCancellations: { initiator: string }[],
  },
  phoneNumber: string,
  email: string,
  address: {
    street: string,
    city: string,
    postcode: string,
  }
};