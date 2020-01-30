import { PassCompletionUnion } from './pass-completion.constants';

export const getPassCertificateNumber = (
  passCompletion: PassCompletionUnion,
  ) => passCompletion.passCertificateNumber;
export const isProvisionalLicenseProvided =
  (passCompletion: PassCompletionUnion) => passCompletion.provisionalLicenceProvided;
export const isProvisionalLicenseNotProvided =
  (passCompletion: PassCompletionUnion) => passCompletion.provisionalLicenceProvided !== null
  && !passCompletion.provisionalLicenceProvided;
