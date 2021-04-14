import { get } from 'lodash';
export var getCommunicationPreferenceUpdatedEmail = function (communicationPreferences) { return get(communicationPreferences, 'updatedEmail', ''); };
export var getCommunicationPreferenceType = function (communicationPreferences) { return get(communicationPreferences, 'communicationMethod', ''); };
export var getConductedLanguage = function (communicationPreferences) { return communicationPreferences.conductedLanguage; };
//# sourceMappingURL=communication-preferences.selector.js.map