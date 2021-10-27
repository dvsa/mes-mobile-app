import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BasePageComponent } from '../../shared/classes/base-page';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { StoreModel } from '../../shared/models/store.model';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Details } from './candidate-details.model';
import {
  ClearChangedSlot,
  CandidateDetailsSeen,
} from '../../modules/journal/journal.actions';
import {
  getCandidateName,
  getTime,
  getDetails,
  getBusiness,
  isCategoryEntitlementChecked, getCategoryEntitlementCheckText, isCandidateCheckNeeded,
} from './candidate-details.selector';
import {
  CandidateDetailsViewDidEnter,
  CandidateDetailsSlotChangeViewed,
} from './candidate-details.actions';
import { Business, TestSlot } from '@dvsa/mes-journal-schema';

interface CandidateDetailsPageState {
  name: string;
  time: string;
  details: Details;
  business: Business;
  candidateEntitlementCheck: boolean;
  categoryEntitlementCheck: boolean;
  categoryEntitlementCheckText: string;
}

@IonicPage()
@Component({
  selector: 'page-candidate-details',
  templateUrl: 'candidate-details.html',
})
export class CandidateDetailsPage extends BasePageComponent implements OnInit {
  pageState: CandidateDetailsPageState;
  slot: TestSlot;
  slotChanged: boolean = false;
  testCategory = TestCategory.B;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public authenticationProvider: AuthenticationProvider,
    private store$: Store<StoreModel>,
  ) {
    super(platform, navController, authenticationProvider);
    this.slot = navParams.get('slot');
    this.slotChanged = navParams.get('slotChanged');
  }

  ngOnInit(): void {
    this.store$.dispatch(new ClearChangedSlot(this.slot.slotDetail.slotId));

    this.pageState = {
      name: getCandidateName(this.slot),
      time: getTime(this.slot),
      details: getDetails(this.slot),
      business: getBusiness(this.slot),
      candidateEntitlementCheck: isCandidateCheckNeeded(this.slot),
      categoryEntitlementCheck: isCategoryEntitlementChecked(this.slot),
      categoryEntitlementCheckText: getCategoryEntitlementCheckText(this.slot),
    };

    this.testCategory = this.pageState.details.testCategory as TestCategory;

    if (this.slotChanged) {
      this.store$.dispatch(new CandidateDetailsSlotChangeViewed(this.slot.slotDetail.slotId));
    }
    this.store$.dispatch(new ClearChangedSlot(this.slot.slotDetail.slotId));
  }

  ionViewDidEnter(): void {
    this.store$.dispatch(new CandidateDetailsViewDidEnter(this.slot));
    this.store$.dispatch(new CandidateDetailsSeen(this.slot.slotDetail.slotId));
  }

  handleDoneButtonClick(): void {
    this.navController.pop();
  }

  public specialNeedsIsPopulated(specialNeeds: string | string[]): boolean {
    return Array.isArray(specialNeeds);
  }
}
