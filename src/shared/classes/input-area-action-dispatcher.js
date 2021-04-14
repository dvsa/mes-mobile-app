import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { extractPropertyNameFromId } from '../helpers/property-name-extraction';
var InputSubscriptionActionDispatcher = /** @class */ (function () {
    function InputSubscriptionActionDispatcher(store$) {
        this.store$ = store$;
    }
    /**
     * Returns a subscription to the debounced changes of a particular input fields.
     * Dispatches the provided action type to the store when a new value is yielded.
     * @param inputRef The input to listen for changes on.
     * @param actionType The the type of action to dispatch, should accept an argument for the input value.
     */
    InputSubscriptionActionDispatcher.prototype.inputAreaChangeSubscriptionDispatchingAction = function (inputRef, id, actionType) {
        var _this = this;
        var changeStream$ = fromEvent(inputRef.nativeElement, 'keyup').pipe(map(function (event) { return event.target.value; }), debounceTime(1000), distinctUntilChanged());
        var subscription = changeStream$
            .subscribe(function (newVal) { return _this.store$.dispatch(new actionType(extractPropertyNameFromId(id), newVal)); });
        return subscription;
    };
    return InputSubscriptionActionDispatcher;
}());
export { InputSubscriptionActionDispatcher };
//# sourceMappingURL=input-area-action-dispatcher.js.map