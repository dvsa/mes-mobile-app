/**
 * If delegated examiner test nav directly to office page instead of debrief page
 * @param pageNameConstant
 * @param delegatedTest
 */

export function getNextPageDebriefOffice(pageNameConstant, delegatedTest: boolean) {
  return delegatedTest ? pageNameConstant.OFFICE_PAGE : pageNameConstant.DEBRIEF_PAGE;
}
