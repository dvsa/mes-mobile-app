import { RekeyReasonModel, RekeyReasonUploadModel } from './rekey-reason.model';

export const getUploadStatus = (rekeyReason: RekeyReasonModel): RekeyReasonUploadModel => rekeyReason.uploadStatus;
