import { communicationPreferencesReducer } from '../communication-preferences.reducer';
import { CandidateChoseEmailAsCommunicationPreference, CandidateChosePostAsCommunicationPreference, CandidateChoseToProceedWithTestInWelsh, CandidateChoseToProceedWithTestInEnglish, PopulateConductedLanguage, } from '../communication-preferences.actions';
describe('communicationPreferencesReducer', function () {
    describe('CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL', function () {
        it('should correctly set the communication preference as email and set the email address', function () {
            var emailAddress = 'example@example.com';
            var action = new CandidateChoseEmailAsCommunicationPreference(emailAddress, "Email");
            var result = communicationPreferencesReducer(null, action);
            expect(result.communicationMethod).toEqual('Email');
            expect(result.updatedEmail).toEqual(emailAddress);
        });
    });
    describe('CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST', function () {
        it('should set the communication preference as post', function () {
            var action = new CandidateChosePostAsCommunicationPreference('Post');
            var result = communicationPreferencesReducer(null, action);
            expect(result.communicationMethod).toEqual('Post');
        });
    });
    describe('CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH', function () {
        it('should set conducted language as Cymraeg', function () {
            var action = new CandidateChoseToProceedWithTestInWelsh('Cymraeg');
            var result = communicationPreferencesReducer(null, action);
            expect(result.conductedLanguage).toEqual('Cymraeg');
        });
    });
    describe('CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH', function () {
        it('should set conducted language as English', function () {
            var action = new CandidateChoseToProceedWithTestInEnglish('English');
            var result = communicationPreferencesReducer(null, action);
            expect(result.conductedLanguage).toEqual('English');
        });
    });
    describe('POPULATE_CONDUCTED_LANGUAGE', function () {
        it('should set the language as Cymraeg if it is provided in the action', function () {
            var action = new PopulateConductedLanguage('Cymraeg');
            var mockState = {
                conductedLanguage: 'Not provided',
                communicationMethod: 'Not provided',
                updatedEmail: '',
            };
            var result = communicationPreferencesReducer(mockState, action);
            expect(result.conductedLanguage).toEqual('Cymraeg');
        });
        it('should set the language as English if it is provided in the action', function () {
            var action = new PopulateConductedLanguage('English');
            var mockState = {
                conductedLanguage: 'Not provided',
                communicationMethod: 'Not provided',
                updatedEmail: '',
            };
            var result = communicationPreferencesReducer(mockState, action);
            expect(result.conductedLanguage).toEqual('English');
        });
        it('should not update the language if it has already been set', function () {
            var action = new PopulateConductedLanguage('Cymraeg');
            var mockState = {
                conductedLanguage: 'English',
                communicationMethod: 'Not provided',
                updatedEmail: '',
            };
            var result = communicationPreferencesReducer(mockState, action);
            expect(result.conductedLanguage).toEqual('English');
        });
    });
});
//# sourceMappingURL=communication-preferences.reducer.spec.js.map