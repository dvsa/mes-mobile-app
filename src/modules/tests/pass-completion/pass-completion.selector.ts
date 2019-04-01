import { PassCompletion } from '@dvsa/mes-test-schema/categories/B';

export const getPassCertificateNumber = (passCompletion: PassCompletion) => passCompletion.passCertificateNumber;
export const provisionalLicenseProvided =
  (passCompletion: PassCompletion) => passCompletion.provisionalLicenceProvided === true;
export const provisionalLicenseNotProvided =
  (passCompletion: PassCompletion) => passCompletion.provisionalLicenceProvided === false;
