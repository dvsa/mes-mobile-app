import { PassCompletion } from '@dvsa/mes-test-schema/categories/B';

export const getPassCertificateNumber = (passCompletion: PassCompletion) => passCompletion.passCertificateNumber;
