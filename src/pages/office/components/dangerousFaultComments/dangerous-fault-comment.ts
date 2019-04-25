import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { map } from 'rxjs/operators';
import { AddDangerousFaultComment } from '../../../../modules/tests/test_data/test-data.actions';
import { getDrivingFaultComment } from '../../../debrief/debrief.selector';
import { InputSubscriptionActionDispatcher } from '../../../../shared/classes/input-area-action-dispatcher';

interface DangerousFaultCommentComponentState {
  competencyComment$: Observable<string>;
}

@Component({
  selector: 'dangerous-fault-comment',
  templateUrl: 'dangerous-fault-comment.html',
})
export class DangerousFaultCommentComponent extends InputSubscriptionActionDispatcher implements OnInit {
  pageState: DangerousFaultCommentComponentState;

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

  @ViewChild('dangerousFaultComment')
  dangerousFaultComment: ElementRef;

  inputSubscription$: Subscription;

  constructor(public store$: Store<StoreModel>) { super(store$); }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.pageState = {
      competencyComment$: currentTest$.pipe(
        map(data => getDrivingFaultComment(data.testData.dangerousFaults, `${this.competency}Comments`)),
      ),
    };
  }
  ngAfterViewInit(): void {
    this.inputSubscription$ = super.inputAreaChangeSubscriptionDispatchingAction(
      this.dangerousFaultComment,
      this.dangerousFaultComment.nativeElement.id,
      AddDangerousFaultComment,
    );
  }

  ngOnDestroy(): void {
    this.inputSubscription$.unsubscribe();
  }
}
