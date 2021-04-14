var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../modules/tests/test-data/test-data.constants';
import { Component, Input } from '@angular/core';
var ReverseLeftPopoverComponent = /** @class */ (function () {
    function ReverseLeftPopoverComponent() {
        var _this = this;
        this.manoeuvreTypes = ManoeuvreTypes;
        this.competencies = ManoeuvreCompetencies;
        this.getId = function (competency) { return ManoeuvreTypes.reverseLeft + "-" + competency; };
        this.shouldShowReverseDiagramLink = function () {
            return _this.testCategory !== "F" /* F */ &&
                _this.testCategory !== "G" /* G */ &&
                _this.testCategory !== "H" /* H */ &&
                _this.testCategory !== "K" /* K */;
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReverseLeftPopoverComponent.prototype, "testCategory", void 0);
    ReverseLeftPopoverComponent = __decorate([
        Component({
            selector: 'reverse-left-popover',
            templateUrl: 'reverse-left-popover.html',
        }),
        __metadata("design:paramtypes", [])
    ], ReverseLeftPopoverComponent);
    return ReverseLeftPopoverComponent;
}());
export { ReverseLeftPopoverComponent };
//# sourceMappingURL=reverse-left-popover.js.map