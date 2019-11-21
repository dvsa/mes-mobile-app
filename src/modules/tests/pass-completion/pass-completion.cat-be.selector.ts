import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const getPassCertificateNumber =
(passCompletion: CatBEUniqueTypes.PassCompletion) => passCompletion.passCertificateNumber;
export const isProvisionalLicenseProvided =
  (passCompletion: CatBEUniqueTypes.PassCompletion) => passCompletion.provisionalLicenceProvided;
export const isProvisionalLicenseNotProvided =
  (passCompletion: CatBEUniqueTypes.PassCompletion) => passCompletion.provisionalLicenceProvided !== null
  && !passCompletion.provisionalLicenceProvided;
export const isCode78Present =
  (passCompletion: CatBEUniqueTypes.PassCompletion) => passCompletion.code78Present;
export const isCode78NotPresent =
  (passCompletion: CatBEUniqueTypes.PassCompletion) => passCompletion.code78Present !== null
  && !passCompletion.code78Present;
