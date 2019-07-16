import { TestsModel } from '../../modules/tests/tests.model';
import { isEndToEndPracticeTest, isTestReportPracticeTest } from '../../modules/tests/tests.selector';
import { AnalyticsEventCategories } from '../../providers/analytics/analytics.model';

export function formatAnalyticsText(eventText: string, tests: TestsModel): string {
  if (isEndToEndPracticeTest(tests)) {
    return `${AnalyticsEventCategories.PRACTICE_MODE} - ${eventText}`;
  }
  if (isTestReportPracticeTest(tests)) {
    return `${AnalyticsEventCategories.PRACTICE_TEST} - ${eventText}`;
  }
  return eventText;
}
