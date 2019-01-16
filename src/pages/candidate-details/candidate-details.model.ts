
export type SlotTypeView = {
  text: string,
  icon: string,
};

export type Details = {
  testCategory: {
    text: string,
    icon: string,
  },
  slotType: SlotTypeView,
  driverNumber: string,
  applicationRef: string,
  candidateComments: {
    isSectionEmpty: boolean,
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