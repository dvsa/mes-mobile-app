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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { Store, select } from '@ngrx/store';
import { of, merge } from 'rxjs';
import { Component } from '@angular/core';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
import { getManoeuvresADI2, } from '../../../../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { RecordManoeuvresSelection, RecordManoeuvresDeselection, } from '../../../../../modules/tests/test-data/cat-adi-part2/manoeuvres/manoeuvres.actions';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../../modules/tests/test-data/test-data.constants';
import { map, tap } from 'rxjs/operators';
import { some } from 'lodash';
var ManoeuvresPopoverComponentAdiPart2 = /** @class */ (function () {
    function ManoeuvresPopoverComponentAdiPart2(store$) {
        this.store$ = store$;
        this.manoeuvreTypes = ManoeuvreTypes;
        this.competencies = ManoeuvreCompetencies;
        this.manoeuvreHasFaults = function (manoeuvre) { return (manoeuvre &&
            (manoeuvre.controlFault != null ||
                manoeuvre.observationFault != null)); };
        this.getId = function (manoeuvre, competency, index) {
            return manoeuvre + "-" + competency + index;
        };
    }
    ManoeuvresPopoverComponentAdiPart2.prototype.ngOnInit = function () {
        var _this = this;
        this.manoeuvres$ = this.store$.pipe(select(getTests), select(getCurrentTest), select(getTestData), select(getManoeuvresADI2));
        this.manoeuvresWithFaults$ = this.manoeuvres$.pipe(map(function (manoeuvres) {
            return manoeuvres.map(function (manoeuvre) { return ({
                reverseRight: _this.manoeuvreHasFaults(manoeuvre.reverseRight),
                reverseParkRoad: _this.manoeuvreHasFaults(manoeuvre.reverseParkRoad),
                reverseParkCarpark: _this.manoeuvreHasFaults(manoeuvre.reverseParkCarpark),
                forwardPark: _this.manoeuvreHasFaults(manoeuvre.forwardPark),
            }); });
        }));
        this.merged$ = merge(this.manoeuvres$.pipe(map(function (manoeuvres) {
            return __spreadArray([], manoeuvres.map(function (manoeuvre) {
                return Object.keys(manoeuvre).find(function (manoeuvreType) {
                    return manoeuvre[manoeuvreType].selected === true;
                });
            }));
        }), tap(function (selectedManouevreTypes) {
            if (selectedManouevreTypes[0] &&
                selectedManouevreTypes[1] &&
                selectedManouevreTypes[0] === selectedManouevreTypes[1]) {
                _this.store$.dispatch(new RecordManoeuvresDeselection(selectedManouevreTypes[0], 1));
            }
        })));
        this.subscription = this.merged$.subscribe();
    };
    ManoeuvresPopoverComponentAdiPart2.prototype.recordManoeuvreSelection = function (manoeuvreType, index) {
        this.store$.dispatch(new RecordManoeuvresSelection(manoeuvreType, index));
    };
    /**
     * @param  {string} manoeuvre
     * @returns Observable<boolean>
     * Called by the manoeuvre input elements in manoeuvres-popover.html
     * Tells the input whether it needs to be disabled based on whether
     * or not another manoeuvre has a fault recorded
     */
    ManoeuvresPopoverComponentAdiPart2.prototype.shouldManoeuvreDisable = function (manoeuvre, index) {
        return this.manoeuvresWithFaults$.pipe(map(function (manoeuvresWithFaults) {
            if (manoeuvre === ManoeuvreTypes.reverseLeft) {
                return true;
            }
            var _a = manoeuvresWithFaults[index], _b = manoeuvre, manoeuvreToOmit = _a[_b], otherManoeuvres = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return some(otherManoeuvres, function (value) { return value; });
        }));
    };
    /**
     * @param  {string} manoeuvre
     * @returns Observable<boolean>
     * Called by the manoeuvre input elements in manoeuvres-popover.html
     * Tells the input whether the same ManoeuvreType has selected in the preceeding Manoeuvre
     */
    ManoeuvresPopoverComponentAdiPart2.prototype.shouldHideManoeuvre = function (manoeuvre, index) {
        if (index === 0) {
            return of(false);
        }
        var prerequisiteManoeuvreSelected;
        return this.manoeuvres$.pipe(map(function (manoeuvres) {
            prerequisiteManoeuvreSelected = Object.keys(manoeuvres[0]).find(function (manoeuvreName) { return manoeuvres[0][manoeuvreName].selected; });
            return !prerequisiteManoeuvreSelected || manoeuvre === prerequisiteManoeuvreSelected;
        }));
    };
    ManoeuvresPopoverComponentAdiPart2.prototype.ngOnDestroy = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ManoeuvresPopoverComponentAdiPart2 = __decorate([
        Component({
            selector: 'manoeuvres-popover-adi-part2',
            templateUrl: 'manoeuvres-popover.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], ManoeuvresPopoverComponentAdiPart2);
    return ManoeuvresPopoverComponentAdiPart2;
}());
export { ManoeuvresPopoverComponentAdiPart2 };
//# sourceMappingURL=manoeuvres-popover.js.map