import { PassCompletion } from '@dvsa/mes-test-schema/categories/B';

export const getPassCertificateNumber = (passCompletion: PassCompletion) => passCompletion.passCertificateNumber;
export const isProvisionalLicenseProvided =
  (passCompletion: PassCompletion) => passCompletion.provisionalLicenceProvided;
export const isProvisionalLicenseNotProvided =
  (passCompletion: PassCompletion) => passCompletion.provisionalLicenceProvided !== null
  && !passCompletion.provisionalLicenceProvided;
