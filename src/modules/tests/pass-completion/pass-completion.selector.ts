import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

export const getPassCertificateNumber = (
  passCompletion: CatCUniqueTypes.PassCompletion,
  ) => passCompletion.passCertificateNumber;
export const isProvisionalLicenseProvided =
  (passCompletion: CatCUniqueTypes.PassCompletion) => passCompletion.provisionalLicenceProvided;
export const isProvisionalLicenseNotProvided =
  (passCompletion: CatCUniqueTypes.PassCompletion) => passCompletion.provisionalLicenceProvided !== null
  && !passCompletion.provisionalLicenceProvided;
