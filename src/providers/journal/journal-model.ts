export interface IJournal {
  details?: ITestDetails;
  candidateId: number;
  candidateName: String;
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
