export interface IAnalyticsProvider {
    setCurrentPage(name: string);
  
    logEvent(category: string, event: string, params?: any);
  
    logError(message: string);
  
    setUserId(userId: string);
  }
  
  export enum AnalyticsScreenNames {
    CONTACT_DETAILS = 'contact details page', // this may need removing as could be candidate details now
    FAIL_RESULTS_DEBRIEF = 'fail results debrief page',
    HEALTH_DECLARATION = 'health declaration page',
    JOURNAL = 'journal page',
    OFFICE = 'office page',
    PASS_FINALISATION = 'pass finalisation page',
    PASS_RESULTS_DEBRIEF = 'pass results debrief page',
    TEST = 'test report page',
    TERMINATE_TEST = 'terminate test page',
    WAITING_ROOM = 'waiting room page',
    WAITING_ROOM_TO_CAR = 'waiting room to car page',
    WELCOME = 'welcome page',
    CANDIDATE_DETAILS = 'candidate details page',
    DEBRIEF = 'debrief page',
    LOGIN = 'login page'
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
  