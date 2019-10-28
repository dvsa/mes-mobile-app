import { ApplicationReference } from '@dvsa/mes-test-schema/categories/Common';
import { formatApplicationReference } from '../../../../shared/helpers/formatters';

export const getApplicationNumber = (applicationReference: ApplicationReference): string =>
  formatApplicationReference(applicationReference);
