import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Language } from '../../../../modules/tests/communication-preferences/communication-preferences.model';
import { configureI18N } from '../../../../shared/helpers/translation.helpers';

@Component({
  selector: 'privacy-notice',
  templateUrl: 'privacy-notice.html',
})
export class PrivacyNoticeComponent implements OnInit{

  @Input()
  language: Language;

  @Input()
  isRider: boolean = false;

  constructor(private translate: TranslateService) {  }

  ngOnInit() : void {
    configureI18N(this.language, this.translate);
  }

}
