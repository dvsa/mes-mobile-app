var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var supportedDevices = [
    'iPad7,4',
];
var DeviceProviderMock = /** @class */ (function () {
    function DeviceProviderMock() {
        var _this = this;
        this.validDeviceType = function () {
            var model = _this.getDeviceType();
            if (supportedDevices.findIndex(function (device) { return device === model; }) > -1) {
                return true;
            }
            return false;
        };
        this.getDeviceType = function () {
            return 'iPad7,4';
        };
        this.getUniqueDeviceId = function () {
            return 'A1234';
        };
        this.enableSingleAppMode = jasmine.createSpy('enableSingleAppMode').and.returnValue(Promise.resolve(true));
        this.disableSingleAppMode = jasmine.createSpy('disableSingleAppMode').and.returnValue(Promise.resolve(true));
    }
    DeviceProviderMock = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], DeviceProviderMock);
    return DeviceProviderMock;
}());
export { DeviceProviderMock };
//# sourceMappingURL=device.mock.js.map