import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { map } from 'rxjs/operators';
import { getDrivingFaultComment } from '../../../debrief/debrief.selector';
import { Subscription } from 'rxjs/Subscription';
import { AddSeriousFaultComment } from '../../../../modules/tests/test_data/test-data.actions';
import { InputSubscriptionActionDispatcher } from '../../../../shared/classes/input-area-action-dispatcher';

interface SeriousFaultCommentComponentState {
  competencyComment$: Observable<string>;
}

@Component({
  selector: 'serious-fault-comment',
  templateUrl: 'serious-fault-comment.html',
})
export class SeriousFaultCommentComponent extends InputSubscriptionActionDispatcher implements OnInit {
  pageState: SeriousFaultCommentComponentState;

  @Input()
  parentForm: FormGroup;

  @Input()
  invalidIndicator: boolean;

  @Input()
  index: number;

  @Input()
  competency: string;

  @Input()
  faultName: string;

  @ViewChild('seriousFaultComment')
  seriousFaultComment: ElementRef;

  inputSubscription$: Subscription;

  constructor(public store$: Store<StoreModel>) {
    super(store$);
  }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      competencyComment$: currentTest$.pipe(
        map(data => getDrivingFaultComment(data.testData.seriousFaults, `${this.competency}Comments`)),
      ),
    };
  }

  ngAfterViewInit(): void {
    this.inputSubscription$ = super.inputAreaChangeSubscriptionDispatchingAction(
      this.seriousFaultComment,
      this.seriousFaultComment.nativeElement.id,
      AddSeriousFaultComment,
    );
  }

  ngOnDestroy(): void {
    this.inputSubscription$.unsubscribe();
  }
}
