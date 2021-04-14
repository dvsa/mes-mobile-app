var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Store, select } from '@ngrx/store';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getManoeuvres } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { RecordManoeuvresSelection } from '../../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { map } from 'rxjs/operators';
import { some } from 'lodash';
var ManoeuvresPopoverComponent = /** @class */ (function () {
    function ManoeuvresPopoverComponent(store$) {
        this.store$ = store$;
        this.manoeuvreTypes = ManoeuvreTypes;
        this.competencies = ManoeuvreCompetencies;
        this.manoeuvreHasFaults = function (manoeuvre) { return (manoeuvre &&
            (manoeuvre.controlFault != null ||
                manoeuvre.observationFault != null)); };
        this.getId = function (manoeuvre, competency) { return manoeuvre + "-" + competency; };
    }
    ManoeuvresPopoverComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.manoeuvres$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getManoeuvres));
        this.manoeuvresWithFaults$ = this.manoeuvres$.pipe(map(function (manoeuvres) { return ({
            reverseRight: _this.manoeuvreHasFaults(manoeuvres.reverseRight),
            reverseParkRoad: _this.manoeuvreHasFaults(manoeuvres.reverseParkRoad),
            reverseParkCarpark: _this.manoeuvreHasFaults(manoeuvres.reverseParkCarpark),
            forwardPark: _this.manoeuvreHasFaults(manoeuvres.forwardPark),
        }); }));
    };
    ManoeuvresPopoverComponent.prototype.recordManoeuvreSelection = function (manoeuvre) {
        this.store$.dispatch(new RecordManoeuvresSelection(manoeuvre));
    };
    /**
     * @param  {string} manoeuvre
     * @returns Observable<boolean>
     * Called by the manoeuvre input elements in manoeuvres-popover.html
     * Tells the input whether it needs to be disabled based on whether
     * or not another manoeuvre has a fault recorded
     */
    ManoeuvresPopoverComponent.prototype.shouldManoeuvreDisable = function (manoeuvre) {
        return this.manoeuvresWithFaults$.pipe(map(function (manoeuvresWithFaults) {
            var _a = manoeuvresWithFaults, _b = manoeuvre, manoeuvreToOmit = _a[_b], otherManoeuvres = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return some(otherManoeuvres, function (value) { return value; });
        }));
    };
    ManoeuvresPopoverComponent = __decorate([
        Component({
            selector: 'manoeuvres-popover',
            templateUrl: 'manoeuvres-popover.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], ManoeuvresPopoverComponent);
    return ManoeuvresPopoverComponent;
}());
export { ManoeuvresPopoverComponent };
//# sourceMappingURL=manoeuvres-popover.js.map