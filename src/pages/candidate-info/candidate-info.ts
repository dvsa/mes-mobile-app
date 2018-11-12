import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DeclarationConsentPage } from '../declaration-consent/declaration-consent';
import { PolicyDataPage } from '../policy-data/policy-data';
import { Page } from 'ionic-angular/navigation/nav-util';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { PretestChecksPage } from '../pretest-checks/pretest-checks';
import { InitiateSwapPage } from '../initiate-swap/initiate-swap';
import { IJournal } from '../../providers/journal/journal-model';
import { getFormattedCandidateName, getFormattedAddress } from '../../shared/utils/formatters';
import { isNonBlankString } from '../../shared/utils/string-utils';
@Component({
  selector: 'page-candidate-info',
  templateUrl: 'candidate-info.html'
})
export class CandidateInfoPage {
  declarationConsentPage: Page = DeclarationConsentPage;
  policyDataPage: Page = PolicyDataPage;
  pretestChecksPage: Page = PretestChecksPage;
  initiateSwapPage: Page = InitiateSwapPage;

  signature: any;

  slotDetail: IJournal;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: AppConfigProvider
  ) {
    this.signature = this.navParams.get('signature');
    this.slotDetail = this.navParams.get('slotDetail');
  }

  confirmIdentity() {
    this.navCtrl.push(this.pretestChecksPage);
  }

  /**
   * Returns concatenated Candidate name for this slot
   */
  getCandidateName(): string {
    return getFormattedCandidateName(this.slotDetail.candidateName);
  }

  getCandidateAddress(): string {
    return getFormattedAddress(this.slotDetail.candidateAddress);
  }

  getTitle(): string {
    return 'View candidate';
  }

  // Todo: make this data-driven (fetch this from slot data and format)
  getSlotType(): string {
    return 'Single slot';
  }

  getCandidateComments(): string {
    return isNonBlankString(this.slotDetail.specialNeeds) ? this.slotDetail.specialNeeds : 'None';
  }

  showSlotWarning(): boolean {
    return isNonBlankString(this.slotDetail.specialNeeds);
  }
}
