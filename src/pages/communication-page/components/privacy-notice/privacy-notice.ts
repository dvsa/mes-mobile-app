import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
<<<<<<< HEAD:src/pages/communication-page/cat-b/components/privacy-notice/privacy-notice.ts
import { configureI18N } from '../../../../shared/helpers/translation.helpers';
=======
>>>>>>> Mes 3643 communication page extract common components add cat b e (#819):src/pages/communication-page/components/privacy-notice/privacy-notice.ts

@Component({
  selector: 'privacy-notice',
  templateUrl: 'privacy-notice.html',
})
export class PrivacyNoticeComponent implements OnInit{

  @Input()
  language: Language;

  constructor(private translate: TranslateService) {  }

  ngOnInit() : void {
    configureI18N(this.language, this.translate);
  }

}
