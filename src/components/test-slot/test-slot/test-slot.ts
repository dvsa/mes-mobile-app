import { Component, Input, OnInit } from '@angular/core';
import { get, isNil } from 'lodash';
import { SlotComponent } from '../slot/slot';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { vehicleDetails } from './test-slot.constants';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { merge, Observable, Subscription } from 'rxjs';
import { getTests } from '../../../modules/tests/tests.reducer';
import {
  getTestStatus,
  getActivityCodeBySlotId,
  getTestById,
  getJournalData,
} from '../../../modules/tests/tests.selector';
import { SlotTypes } from '../../../shared/models/slot-types';
import { map, filter } from 'rxjs/operators';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { ActivityCode } from '@dvsa/mes-test-schema/categories/common';
import { getSlotType } from '../../../shared/helpers/get-slot-type';
import { SlotProvider } from '../../../providers/slot/slot';
import { isRekey } from '../../../modules/tests/rekey/rekey.selector';
import { getRekeyIndicator } from '../../../modules/tests/rekey/rekey.reducer';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getApplicationNumber } from '../../../modules/tests/journal-data/common/application-reference/application-reference.selector';
import { getApplicationReference } from '../../../modules/tests/journal-data/common/application-reference/application-reference.reducer';
import { getExaminer } from '../../../modules/tests/journal-data/common/examiner/examiner.reducer';
import { getStaffNumber } from '../../../modules/tests/journal-data/common/examiner/examiner.selector';
// import { SearchBookedTestForTestStatus } from '../../../pages/rekey-search/rekey-search.actions';
import { SearchProvider } from '../../../providers/search/search';
import { HttpResponse } from '@angular/common/http';
import * as testStatusActions from '../../../modules/tests/test-status/test-status.actions';
import { CompressionProvider } from '../../../providers/compression/compression';

interface TestSlotComponentState {
  testStatus$: Observable<TestStatus>;
  testActivityCode$: Observable<ActivityCode>;
  isRekey$: Observable<boolean>;

  applicationReferenceNumber$: Observable<string>;
  staffNumber$: Observable<string>;
}

@Component({
  selector: 'test-slot',
  templateUrl: 'test-slot.html',
  providers: [SearchProvider, CompressionProvider]
})
export class TestSlotComponent implements SlotComponent, OnInit {
  @Input()
  slot: TestSlot;

  @Input()
  hasSlotChanged: boolean;

  @Input()
  hasSeenCandidateDetails: boolean;

  @Input()
  showLocation: boolean;

  applicationReference: string;
  staffNumber: string;

  merged$: Observable<any>;
  subscription: Subscription;

  testStatus: TestStatus;

  componentState: TestSlotComponentState;

  constructor(
    public screenOrientation: ScreenOrientation,
    public appConfig: AppConfigProvider,
    public dateTimeProvider: DateTimeProvider,
    public store$: Store<StoreModel>,
    private slotProvider: SlotProvider,
    private testSearchProvider: SearchProvider,
    private compressionProvider: CompressionProvider,
  ) {
  }

  ngOnInit(): void {
    const { slotId } = this.slot.slotDetail;
    this.componentState = {
      testStatus$: this.store$.pipe(
        select(getTests),
        select(tests => getTestStatus(tests, slotId)),
      ),
      testActivityCode$: this.store$.pipe(
        select(getTests),
        map(tests => getActivityCodeBySlotId(tests, this.slot.slotDetail.slotId)),
      ),
      isRekey$: this.store$.pipe(
        select(getTests),
        map(tests => getTestById(tests, this.slot.slotDetail.slotId.toString())),
        filter(test => test !== undefined),
        select(getRekeyIndicator),
        select(isRekey),
      ),
      applicationReferenceNumber$: this.store$.pipe(
        select(getTests),
        map((tests) => getTestById(tests, slotId.toString())),
        filter((test) => test !== undefined),
        select(getJournalData),
        select(getApplicationReference),
        select(getApplicationNumber),
      ),
      staffNumber$: this.store$.pipe(
        select(getTests),
        map((tests) => getTestById(tests, slotId.toString())),
        filter((test) => test !== undefined),
        select(getJournalData),
        select(getExaminer),
        select(getStaffNumber),
      ),
    };

    const { applicationReferenceNumber$, staffNumber$, testStatus$ } = this.componentState;

    this.merged$ = merge(
      applicationReferenceNumber$.pipe(map(value => this.applicationReference = value)),
      staffNumber$.pipe(map(value => this.staffNumber = value)),
      testStatus$.pipe(map(value => this.testStatus = value)),
    );
    this.subscription = this.merged$.subscribe();

    if (this.applicationReference && this.staffNumber) {
      // needs to be moved to effect and instantiated by dispatch action
      this.testSearchProvider
        .getTestResult(this.applicationReference, this.staffNumber)
        .subscribe((response: HttpResponse<any>): void => {
          if (response) {
            const { body } = response;

            if (typeof body === 'string') {
              // this object spread will not need to be done if the TestStatus existed in schema
              const test =
                { ...this.compressionProvider.extractTestResult(body), testStatus: TestStatus.Submitted };
              const id: number = get(test, 'journalData.testSlotAttributes.slotId', null);
              // check status here and dispatch appropriate action, create action that handles any TestStatus and use
              // the value from the decompress JSON
              const { testStatus } = test;

              if (typeof id === 'number' && this.testStatus !== test.testStatus) {
                this.store$.dispatch(
                  new testStatusActions.SetTestStatusDynamic(id.toString(), testStatus)
                );
              }
            }
          }
        }, (err) => {
          console.error(err);
        });
    }
  }

  isIndicatorNeededForSlot(): boolean {
    const specialNeeds: boolean = this.isSpecialNeedsSlot();
    const checkNeeded: boolean = this.slot.booking.application.entitlementCheck || false;
    const nonStandardTest: boolean = getSlotType(this.slot) !== SlotTypes.STANDARD_TEST;

    return specialNeeds || checkNeeded || nonStandardTest;
  }

  isSpecialNeedsSlot(): boolean {
    const specialNeeds = get(this.slot, 'booking.application.specialNeeds', '');
    return !isNil(specialNeeds) && specialNeeds.length > 0;
  }

  isPortrait(): boolean {
    return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
      this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
  }

  showVehicleDetails(): boolean {
    return vehicleDetails[this.slot.booking.application.testCategory as TestCategory];
  }

  showAdditionalCandidateDetails(): boolean {
    return this.slot.booking.application.testCategory === TestCategory.ADI2;
  }

  canStartTest(): boolean {
    return this.slotProvider.canStartTest(this.slot);
  }
}
