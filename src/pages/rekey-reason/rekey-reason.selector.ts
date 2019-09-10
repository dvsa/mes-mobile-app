import { RekeyReasonModel, RekeyReasonFindUserModel, RekeyReasonUploadModel } from './rekey-reason.model';

export const getUploadStatus = (rekeyReason: RekeyReasonModel): RekeyReasonUploadModel => rekeyReason.uploadStatus;
export const getFindUserStatus = (rekeyReason: RekeyReasonModel): RekeyReasonFindUserModel => rekeyReason.findUser;
