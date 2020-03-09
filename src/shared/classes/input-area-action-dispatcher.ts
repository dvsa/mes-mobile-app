import { ElementRef } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { extractPropertyNameFromId } from '../helpers/property-name-extraction';
import { StoreModel } from '../models/store.model';
import { Store } from '@ngrx/store';

export abstract class InputSubscriptionActionDispatcher {

  constructor(public store$: Store<StoreModel>) {}

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
