import { ApplicationReference } from '@dvsa/mes-test-schema/categories/B';

/**
 * Formats application reference as a single number, of the form <``app-id``><``book-seq``><``check-digit``>.
 *
 * @param appRef The application reference, as separate fields
 * @returns The app id, booking sequence (padded to 2 digits) and check digit
 */
export const formatApplicationReference = (appRef: ApplicationReference): number => {
  const formatter = Intl.NumberFormat('en-gb', { minimumIntegerDigits: 2 });
  return Number(appRef.applicationId.toString() +
                formatter.format(appRef.bookingSequence) +
                appRef.checkDigit.toString());
};
