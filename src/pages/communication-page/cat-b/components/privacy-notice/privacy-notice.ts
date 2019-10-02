import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Language } from '../../../../../modules/tests/communication-preferences/communication-preferences.model';

@Component({
  selector: 'privacy-notice',
  templateUrl: 'privacy-notice.html',
})
export class PrivacyNoticeComponent {

  @Input()
  language: Language;

  constructor(private translate: TranslateService) {}

  configureI18N(language: Language): void {
    if (language === Language.CYMRAEG) {
      this.translate.use('cy');
    } else {
      this.translate.use('en');
    }
  }
}
