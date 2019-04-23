import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getDrivingFaultComment } from '../../../debrief/debrief.selector';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AddDrivingFaultComment } from '../../../../modules/tests/test_data/test-data.actions';
import { InputSubscriptionActionDispatcher } from '../../../../shared/classes/input-area-action-dispatcher';

interface DrivingFaultCommentComponentState {
  competencyComment$: Observable<string>;
}

@Component({
  selector: 'driving-fault-comment',
  templateUrl: 'driving-fault-comment.html',
})
export class DrivingFaultCommentComponent extends InputSubscriptionActionDispatcher implements OnInit {
  pageState: DrivingFaultCommentComponentState;
  @Input()
  parentForm: FormGroup;
  @Input()
  invalidIndicator: boolean;

  @Input()
  index: number;

  @Input()
  competency: string;

  @Input()
  faultCount: number;

  @Input()
  faultName: string;
  @ViewChild('drivingFaultComment')
  drivingFaultComment: ElementRef;

  inputSubscription$: Subscription;

  constructor(
    public store$: Store<StoreModel>,
  ) {
    super(store$);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      competencyComment$: currentTest$.pipe(
        map(data => getDrivingFaultComment(data.testData.drivingFaults, `${this.competency}Comments`)),
      ),
    };
  }

  ngAfterViewInit(): void {
    this.inputSubscription$ = super.inputAreaChangeSubscriptionDispatchingAction(
      this.drivingFaultComment,
      this.drivingFaultComment.nativeElement.id,
      AddDrivingFaultComment);

  }
  ngOnDestroy(): void {
    this.inputSubscription$.unsubscribe();
  }
}
