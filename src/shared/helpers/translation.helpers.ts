import { Language } from '../../modules/tests/communication-preferences/communication-preferences.model';
import { TranslateService } from 'ng2-translate';

export const configureI18N = (language: Language, translateService: TranslateService) : void => {
  if (language === Language.CYMRAEG) {
    translateService.use('cy');
  } else {
    translateService.use('en');
  }
};
