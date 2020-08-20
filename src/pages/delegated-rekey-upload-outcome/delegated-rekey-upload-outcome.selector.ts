import {
  DelegatedRekeyUploadStatusModel,
} from './delegated-rekey-upload-outcome.model';

export const getDelegatedUploadStatus =
  (delegatedRekeyUploadOutcome: DelegatedRekeyUploadStatusModel):
  boolean => delegatedRekeyUploadOutcome.uploadStatus.hasUploadSucceeded;
