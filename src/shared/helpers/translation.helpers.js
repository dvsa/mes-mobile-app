import { Language } from '../../modules/tests/communication-preferences/communication-preferences.model';
export var configureI18N = function (language, translateService) {
    if (language === Language.CYMRAEG) {
        translateService.use('cy');
    }
    else {
        translateService.use('en');
    }
};
//# sourceMappingURL=translation.helpers.js.map