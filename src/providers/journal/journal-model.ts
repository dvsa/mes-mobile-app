export interface ICandidateName {
  firstName: string;
  lastName: string;
  secondName?: string;
  thirdName?: string;
  title: string;
}

export interface IAddress {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;
  postcode: string;
}

export interface IJournal {
  details?: ITestDetails;
  candidateId: number;
  candidateName: ICandidateName;
  candidateAddress?: IAddress;
  driverNumber: string;
  email: string;
  mobileTelephone: string;
  startTime: string;
  appId: string;
  testCentreName: string;
  slotType: string | null;
  checkMarker: boolean;
}

export interface ITestDetails {
  success: boolean;
  route: number;
  showMe: number;
  tellMe: number;
}

export interface IJournalResp {
  message: string;
  data: ITestSlots;
}

export interface ITestSlots {
  testSlots: IJournal[];
}
