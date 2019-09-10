export type RekeyReasonModel = {
  uploadStatus: RekeyReasonUploadModel,
  findUser: RekeyReasonFindUserModel,
};

export type RekeyReasonUploadModel = {
  isUploading: boolean,
  hasUploadSucceeded: boolean,
  hasUploadFailed: boolean,
  isDuplicate: boolean,
};

export type RekeyReasonFindUserModel = {
  isLoading: boolean,
  isValid: boolean,
};
