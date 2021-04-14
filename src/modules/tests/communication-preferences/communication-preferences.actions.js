export var CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL = '[Communication Preferences] Candidate confirmed communication preferences as email';
export var CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST = '[Communication Preferences] Candidate confirmed communication preferences as post';
export var CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH = '[Communication Preferences] Candidate chose to proceed with test in English';
export var CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH = '[Communication Preferences] Candidate chose to proceed with test in Welsh';
export var POPULATE_CONDUCTED_LANGUAGE = '[Communication Preferences] Populate Conducted Language';
var CandidateChoseEmailAsCommunicationPreference = /** @class */ (function () {
    function CandidateChoseEmailAsCommunicationPreference(updatedEmail, communicationMethod) {
        this.updatedEmail = updatedEmail;
        this.communicationMethod = communicationMethod;
        this.type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL;
    }
    return CandidateChoseEmailAsCommunicationPreference;
}());
export { CandidateChoseEmailAsCommunicationPreference };
var CandidateChosePostAsCommunicationPreference = /** @class */ (function () {
    function CandidateChosePostAsCommunicationPreference(communicationMethod) {
        this.communicationMethod = communicationMethod;
        this.type = CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST;
    }
    return CandidateChosePostAsCommunicationPreference;
}());
export { CandidateChosePostAsCommunicationPreference };
var CandidateChoseToProceedWithTestInEnglish = /** @class */ (function () {
    function CandidateChoseToProceedWithTestInEnglish(conductedLanguage) {
        this.conductedLanguage = conductedLanguage;
        this.type = CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH;
    }
    return CandidateChoseToProceedWithTestInEnglish;
}());
export { CandidateChoseToProceedWithTestInEnglish };
var CandidateChoseToProceedWithTestInWelsh = /** @class */ (function () {
    function CandidateChoseToProceedWithTestInWelsh(conductedLanguage) {
        this.conductedLanguage = conductedLanguage;
        this.type = CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH;
    }
    return CandidateChoseToProceedWithTestInWelsh;
}());
export { CandidateChoseToProceedWithTestInWelsh };
var PopulateConductedLanguage = /** @class */ (function () {
    function PopulateConductedLanguage(conductedLanguage) {
        this.conductedLanguage = conductedLanguage;
        this.type = POPULATE_CONDUCTED_LANGUAGE;
    }
    return PopulateConductedLanguage;
}());
export { PopulateConductedLanguage };
//# sourceMappingURL=communication-preferences.actions.js.map