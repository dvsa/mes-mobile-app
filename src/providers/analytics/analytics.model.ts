export interface IAnalyticsProvider {
  setCurrentPage(name: string);

  logEvent(category: string, event: string, params?: any);

  logError(message: string);

  setUserId(userId: string);
}

export enum AnalyticsScreenNames {
  CONTACT_DETAILS = 'contact details page',
  FAIL_RESULTS_DEBRIEF = 'fail results debrief page',
  HELP_CANDIDATE_DETAILS = 'help candidate details page',
  HELP_DEBRIEF = 'help debrief page',
  HELP_FINALISATION = 'help finalisation page',
  HELP_GUIDE = 'help guide page',
  HELP_JOURNAL = 'help journal page',
  HELP_TEST_REPORT = 'help test report page',
  HELP_WAITING_ROOM = 'help waiting room to car page',
  HEALTH_DECLARATION = 'health declaration page',
  JOURNAL = 'journal page',
  OFFICE = 'office page',
  PASS_FINALISATION = 'pass finalisation page',
  PASS_RESULTS_DEBRIEF = 'pass results debrief page',
  TEST = 'test report page',
  WAITING_ROOM = 'waiting room page',
  WAITING_ROOM_TO_CAR = 'waiting room to car page',
  WELCOME = 'welcome page'
}

export enum AnalyticsEventCategories {
  CLICK = 'click',
  LIFECYCLE = 'lifecycle'
}

export enum AnalyticsEvents {
  START_TEST = 'start test',
  END_TEST = 'end test',
  APP_LOAD = 'app load'
}
