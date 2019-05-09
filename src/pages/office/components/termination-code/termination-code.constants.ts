
import { ActivityCodes } from '../../../../shared/models/activity-codes';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/B';

export interface TerminationCode {
  activityCode: ActivityCode;
  description: ActivityCodeDescriptions;
}

export enum ActivityCodeDescriptions {
    PASS = 'Pass',
    FAIL = 'Fail',
    FAIL_EYESIGHT = 'Fail due to eyesight',
    FAIL_PUBLIC_SAFETY = 'Fail in the interests of public safety',
    FAIL_CANDIDATE_STOPS_TEST = 'Fail candidate chose to stop test, already failed',
    MECHANICAL_FAILURE = 'Mechanical failure',
    DOCUMENTS_NOT_PRODUCED = 'Documents not produced',
    VEHICLE_NOT_SUITABLE = 'Vehicle / gear not suitable or no vehicle for test',
    NO_L_PLATES = 'No ‘L’ plates',
    MOTORCYCLE_CANDIDATE_LOST_AND_RETURNED = 'Motorcycle candidate lost and returned too late to DTC',
    MOTORCYCLE_CANDIDATE_LOST_DID_NOT_RETURN = 'Motorcycle candidate lost and did not return to test centre',
    DVSA_RADIO_FAILURE = 'DVSA radio failure',
    DVSA_MOTORCYCLE_BREAKDOWN = 'DVSA motorcycle breakdown',
    LANGUAGE_ISSUES = 'Language issues',
    ACCIDENT = 'Accident – unable to complete test',
    CANDIDATE_UNDER_INFLUENCE = 'Candidate under the influence of drugs/alcohol',
    CANDIDATE_PREGNANT = 'Pregnant candidate declined to take part in test',
    UNAUTHORISED_OCCUPANT_IN_VEHICLE = 'Unauthorised occupant in vehicle',
    EXAMINER_TAKEN_ILL = 'Examiner taken ill on test',
    CANDIDATE_TAKEN_ILL = 'Candidate taken ill on test',
    CANDIDATE_NOT_HAPPY_WITH_AUTHORISED_OCCUPANT = 'Candidate not happy with DVSA authorised occupant',
    CANDIDATE_ENTERED_MOTORWAY = 'Candidate entered motorway',
    DVSA_MODULE_1_EQUIPMENT_FAILURE = 'DVSA Module 1 equipment failure during test',
    UNAUTHORISED_FILMING = 'Unauthorised filming/recording on test',
    CANDIDATE_FAILED_TO_ATTEND = 'Candidate failed to attend at test centre',
    LATE_CANCELLATION = 'Late cancellation by candidate / school /*Mod1 test failed and Mod 2 test within short notice',
    CANDIDATE_LATE = 'Candidate late arriving for test',
    EXAMINER_ILL_PRE_TEST = 'Test cancelled due to examiner being ill',
    EXAMINER_ABSENT = 'Test cancelled due to examiner being absent',
    UNABLE_TO_START_TEST_ON_TIME = 'Test cancelled as unable to start test on time',
    BAD_WEATHER_AT_DTC = 'Bad weather at DTC',
    BAD_WEATHER_AT_CANDIDATES_HOME = 'Bad weather at candidate’s home',
    NOT_AVAILABLE_FOR_HOME_TEST_CANDIDATE_FAULT = 'Not available for home test – candidate’s responsibility',
    NOT_AVAILABLE_FOR_HOME_TEST_EXAMINER_FAULT = 'Not available for home test – not candidates fault.',
    BAD_LIGHT = 'Bad light',
    TRAFFIC = 'Traffic congestion',
    NATURAL_DISASTER = 'Natural Disaster',
    LICENCE_FAILED_CHECK = 'Licence failed UV check',
    CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION = 'Candidate refused to sign residency declaration',
    CANDIDATE_STOPS_TEST = 'Candidate chose to stop test, not already failed',
    ILLEGAL_ACTIVITY_FROM_CANDIDATE = 'Test terminated due to alleged illegal activity by candidate',
    INDUSTRIAL_ACTION = 'Test cancelled due to industrial action',
    AUTHORISED_OCCUPANT_INTERVENED_DURING_TEST = 'Authorised occupant intervened during test',
    INCORRECT_LENSE_WORN = 'Test not conducted incorrect/no lenses worn',
    SITE_ACCESS_MANAGER_NOT_AVAILABLE = 'Site access manager not available',
}

