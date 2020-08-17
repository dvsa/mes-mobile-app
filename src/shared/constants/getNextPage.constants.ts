/**
 * If delegated examiner test nav directly to office page instead of debrief page
 * @param category
 * @param delegatedTest
 */
export function getNextPage(category, delegatedTest) {
  return delegatedTest ? category.OFFICE_PAGE : category.DEBRIEF_PAGE;
}
