var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { merge } from 'rxjs';
import { IonicPage, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { ReversingDistancesProvider } from '../../../../providers/reversing-distances/reversing-distances';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';
import { map } from 'rxjs/operators';
import { ReverseDiagramLengthChanged, ReverseDiagramWidthChanged } from './reverse-diagram-modal.actions';
import { VehicleDetailsByCategoryProvider, } from '../../../../providers/vehicle-details-by-category/vehicle-details-by-category';
var ReverseDiagramPage = /** @class */ (function () {
    function ReverseDiagramPage(navParams, store$, reversingDistancesProvider, vehicleDetailsProvider) {
        var _this = this;
        this.navParams = navParams;
        this.store$ = store$;
        this.reversingDistancesProvider = reversingDistancesProvider;
        this.vehicleDetailsProvider = vehicleDetailsProvider;
        this.getReversingDiagramLabel = function () {
            switch (_this.category) {
                case "B+E" /* BE */:
                case "C+E" /* CE */:
                case "C1+E" /* C1E */:
                case "D+E" /* DE */:
                case "D1+E" /* D1E */:
                    return 'articulated';
                case "C" /* C */:
                case "C1" /* C1 */:
                case "D" /* D */:
                case "D1" /* D1 */:
                    return 'rigid';
            }
        };
        this.onClose = this.navParams.get('onClose');
    }
    ReverseDiagramPage.prototype.ngOnInit = function () {
        var _this = this;
        var currentTest$ = this.store$.pipe(select(getTests), select(getCurrentTest));
        var category;
        currentTest$.pipe(select(getTestCategory)).subscribe(function (value) {
            category = value;
            var vehicleDetails = _this.vehicleDetailsProvider.getVehicleDetailsByCategoryCode(category);
            _this.componentState = {
                vehicleLength$: currentTest$.pipe(select(vehicleDetails.vehicleDetails), select(vehicleDetails.vehicleLength)),
                vehicleWidth$: currentTest$.pipe(select(vehicleDetails.vehicleDetails), select(vehicleDetails.vehicleWidth)),
                category$: currentTest$.pipe(select(getTestCategory)),
            };
        });
        var _a = this.componentState, vehicleLength$ = _a.vehicleLength$, vehicleWidth$ = _a.vehicleWidth$, category$ = _a.category$;
        this.merged$ = merge(vehicleLength$.pipe(map(function (val) { return _this.vehicleLength = val; })), vehicleWidth$.pipe(map(function (val) { return _this.vehicleWidth = val; })), category$.pipe(map(function (val) { return _this.category = val; })));
    };
    ReverseDiagramPage.prototype.calculateReversingLengths = function (vehicleLength) {
        var vehicleDetails = {
            vehicleLength: vehicleLength,
            vehicleWidth: this.vehicleWidth,
        };
        var reversingLengths = this.reversingDistancesProvider.getDistanceLength(vehicleDetails, this.category);
        this.reversingLengthStart = reversingLengths.startDistance;
        this.reversingLengthMiddle = reversingLengths.middleDistance;
        this.vehicleLength = vehicleLength;
    };
    ReverseDiagramPage.prototype.calculateReversingWidth = function (vehicleWidth) {
        var vehicleDetails = {
            vehicleWidth: vehicleWidth,
            vehicleLength: this.vehicleLength,
        };
        this.reversingWidth = this.reversingDistancesProvider.getDistanceWidth(vehicleDetails, this.category);
        this.vehicleWidth = vehicleWidth;
    };
    ReverseDiagramPage.prototype.calculateAtoBMultiplierText = function () {
        switch (this.category) {
            case "C" /* C */:
            case "C1" /* C1 */:
            case "D" /* D */:
            case "D1" /* D1 */:
                return this.multiplierText = '1 1/2';
            default:
                return this.multiplierText = '2';
        }
    };
    ReverseDiagramPage.prototype.ionViewWillEnter = function () {
        if (this.merged$) {
            this.subscription = this.merged$.subscribe();
            this.calculateReversingLengths(this.vehicleLength);
            this.calculateReversingWidth(this.vehicleWidth);
            this.calculateAtoBMultiplierText();
        }
        return true;
    };
    ReverseDiagramPage.prototype.ionViewDidLeave = function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    ReverseDiagramPage.prototype.closeModal = function () {
        this.onClose();
    };
    ReverseDiagramPage.prototype.onLengthKeyup = function (vehicleLength) {
        this.store$.dispatch(new ReverseDiagramLengthChanged(this.vehicleLength, vehicleLength));
        this.calculateReversingLengths(vehicleLength);
    };
    ReverseDiagramPage.prototype.onWidthKeyup = function (vehicleWidth) {
        this.store$.dispatch(new ReverseDiagramWidthChanged(this.vehicleWidth, vehicleWidth));
        this.calculateReversingWidth(vehicleWidth);
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ReverseDiagramPage.prototype, "vehicleLength", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ReverseDiagramPage.prototype, "vehicleWidth", void 0);
    ReverseDiagramPage = __decorate([
        IonicPage(),
        Component({
            selector: 'reverse-diagram-modal',
            templateUrl: 'reverse-diagram-modal.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            Store,
            ReversingDistancesProvider,
            VehicleDetailsByCategoryProvider])
    ], ReverseDiagramPage);
    return ReverseDiagramPage;
}());
export { ReverseDiagramPage };
//# sourceMappingURL=reverse-diagram-modal.js.map