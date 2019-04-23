import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getDrivingFaultComment } from '../../../debrief/debrief.selector';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/Observable/fromEvent';
import { AddDrivingFaultComment } from '../../../../modules/tests/test_data/test-data.actions';
import { extractPropertyNameFromId } from '../../../../shared/functions/property-name-extraction';

interface DrivingFaultCommentComponentState {
  competencyComment$: Observable<string>;
}

@Component({
  selector: 'driving-fault-comment',
  templateUrl: 'driving-fault-comment.html',
})
export class DrivingFaultCommentComponent implements OnInit {
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
      private store$: Store<StoreModel>,
    ) {}

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
    this.inputSubscription$ = this.inputAreaChangeSubscriptionDispatchingAction(
        this.drivingFaultComment,
        this.drivingFaultComment.nativeElement.id,
        AddDrivingFaultComment);

  }
  ngOnDestroy(): void {
    this.inputSubscription$.unsubscribe();
  }

    /**
   * Returns a subscription to the debounced changes of a particular input fields.
   * Dispatches the provided action type to the store when a new value is yielded.
   * @param inputRef The input to listen for changes on.
   * @param actionType The the type of action to dispatch, should accept an argument for the input value.
   */
  inputAreaChangeSubscriptionDispatchingAction(
    inputRef: ElementRef,
    id: string,
    actionType: any): Subscription {
    const changeStream$ = fromEvent(inputRef.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      distinctUntilChanged(),
    );
    const subscription = changeStream$
      .subscribe((newVal: string) => this.store$.dispatch(
        new actionType(extractPropertyNameFromId(id), newVal)));
    return subscription;
  }
}
