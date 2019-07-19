import { Component, Input } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'privacy-notice',
  templateUrl: 'privacy-notice.html',
})
export class PrivacyNoticeComponent {

  @Input()
  isWelsh: boolean;

  constructor(private translate: TranslateService) {}

  configureI18N(isWelsh: boolean): void {
    if (this.isWelsh) {
      this.translate.use('cy');
    }
  }
}
