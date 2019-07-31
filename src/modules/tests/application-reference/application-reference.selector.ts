import { ApplicationReference } from '@dvsa/mes-test-schema/categories/B';

export const getApplicationNumber = (applicationReference: ApplicationReference): string => {
  const { applicationId, bookingSequence, checkDigit } = applicationReference;
  return `${applicationId}${bookingSequence}${checkDigit}`;
};
