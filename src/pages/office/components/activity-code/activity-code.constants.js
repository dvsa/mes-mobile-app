import { ActivityCodes, DelegatedExaminerActivityCodes } from '../../../../shared/models/activity-codes';
export var ActivityCodeDescription;
(function (ActivityCodeDescription) {
    ActivityCodeDescription["PASS"] = "Pass";
    ActivityCodeDescription["FAIL"] = "Fail";
    ActivityCodeDescription["FAIL_EYESIGHT"] = "Fail due to eyesight";
    ActivityCodeDescription["FAIL_PUBLIC_SAFETY"] = "Fail in the interests of public safety";
    ActivityCodeDescription["FAIL_CANDIDATE_STOPS_TEST"] = "Fail candidate chose to stop test, already failed";
    ActivityCodeDescription["MECHANICAL_FAILURE"] = "Mechanical failure";
    ActivityCodeDescription["DOCUMENTS_NOT_PRODUCED"] = "Documents not produced";
    ActivityCodeDescription["VEHICLE_NOT_SUITABLE"] = "Vehicle / gear not suitable or no vehicle for test";
    ActivityCodeDescription["NO_L_PLATES"] = "No \u2018L\u2019 plates / candidate refused to wear face covering";
    ActivityCodeDescription["MOTORCYCLE_CANDIDATE_LOST_AND_RETURNED"] = "Motorcycle candidate lost and returned too late to DTC";
    ActivityCodeDescription["MOTORCYCLE_CANDIDATE_LOST_DID_NOT_RETURN"] = "Motorcycle candidate lost and did not return to test centre";
    ActivityCodeDescription["DVSA_RADIO_FAILURE"] = "DVSA radio failure";
    ActivityCodeDescription["DVSA_MOTORCYCLE_BREAKDOWN"] = "DVSA motorcycle breakdown";
    ActivityCodeDescription["LANGUAGE_ISSUES"] = "Language issues";
    ActivityCodeDescription["ACCIDENT"] = "Accident \u2013 unable to complete test";
    ActivityCodeDescription["CANDIDATE_UNDER_INFLUENCE"] = "Candidate under the influence of drugs/alcohol";
    ActivityCodeDescription["CANDIDATE_PREGNANT"] = "Pregnant candidate declined to take part in test";
    ActivityCodeDescription["UNAUTHORISED_OCCUPANT_IN_VEHICLE"] = "Unauthorised occupant in vehicle";
    ActivityCodeDescription["EXAMINER_TAKEN_ILL"] = "Examiner taken ill on test";
    ActivityCodeDescription["CANDIDATE_TAKEN_ILL"] = "Candidate taken ill on test";
    ActivityCodeDescription["CANDIDATE_NOT_HAPPY_WITH_AUTHORISED_OCCUPANT"] = "Candidate not happy with DVSA authorised occupant";
    ActivityCodeDescription["CANDIDATE_ENTERED_MOTORWAY"] = "Candidate entered motorway";
    ActivityCodeDescription["DVSA_MODULE_1_EQUIPMENT_FAILURE"] = "DVSA Module 1 equipment failure during test";
    ActivityCodeDescription["UNAUTHORISED_FILMING"] = "Unauthorised filming/recording on test";
    ActivityCodeDescription["CANDIDATE_FAILED_TO_ATTEND"] = "Candidate failed to attend at test centre";
    ActivityCodeDescription["LATE_CANCELLATION"] = "Late cancellation by candidate / school /*Mod1 test failed and Mod 2 test within short notice";
    ActivityCodeDescription["CANDIDATE_LATE"] = "Candidate late arriving for test";
    ActivityCodeDescription["EXAMINER_ILL_PRE_TEST"] = "Test cancelled due to examiner being ill";
    ActivityCodeDescription["EXAMINER_ABSENT"] = "Test cancelled due to examiner being absent";
    ActivityCodeDescription["UNABLE_TO_START_TEST_ON_TIME"] = "Test cancelled as unable to start test on time";
    ActivityCodeDescription["BAD_WEATHER_AT_DTC"] = "Bad weather at DTC";
    ActivityCodeDescription["BAD_WEATHER_AT_CANDIDATES_HOME"] = "Bad weather at candidate\u2019s home";
    ActivityCodeDescription["NOT_AVAILABLE_FOR_HOME_TEST_CANDIDATE_FAULT"] = "Not available for home test \u2013 candidate\u2019s responsibility";
    ActivityCodeDescription["NOT_AVAILABLE_FOR_HOME_TEST_EXAMINER_FAULT"] = "Not available for home test \u2013 not candidates fault.";
    ActivityCodeDescription["BAD_LIGHT"] = "Bad light";
    ActivityCodeDescription["TRAFFIC"] = "Traffic congestion";
    ActivityCodeDescription["NATURAL_DISASTER"] = "Natural Disaster";
    ActivityCodeDescription["LICENCE_FAILED_CHECK"] = "Licence failed UV check";
    ActivityCodeDescription["CANDIDATE_REFUSED_TO_SIGN_RESIDENCY_DECLARATION"] = "Candidate refused to sign residency declaration";
    ActivityCodeDescription["CANDIDATE_STOPS_TEST"] = "Candidate chose to stop test, not already failed";
    ActivityCodeDescription["ILLEGAL_ACTIVITY_FROM_CANDIDATE"] = "Test terminated due to alleged illegal activity by candidate";
    ActivityCodeDescription["INDUSTRIAL_ACTION"] = "Test cancelled due to industrial action";
    ActivityCodeDescription["AUTHORISED_OCCUPANT_INTERVENED_DURING_TEST"] = "Authorised occupant intervened during test";
    ActivityCodeDescription["INCORRECT_LENSE_WORN"] = "Test not conducted incorrect/no lenses worn";
    ActivityCodeDescription["SITE_ACCESS_MANAGER_NOT_AVAILABLE"] = "Site access manager not available";
})(ActivityCodeDescription || (ActivityCodeDescription = {}));
export var DelegatedActivityCodeDescription;
(function (DelegatedActivityCodeDescription) {
    DelegatedActivityCodeDescription["TEST_NOT_COMPLETED"] = "Test not completed";
    DelegatedActivityCodeDescription["TEST_NOT_STARTED"] = "Test not started";
    DelegatedActivityCodeDescription["BAD_WEATHER"] = "Bad weather";
    DelegatedActivityCodeDescription["EXAMINER_ILL_OR_UNAVAILABLE"] = "Examiner ill or unavailable";
    DelegatedActivityCodeDescription["BAD_WEATHER_REBOOK"] = "Bad weather - rebook";
    DelegatedActivityCodeDescription["EXAMINER_ILL_OR_UNAVAILABLE_REBOOK"] = "Examiner ill or unavailable - rebook";
})(DelegatedActivityCodeDescription || (DelegatedActivityCodeDescription = {}));
export function populateActivityCodeModelList(isDelegatedExaminer) {
    var codeList = [];
    Object.keys(ActivityCodes).forEach(function (code) { return codeList.push({
        activityCode: ActivityCodes[code],
        description: ActivityCodeDescription[code],
    }); });
    if (isDelegatedExaminer) {
        Object.keys(DelegatedExaminerActivityCodes).forEach(function (code) { return codeList.push({
            activityCode: DelegatedExaminerActivityCodes[code],
            description: DelegatedActivityCodeDescription[code],
        }); });
    }
    codeList.sort(function (a, b) { return (Number(a.activityCode) > Number(b.activityCode)) ? 1 : -1; });
    return codeList;
}
export var activityCodeModelListDelegatedExaminer = populateActivityCodeModelList(true);
export var activityCodeModelList = populateActivityCodeModelList(false);
export function getActivityCodeOptions(delegatedExaminer) {
    if (delegatedExaminer)
        return activityCodeModelListDelegatedExaminer;
    return activityCodeModelList;
}
//# sourceMappingURL=activity-code.constants.js.map