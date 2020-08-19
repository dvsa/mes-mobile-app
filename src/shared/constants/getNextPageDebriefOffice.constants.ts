/**
 * If delegated examiner test nav directly to office page instead of debrief page
 * @param pageNameConstant
 * @param delegatedTest
 */
import { DELEGATED_EXAMINER } from '../../pages/page-names.constants';

export function getNextPageDebriefOffice(pageNameConstant, delegatedTest: boolean) {
  return delegatedTest ? DELEGATED_EXAMINER.NON_CPC_OFFICE_PAGE : pageNameConstant.DEBRIEF_PAGE;
}
