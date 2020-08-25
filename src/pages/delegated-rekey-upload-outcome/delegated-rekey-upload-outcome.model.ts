export type DelegatedRekeyUploadStatusModel = {
  uploadStatus: DelegatedRekeyUploadOutcomeModel,
};

export type DelegatedRekeyUploadOutcomeModel = {
  isUploading: boolean,
  hasUploadSucceeded: boolean,
};
