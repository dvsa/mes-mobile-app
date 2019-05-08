/* tslint:disable */
import { TerminationCode } from './termination-code.model';
import { ActivityCodes } from '../../../../shared/models/activity-codes';

export default [
    {
        code: ActivityCodes.PASS,
        description: 'Pass',
    },
    {
        code: ActivityCodes.FAIL,
        description: 'Fail',
    },
    {
        code: ActivityCodes.FAIL_EYESIGHT,
        description: 'Fail due to eyesight',
    },
    {
        code: ActivityCodes.FAIL_PUBLIC_SAFETY,
        description: 'Fail in the interests of public safety',
    },
    {
        code: ActivityCodes.FAIL_CANDIDATE_STOPS_TEST,
        description: 'Fail candidate chose to stop test, already failed',
    },
    {
        code: ActivityCodes.MECHANICAL_FAILURE,
        description: 'Mechanical failure',
    },
    {
        code: ActivityCodes.DOCUMENTS_NOT_PRODUCED,
        description: 'Documents not produced',
    },
    {
        code: ActivityCodes.VEHICLE_NOT_SUITABLE,
        description: 'Vehicle / gear not suitable or no vehicle for test',
    },
    {
        code: ActivityCodes.NO_L_PLATES,
        description: 'No ‘L’ plates',
    },
    {
        code: ActivityCodes.MOTORCYCLE_CANDIDATE_LOST_AND_RETURNED,
        description: 'Motorcycle candidate lost and returned too late to DTC',
    },
    {
        code: ActivityCodes.MOTORCYCLE_CANDIDATE_LOST_DID_NOT_RETURN,
        description: 'Motorcycle candidate lost and did not return to test centre',
    },
    {
        code: ActivityCodes.DVSA_RADIO_FAILURE,
        description: 'DVSA radio failure',
    },
    {
        code: ActivityCodes.DVSA_MOTORCYCLE_BREAKDOWN,
        description: 'DVSA motorcycle breakdown',
    },
    {
        code: ActivityCodes.DVSA_RADIO_FAILURE,
        description: 'DVSA radio failure',
    },
    {
        code: ActivityCodes.LANGUAGE_ISSUES,
        description: 'Language issues',
    },
    {
        code: ActivityCodes.ACCIDENT,
        description: 'Accident – unable to complete test',
    },
    {
        code: ActivityCodes.CANDIDATE_UNDER_INFLUENCE,
        description: 'Candidate under the influence of drugs/alcohol',
    },
    {
        code: ActivityCodes.CANDIDATE_PREGNANT,
        description: 'Pregnant candidate declined to take part in test',
    },
    {
        code: ActivityCodes.UNAUTHORISED_OCCUPANT_IN_VEHICLE,
        description: 'Unauthorised occupant in vehicle',
    },
    {
        code: ActivityCodes.EXAMINER_TAKEN_ILL,
        description: 'Examiner taken ill on test',
    },
    {
        code: ActivityCodes.CANDIDATE_TAKEN_ILL,
        description: 'Candidate taken ill on test',
    },
    {
        code: ActivityCodes.CANDIDATE_NOT_HAPPY_WITH_AUTHORISED_OCCUPANT,
        description: 'Candidate not happy with DVSA authorised occupant',
    },
    {
        code: ActivityCodes.CANDIDATE_ENTERED_MOTORWAY,
        description: 'Candidate entered motorway',
    },
    {
        code: ActivityCodes.DVSA_MODULE_1_EQUIPMENT_FAILURE,
        description: 'DVSA Module 1 equipment failure during test',
    },
    {
        code: ActivityCodes.UNAUTHORISED_FILMING,
        description: 'Unauthorised filming/recording on test',
    },

    {
        code: ActivityCodes.CANDIDATE_FAILED_TO_ATTEND,
        description: 'Candidate failed to attend at test centre',
    },
    {
        code: ActivityCodes.LATE_CANCELLATION,
        description: 'Late cancellation by candidate / school /*Mod1 test failed and Mod 2 test within short notice',
    },
    {
        code: ActivityCodes.CANDIDATE_LATE,
        description: 'Candidate late arriving for test',
    },
    {
        code: ActivityCodes.EXAMINER_ILL_PRE_TEST,
        description: 'Test cancelled due to examiner being ill',
    },
    {
        code: ActivityCodes.EXAMINER_ABSENT,
        description: 'Test cancelled due to examiner being absent',
    },
    {
        code: ActivityCodes.UNABLE_TO_START_TEST_ON_TIME,
        description: 'Test cancelled as unable to start test on time',
    },
    {
        code: ActivityCodes.BAD_WEATHER_AT_DTC,
        description: 'Bad weather at DTC',
    },
    {
        code: ActivityCodes.BAD_WEATHER_AT_CANDIDATES_HOME,
        description: 'Bad weather at candidate’s home',
    },
    {
        code: ActivityCodes.NOT_AVAILABLE_FOR_HOME_TEST_CANDIDATE_FAULT,
        description: 'Not available for home test – candidate’s responsibility',
    },
    {
        code: ActivityCodes.NOT_AVAILABLE_FOR_HOME_TEST_EXAMINER_FAULT,
        description: 'Not available for home test – not candidates fault.',
    },
    {
        code: ActivityCodes.BAD_LIGHT,
        description: 'Bad light',
    },
    {
        code: ActivityCodes.TRAFFIC,
        description: 'Traffic congestion',
    },
    {
        code: ActivityCodes.NATURAL_DISASTER,
        description: 'Natural Disaster',
    },
    {
        code: ActivityCodes.LICENCE_FAILED_CHECK,
        description: 'Licence failed UV check',
    },
    {
        code: ActivityCodes.CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION,
        description: 'Candidate refused to sign residency declaration',
    },
    {
        code: ActivityCodes.CANDIDATE_STOPS_TEST,
        description: 'Candidate chose to stop test, not already failed',
    },
    {
        code: ActivityCodes.ILLEGAL_ACTIVITY_FROM_CANDIDATE,
        description: 'Test terminated due to alleged illegal activity by candidate',
    },
    {
        code: ActivityCodes.INDUSTRIAL_ACTION,
        description: 'Test cancelled due to industrial action',
    },
    {
        code: ActivityCodes.AUTHORISED_OCCUPANT_INTERVENED_DURING_TEST,
        description: 'Authorised occupant intervened during test',
    },
    {
        code: ActivityCodes.INCORRECT_LENSE_WORN,
        description: 'Test not conducted incorrect/no lenses worn',
    },
    {
        code: ActivityCodes.SITE_ACCESS_MANAGER_NOT_AVAILABLE,
        description: 'Site access manager not available',
    },

] as TerminationCode[];