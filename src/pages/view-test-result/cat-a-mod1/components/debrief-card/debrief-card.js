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
import { FaultSummaryProvider } from '../../../../../providers/fault-summary/fault-summary';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
var DebriefCardComponent = /** @class */ (function () {
    function DebriefCardComponent(faultSummaryProvider, faultCountProvider) {
        this.faultSummaryProvider = faultSummaryProvider;
        this.faultCountProvider = faultCountProvider;
    }
    DebriefCardComponent.prototype.getDrivingFaults = function () {
        return this.faultSummaryProvider.getDrivingFaultsList(this.data, "EUAM1" /* EUAM1 */);
    };
    DebriefCardComponent.prototype.getSeriousFaults = function () {
        return this.faultSummaryProvider.getSeriousFaultsList(this.data, "EUAM1" /* EUAM1 */);
    };
    DebriefCardComponent.prototype.getDangerousFaults = function () {
        return this.faultSummaryProvider.getDangerousFaultsList(this.data, "EUAM1" /* EUAM1 */);
    };
    DebriefCardComponent.prototype.getDrivingFaultCount = function () {
        return this.faultCountProvider.getDrivingFaultSumCount("EUAM1" /* EUAM1 */, this.data);
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
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DebriefCardComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DebriefCardComponent.prototype, "testCategory", void 0);
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