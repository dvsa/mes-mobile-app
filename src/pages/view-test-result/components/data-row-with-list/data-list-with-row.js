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
var DataRowWithListComponent = /** @class */ (function () {
    function DataRowWithListComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DataRowWithListComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DataRowWithListComponent.prototype, "data", void 0);
    DataRowWithListComponent = __decorate([
        Component({
            selector: 'data-row-with-list',
            templateUrl: 'data-row-with-list.html',
        })
    ], DataRowWithListComponent);
    return DataRowWithListComponent;
}());
export { DataRowWithListComponent };
//# sourceMappingURL=data-list-with-row.js.map