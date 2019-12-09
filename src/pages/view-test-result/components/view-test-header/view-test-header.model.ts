import { ActivityCode } from '@dvsa/mes-test-schema/categories/Common';
import { TestOutcome } from '../../../../modules/tests/tests.constants';

export interface ViewTestHeaderModel {
  candidateName: string;
  candidateDriverNumber: string;
  activityCode: ActivityCode;
  testOutcome: TestOutcome;
}
