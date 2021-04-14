var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select } from 'ionic-angular';
import { BikeCategoryDetailProvider } from '../../../providers/bike-category-detail/bike-category-detail';
import { BikeTestType, } from '../../../providers/bike-category-detail/bike-category-detail.model';
import { Store } from '@ngrx/store';
import * as waitingRoomToCarActions from '../../../pages/waiting-room-to-car/waiting-room-to-car.actions';
var BikeCategoryTypeComponent = /** @class */ (function () {
    function BikeCategoryTypeComponent(bikeCategoryDetailProvider, store$) {
        this.bikeCategoryDetailProvider = bikeCategoryDetailProvider;
        this.store$ = store$;
        this.categoryConfirmed = false;
        this.categoryCodeChange = new EventEmitter();
    }
    BikeCategoryTypeComponent.prototype.openCategorySelector = function () {
        this.loadImages();
        this.selectRef.open();
    };
    BikeCategoryTypeComponent.prototype.closeCategorySelector = function () {
        this.selectRef.close();
    };
    BikeCategoryTypeComponent.prototype.loadImages = function () {
        var _this = this;
        setTimeout(function () {
            var options = document.getElementsByClassName('alert-radio-label');
            Array.from(options).forEach(function (option, index) {
                var element = options[index];
                var category = _this.bikeCategoryDetails[index].categoryCode;
                var bike = _this.bikeCategoryDetailProvider.getDetailByCategoryCode(category);
                element.innerHTML = ("<span class=\"bike-code\">" + element.innerHTML + "</span>")
                    .concat(bike.displayName + "<img class=\"bike-image\" src=\"" + bike.imageUrl + "\" />");
            });
        }, 20);
    };
    BikeCategoryTypeComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl({
                value: 'Select cat type..',
                disabled: false,
            }, [this.validateCategorySelection.bind(this)]);
            this.formGroup.addControl('categoryTypeSelectCategory', this.formControl);
        }
        this.formControl.patchValue('Select cat type..');
    };
    Object.defineProperty(BikeCategoryTypeComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    BikeCategoryTypeComponent.prototype.ngOnInit = function () {
        // default to MOD1 if any input other than MOD1 or MOD2 provided
        this.testType = (this.testType === BikeTestType.MOD1 || this.testType === BikeTestType.MOD2) ?
            this.testType : BikeTestType.MOD1;
        this.bikeCategoryDetails = this.bikeCategoryDetailProvider.getAllDetailsByTestType(this.testType);
    };
    BikeCategoryTypeComponent.prototype.bikeCategoryModalShown = function () {
        this.store$.dispatch(new waitingRoomToCarActions.WaitingRoomToCarViewBikeCategoryModal);
    };
    BikeCategoryTypeComponent.prototype.categoryCodeChanged = function (category) {
        this.categoryConfirmed = true;
        this.ngOnChanges();
        this.categoryCodeChange.emit(category);
    };
    BikeCategoryTypeComponent.prototype.validateCategorySelection = function () {
        return this.categoryConfirmed ? null : { categoryTypeSelectCategory: false };
    };
    __decorate([
        ViewChild('categorySelect'),
        __metadata("design:type", Select)
    ], BikeCategoryTypeComponent.prototype, "selectRef", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], BikeCategoryTypeComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BikeCategoryTypeComponent.prototype, "testCategory", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], BikeCategoryTypeComponent.prototype, "testType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], BikeCategoryTypeComponent.prototype, "categoryConfirmed", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], BikeCategoryTypeComponent.prototype, "categoryCodeChange", void 0);
    BikeCategoryTypeComponent = __decorate([
        Component({
            selector: 'bike-category-type',
            templateUrl: 'bike-category-type.html',
        }),
        __metadata("design:paramtypes", [BikeCategoryDetailProvider,
            Store])
    ], BikeCategoryTypeComponent);
    return BikeCategoryTypeComponent;
}());
export { BikeCategoryTypeComponent };
//# sourceMappingURL=bike-category-type.js.map