export const TERMINATION_CODE_LIST: TerminationCode[] = [
  {
    activityCode: ActivityCodes.PASS,
    description: ActivityCodeDescriptions.PASS,
  },
  {
    activityCode: ActivityCodes.FAIL,
    description: ActivityCodeDescriptions.FAIL,
  },
  {
    activityCode: ActivityCodes.FAIL_EYESIGHT,
    description: ActivityCodeDescriptions.FAIL_EYESIGHT,
  },
  {
    activityCode: ActivityCodes.FAIL_PUBLIC_SAFETY,
    description: ActivityCodeDescriptions.FAIL_PUBLIC_SAFETY,
  },
  {
    activityCode: ActivityCodes.FAIL_CANDIDATE_STOPS_TEST,
    description: ActivityCodeDescriptions.FAIL_CANDIDATE_STOPS_TEST,
  },
  {
    activityCode: ActivityCodes.MECHANICAL_FAILURE,
    description: ActivityCodeDescriptions.MECHANICAL_FAILURE,
  },
  {
    activityCode: ActivityCodes.DOCUMENTS_NOT_PRODUCED,
    description: ActivityCodeDescriptions.DOCUMENTS_NOT_PRODUCED,
  },
  {
    activityCode: ActivityCodes.VEHICLE_NOT_SUITABLE,
    description: ActivityCodeDescriptions.VEHICLE_NOT_SUITABLE,
  },
  {
    activityCode: ActivityCodes.NO_L_PLATES,
    description: ActivityCodeDescriptions.NO_L_PLATES,
  },
  {
    activityCode: ActivityCodes.MOTORCYCLE_CANDIDATE_LOST_AND_RETURNED,
    description: ActivityCodeDescriptions.MOTORCYCLE_CANDIDATE_LOST_AND_RETURNED,
  },
  {
    activityCode: ActivityCodes.MOTORCYCLE_CANDIDATE_LOST_DID_NOT_RETURN,
    description: ActivityCodeDescriptions.MOTORCYCLE_CANDIDATE_LOST_DID_NOT_RETURN,
  },
  {
    activityCode: ActivityCodes.DVSA_RADIO_FAILURE,
    description: ActivityCodeDescriptions.DVSA_RADIO_FAILURE,
  },
  {
    activityCode: ActivityCodes.DVSA_MOTORCYCLE_BREAKDOWN,
    description: ActivityCodeDescriptions.DVSA_MOTORCYCLE_BREAKDOWN,
  },
  {
    activityCode: ActivityCodes.LANGUAGE_ISSUES,
    description: ActivityCodeDescriptions.LANGUAGE_ISSUES,
  },
  {
    activityCode: ActivityCodes.ACCIDENT,
    description: ActivityCodeDescriptions.ACCIDENT,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_UNDER_INFLUENCE,
    description: ActivityCodeDescriptions.CANDIDATE_UNDER_INFLUENCE,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_PREGNANT,
    description: ActivityCodeDescriptions.CANDIDATE_PREGNANT,
  },
  {
    activityCode: ActivityCodes.UNAUTHORISED_OCCUPANT_IN_VEHICLE,
    description: ActivityCodeDescriptions.UNAUTHORISED_OCCUPANT_IN_VEHICLE,
  },
  {
    activityCode: ActivityCodes.EXAMINER_TAKEN_ILL,
    description: ActivityCodeDescriptions.EXAMINER_TAKEN_ILL,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_TAKEN_ILL,
    description: ActivityCodeDescriptions.CANDIDATE_TAKEN_ILL,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_NOT_HAPPY_WITH_AUTHORISED_OCCUPANT,
    description: ActivityCodeDescriptions.CANDIDATE_NOT_HAPPY_WITH_AUTHORISED_OCCUPANT,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_ENTERED_MOTORWAY,
    description: ActivityCodeDescriptions.CANDIDATE_ENTERED_MOTORWAY,
  },
  {
    activityCode: ActivityCodes.DVSA_MODULE_1_EQUIPMENT_FAILURE,
    description: ActivityCodeDescriptions.DVSA_MODULE_1_EQUIPMENT_FAILURE,
  },
  {
    activityCode: ActivityCodes.UNAUTHORISED_FILMING,
    description: ActivityCodeDescriptions.UNAUTHORISED_FILMING,
  },

  {
    activityCode: ActivityCodes.CANDIDATE_FAILED_TO_ATTEND,
    description: ActivityCodeDescriptions.CANDIDATE_FAILED_TO_ATTEND,
  },
  {
    activityCode: ActivityCodes.LATE_CANCELLATION,
    description: ActivityCodeDescriptions.LATE_CANCELLATION,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_LATE,
    description: ActivityCodeDescriptions.CANDIDATE_LATE,
  },
  {
    activityCode: ActivityCodes.EXAMINER_ILL_PRE_TEST,
    description: ActivityCodeDescriptions.EXAMINER_ILL_PRE_TEST,
  },
  {
    activityCode: ActivityCodes.EXAMINER_ABSENT,
    description: ActivityCodeDescriptions.EXAMINER_ABSENT,
  },
  {
    activityCode: ActivityCodes.UNABLE_TO_START_TEST_ON_TIME,
    description: ActivityCodeDescriptions.UNABLE_TO_START_TEST_ON_TIME,
  },
  {
    activityCode: ActivityCodes.BAD_WEATHER_AT_DTC,
    description: ActivityCodeDescriptions.BAD_WEATHER_AT_DTC,
  },
  {
    activityCode: ActivityCodes.BAD_WEATHER_AT_CANDIDATES_HOME,
    description: ActivityCodeDescriptions.BAD_WEATHER_AT_CANDIDATES_HOME,
  },
  {
    activityCode: ActivityCodes.NOT_AVAILABLE_FOR_HOME_TEST_CANDIDATE_FAULT,
    description: ActivityCodeDescriptions.NOT_AVAILABLE_FOR_HOME_TEST_CANDIDATE_FAULT,
  },
  {
    activityCode: ActivityCodes.NOT_AVAILABLE_FOR_HOME_TEST_EXAMINER_FAULT,
    description: ActivityCodeDescriptions.NOT_AVAILABLE_FOR_HOME_TEST_EXAMINER_FAULT,
  },
  {
    activityCode: ActivityCodes.BAD_LIGHT,
    description: ActivityCodeDescriptions.BAD_LIGHT,
  },
  {
    activityCode: ActivityCodes.TRAFFIC,
    description: ActivityCodeDescriptions.TRAFFIC,
  },
  {
    activityCode: ActivityCodes.NATURAL_DISASTER,
    description: ActivityCodeDescriptions.NATURAL_DISASTER,
  },
  {
    activityCode: ActivityCodes.LICENCE_FAILED_CHECK,
    description: ActivityCodeDescriptions.LICENCE_FAILED_CHECK,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION,
    description: ActivityCodeDescriptions.CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION,
  },
  {
    activityCode: ActivityCodes.CANDIDATE_STOPS_TEST,
    description: ActivityCodeDescriptions.CANDIDATE_STOPS_TEST,
  },
  {
    activityCode: ActivityCodes.ILLEGAL_ACTIVITY_FROM_CANDIDATE,
    description: ActivityCodeDescriptions.ILLEGAL_ACTIVITY_FROM_CANDIDATE,
  },
  {
    activityCode: ActivityCodes.INDUSTRIAL_ACTION,
    description: ActivityCodeDescriptions.INDUSTRIAL_ACTION,
  },
  {
    activityCode: ActivityCodes.AUTHORISED_OCCUPANT_INTERVENED_DURING_TEST,
    description: ActivityCodeDescriptions.AUTHORISED_OCCUPANT_INTERVENED_DURING_TEST,
  },
  {
    activityCode: ActivityCodes.INCORRECT_LENSE_WORN,
    description: ActivityCodeDescriptions.INCORRECT_LENSE_WORN,
  },
  {
    activityCode: ActivityCodes.SITE_ACCESS_MANAGER_NOT_AVAILABLE,
    description: ActivityCodeDescriptions.SITE_ACCESS_MANAGER_NOT_AVAILABLE,
  },
];
