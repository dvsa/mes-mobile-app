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
import { flattenArray } from '../../../view-test-result-helpers';
import { TestRequirementsLabels, ViewTestResultLabels, } from '../../../components/data-row-with-list/data-list-with-row.model';
var DebriefCardComponent = /** @class */ (function () {
    function DebriefCardComponent() {
        var _this = this;
        this.getFlattenArray = function (data) { return flattenArray(data); };
        this.showNoFaultsMessage = function () {
            return _this.data.drivingFaultCount === 0 &&
                _this.data.seriousFaults.length === 0 &&
                _this.data.dangerousFaults.length === 0;
        };
        this.getTestRequirements = function () {
            return [
                {
                    label: TestRequirementsLabels.normalStart1,
                    checked: _this.data.legalRequirements.normalStart1,
                },
                {
                    label: TestRequirementsLabels.normalStart2,
                    checked: _this.data.legalRequirements.normalStart2,
                },
                {
                    label: TestRequirementsLabels.angledStart,
                    checked: _this.data.legalRequirements.angledStart,
                },
                {
                    label: TestRequirementsLabels.hillStart,
                    checked: _this.data.legalRequirements.hillStart,
                },
            ];
        };
        this.getControlledStop = function () {
            return [
                {
                    label: _this.data.controlledStop ? ViewTestResultLabels.completed : ViewTestResultLabels.notCompleted,
                    checked: _this.data.controlledStop,
                },
            ];
        };
        this.getEco = function () {
            return [
                {
                    label: ViewTestResultLabels.control,
                    checked: _this.data.ecoControl,
                },
                {
                    label: ViewTestResultLabels.planning,
                    checked: _this.data.ecoPlanning,
                },
            ];
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DebriefCardComponent.prototype, "data", void 0);
    DebriefCardComponent = __decorate([
        Component({
            selector: 'debrief-card',
            templateUrl: 'debrief-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], DebriefCardComponent);
    return DebriefCardComponent;
}());
export { DebriefCardComponent };
//# sourceMappingURL=debrief-card.js.map