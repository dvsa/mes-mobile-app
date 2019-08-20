import { RekeyReasonModel } from './rekey-reason.model';

export const getIsUploading = (rekeyReason: RekeyReasonModel) => rekeyReason.isUploading;

export const getHasUploaded = (rekeyReason: RekeyReasonModel) => rekeyReason.hasUploaded;

export const getHasTriedUploading = (rekeyReason: RekeyReasonModel) => rekeyReason.hasTriedUploading;
