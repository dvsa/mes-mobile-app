export interface IAnalyticsProvider {
    setCurrentPage(name: string);

    addCustomDimension(key: number, value: string);
  
    logEvent(category: string, event: string, label?:string, params?: any);
  
    logError(type:string, message: string);

    logException(message: string, fatal: boolean); 
  
    setUserId(userId: string);
    initialiseAnalytics(): Promise<any>;

  }
  
  export enum AnalyticsScreenNames {
    CONTACT_DETAILS = 'contact details screen', // this may need removing as could be candidate details now
    FAIL_RESULTS_DEBRIEF = 'fail results debrief screen',
    HEALTH_DECLARATION = 'health declaration screen',
    JOURNAL = 'journal screen',
    OFFICE = 'office screen',
    PASS_FINALISATION = 'pass finalisation screen',
    PASS_RESULTS_DEBRIEF = 'pass results debrief screen',
    TEST = 'test report screen',
    TERMINATE_TEST = 'terminate test screen',
    WAITING_ROOM = 'waiting room screen',
    WAITING_ROOM_TO_CAR = 'waiting room to car screen',
    WELCOME = 'welcome screen',
    CANDIDATE_DETAILS = 'candidate details screen',
    DEBRIEF = 'debrief screen',
    LOGIN = 'login screen'
  }
  
  export enum AnalyticsEventCategories {
    CLICK = 'click',
    LIFECYCLE = 'lifecycle',
    ERROR = 'error',
    JOURNAL = 'journal',
    AUTHENTICATION = 'authentication'
  }
  
  export enum AnalyticsEvents {
    START_TEST = 'start test',
    END_TEST = 'end test',
    APP_LOAD = 'app load',
    SLOT_CHANGED = 'slot changed',
    SLOT_CHANGE_VIEWED = 'slot change viewed',
    NAVIGATION = 'navigation',
    REFRESH_JOURNAL = 'refresh journal',
    LOGIN = 'login',
  }
  
  export enum AnalyticsDimensionIndices {
    DEVICE_ID = 1,
    JOURNAL_DAYS_FROM_TODAY = 2,
    CANDIDATE_WITH_SPECIAL_NEEDS = 3,
    CANDIDATE_WITH_CHECK = 4,
    CANDIDATE_ID=5
  }

  export enum JournalRefreshModes {
    MANUAL = 'MANUAL',
    AUTOMATIC = 'AUTOMATIC'
  }