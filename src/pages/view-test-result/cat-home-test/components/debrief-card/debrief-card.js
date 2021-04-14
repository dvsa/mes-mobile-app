var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { flattenArray } from '../../../view-test-result-helpers';
import { ViewTestResultLabels, TestRequirementsLabels, } from '../../../components/data-row-with-list/data-list-with-row.model';
import { manoeuvreTypeLabelsCatHomeTest, } from '../../../../../shared/constants/competencies/cathometest-manoeuvres';
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
var DebriefCardComponent = /** @class */ (function () {
    function DebriefCardComponent(faultSummaryProvider, faultCountProvider) {
        var _this = this;
        this.faultSummaryProvider = faultSummaryProvider;
        this.faultCountProvider = faultCountProvider;
        this.getTestRequirements = function () {
            return [
                {
                    label: TestRequirementsLabels.normalStart1,
                    checked: get(_this.data, 'testRequirements.normalStart1', false),
                },
                {
                    label: TestRequirementsLabels.normalStart2,
                    checked: get(_this.data, 'testRequirements.normalStart2', false),
                },
                {
                    label: TestRequirementsLabels.angledStart,
                    checked: get(_this.data, 'testRequirements.angledStart', false),
                },
                {
                    label: TestRequirementsLabels.hillStart,
                    checked: get(_this.data, 'testRequirements.uphillStartDesignatedStart', false),
                },
            ];
        };
    }
    DebriefCardComponent.prototype.getHighwayCode = function () {
        var isHighwayCodeSelected = get(this.data, 'highwayCodeSafety.selected', false);
        return [
            {
                label: isHighwayCodeSelected ? 'Completed' : 'Not Completed',
                checked: isHighwayCodeSelected,
            },
        ];
    };
    DebriefCardComponent.prototype.getManoeuvre = function () {
        var isReverseLeftSelected = get(this.data, 'manoeuvres.reverseLeft.selected', false);
        return isReverseLeftSelected ? manoeuvreTypeLabelsCatHomeTest.reverseLeft : 'None';
    };
    DebriefCardComponent.prototype.getEco = function () {
        return [
            {
                label: ViewTestResultLabels.control,
                checked: get(this.data, 'eco.adviceGivenControl', false),
            },
            {
                label: ViewTestResultLabels.planning,
                checked: get(this.data, 'eco.adviceGivenPlanning', false),
            },
        ];
    };
    DebriefCardComponent.prototype.controlledStop = function () {
        var isControlledStopSelected = get(this.data, 'controlledStop.selected', false);
        return [
            {
                label: isControlledStopSelected ? 'Completed' : 'Not Completed',
                checked: isControlledStopSelected,
            },
        ];
    };
    DebriefCardComponent.prototype.getDrivingFaults = function () {
        return this.faultSummaryProvider.getDrivingFaultsList(this.data, this.category);
    };
    DebriefCardComponent.prototype.getSeriousFaults = function () {
        return this.faultSummaryProvider.getSeriousFaultsList(this.data, this.category);
    };
    DebriefCardComponent.prototype.getDangerousFaults = function () {
        return this.faultSummaryProvider.getDangerousFaultsList(this.data, this.category);
    };
    DebriefCardComponent.prototype.getDrivingFaultCount = function () {
        return this.faultCountProvider.getDrivingFaultSumCount(this.category, this.data);
    };
    DebriefCardComponent.prototype.getETA = function () {
        var eta = [];
        if (get(this.data, 'ETA.physical')) {
            eta.push('Physical');
        }
        if (get(this.data, 'ETA.verbal')) {
            eta.push('Verbal');
        }
        if (eta.length === 0) {
            eta.push('None');
        }
        return flattenArray(eta);
    };
    DebriefCardComponent.prototype.getShowMeQuestions = function () {
        return get(this.data, 'vehicleChecks.showMeQuestions', []);
    };
    DebriefCardComponent.prototype.getTellMeQuestions = function () {
        return get(this.data, 'vehicleChecks.tellMeQuestions', []);
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DebriefCardComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DebriefCardComponent.prototype, "category", void 0);
    DebriefCardComponent = __decorate([
        Component({
            selector: 'debrief-card',
            templateUrl: 'debrief-card.html',
        }),
        __metadata("design:paramtypes", [FaultSummaryProvider,
            FaultCountProvider])
    ], DebriefCardComponent);
    return DebriefCardComponent;
}());
export { DebriefCardComponent };
//# sourceMappingURL=debrief-card.js.map