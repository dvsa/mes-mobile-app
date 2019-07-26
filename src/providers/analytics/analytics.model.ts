export interface IAnalyticsProvider {
  setCurrentPage(name: string): void;

  addCustomDimension(key: number, value: string): void;

  logEvent(category: string, event: string, label?:string, params?: any): void;

  logError(type:string, message: string): void;

  logException(message: string, fatal: boolean): void;

  setUserId(userId: string): void;
  initialiseAnalytics(): Promise<any>;
}

export enum AnalyticsScreenNames {
  COMMUNICATION = 'communication screen',
  HEALTH_DECLARATION = 'health declaration screen',
  JOURNAL = 'journal screen',
  PASS_TEST_SUMMARY = 'pass test summary screen',
  FAIL_TEST_SUMMARY = 'fail test summary screen',
  PASS_FINALISATION = 'pass finalisation screen',
  TEST = 'test report screen',
  TERMINATE_TEST = 'terminate test screen',
  WAITING_ROOM = 'waiting room screen',
  WAITING_ROOM_TO_CAR = 'waiting room to car screen',
  WELCOME = 'welcome screen',
  CANDIDATE_DETAILS = 'candidate details screen',
  PASS_DEBRIEF = 'pass debrief screen',
  FAIL_DEBRIEF = 'fail debrief screen',
  LOGIN = 'login screen',
  BACK_TO_OFFICE = 'back to office screen',
  TEST_RESULTS_SEARCH = 'test result search screen',
  VIEW_TEST_RESULT = 'view test result screen',
}

export enum AnalyticsEventCategories {
  CLICK = 'click',
  LIFECYCLE = 'lifecycle',
  ERROR = 'error',
  JOURNAL = 'journal',
  AUTHENTICATION = 'authentication',
  BACK_TO_OFFICE = 'back to office',
  POST_TEST = 'post-test',
  TEST_REPORT = 'test report',
  TERMINATION = 'test termination',
  PRACTICE_TEST = 'practice test',
  PRACTICE_MODE = 'practice mode',
  TEST_RESULTS_SEARCH = 'test results search',
}

export enum AnalyticsEvents {
  START_TEST = 'start test',
  REKEY_TEST = 'rekey test',
  END_TEST = 'end test',
  APP_LOAD = 'app load',
  SLOT_CHANGED = 'slot changed',
  SLOT_CHANGE_VIEWED = 'slot change viewed',
  NAVIGATION = 'navigation',
  REFRESH_JOURNAL = 'refresh journal',
  LOGIN = 'login',
  DEFER_WRITE_UP = 'defer write-up',
  SAVE_WRITE_UP = 'save write-up',
  COMPLETE_TEST = 'complete test',
  COMPLETE_REKEY_TEST = 'complete rekey test',
  SUBMIT_TEST = 'submit test',
  SUBMIT_REKEY_TEST = 'submit rekey test',
  RESUME_WRITE_UP = 'resume write-up',
  ADD_DRIVING_FAULT = 'add driving fault',
  ADD_SERIOUS_FAULT = 'add serious fault',
  ADD_DANGEROUS_FAULT = 'add dangerous fault',
  REMOVE_DRIVING_FAULT = 'remove driving fault',
  REMOVE_SERIOUS_FAULT = 'remove serious fault',
  REMOVE_DANGEROUS_FAULT = 'remove dangerous fault',
  REMOVE_FAULT = 'remove fault',
  SELECT_SERIOUS_MODE = 'select serious mode',
  SELECT_DANGEROUS_MODE = 'select dangerous mode',
  SELECT_REMOVE_MODE = 'select remove mode',
  APPLICATION_REFERENCE_SEARCH = 'perform application reference search',
  DRIVER_NUMBER_SEARCH = 'perform driver number search',
  LDTM_SEARCH = 'perform ldtm search',
  TOGGLE_LEGAL_REQUIREMENT = 'toggle legal requirement',
  TEST_OUTCOME_CHANGED = 'test outcome changed',
}

export enum AnalyticsLabels {
TERMINATE_TEST = 'Test report - legal requirements not met',
}

export enum AnalyticsDimensionIndices {
  DEVICE_ID = 1,
  JOURNAL_DAYS_FROM_TODAY = 2,
  CANDIDATE_WITH_SPECIAL_NEEDS = 3,
  CANDIDATE_WITH_CHECK = 4,
  CANDIDATE_ID = 5,
  APPLICATION_REFERENCE = 6,
  IS_STAFF_ID_SEARCHED = 7,
  IS_TEST_CENTRE_SEARCHED = 8,
  IS_DATE_RANGE_SEARCHED = 9,
  METHOD = 10,
  USER_ID = 11,
  REKEY_TEST_BOOKED_WITH = 12,
  REKEY_TEST_COMPLETED_BY = 13,
}

export enum JournalRefreshModes {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export enum AnalyticsErrorTypes {
  SUBMIT_FORM_ERROR = 'submit form error',
  VALIDATION_ERROR = 'validation error',
}
