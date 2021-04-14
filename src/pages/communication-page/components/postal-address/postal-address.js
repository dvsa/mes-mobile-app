var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
var PostalAddressComponent = /** @class */ (function () {
    function PostalAddressComponent() {
        this.postalType = 'Post';
        this.postalRadioSelect = new EventEmitter();
    }
    PostalAddressComponent.prototype.postalRadioSelected = function () {
        this.postalRadioSelect.emit();
    };
    PostalAddressComponent.prototype.ngOnInit = function () {
        this.postalAddress = this.formatAddress(this.postalAddress);
    };
    PostalAddressComponent.prototype.formatAddress = function (address) {
        var regex = new RegExp('[0-9]', 'g');
        var formattedAddress = Object.assign({}, address);
        Object.keys(formattedAddress).forEach(function (res) { return formattedAddress[res] = formattedAddress[res].replace(regex, 'x'); });
        return formattedAddress;
    };
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], PostalAddressComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PostalAddressComponent.prototype, "postalAddress", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PostalAddressComponent.prototype, "isPostalAddressChosen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PostalAddressComponent.prototype, "postalRadioSelect", void 0);
    PostalAddressComponent = __decorate([
        Component({
            selector: 'postal-address',
            templateUrl: 'postal-address.html',
        })
    ], PostalAddressComponent);
    return PostalAddressComponent;
}());
export { PostalAddressComponent };
//# sourceMappingURL=postal-address.js.map