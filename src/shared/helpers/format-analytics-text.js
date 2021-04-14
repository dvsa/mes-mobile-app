import { isEndToEndPracticeTest, isTestReportPracticeTest, getCurrentTest, isDelegatedTest, } from '../../modules/tests/tests.selector';
import { AnalyticsEventCategories } from '../../providers/analytics/analytics.model';
export function formatAnalyticsText(eventText, tests) {
    if (isEndToEndPracticeTest(tests)) {
        return AnalyticsEventCategories.PRACTICE_MODE + " - " + eventText;
    }
    if (isTestReportPracticeTest(tests)) {
        return AnalyticsEventCategories.PRACTICE_TEST + " - " + eventText;
    }
    if (isDelegatedTest(tests)) {
        return AnalyticsEventCategories.DELEGATED_TEST + " - " + eventText;
    }
    if (getCurrentTest(tests).rekey) {
        return AnalyticsEventCategories.REKEY + " - " + eventText;
    }
    return eventText;
}
//# sourceMappingURL=format-analytics-text.js.map