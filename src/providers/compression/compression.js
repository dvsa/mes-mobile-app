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
import { gunzipSync } from 'zlib';
var CompressionProvider = /** @class */ (function () {
    function CompressionProvider() {
    }
    CompressionProvider.prototype.extractTestResult = function (compressedData) {
        var gzippedBytes = Buffer.from(compressedData, 'base64');
        var unzippedJson = gunzipSync(gzippedBytes).toString();
        return JSON.parse(unzippedJson);
    };
    CompressionProvider.prototype.extractTestSlotResult = function (compressedData) {
        var gzippedBytes = Buffer.from(compressedData, 'base64');
        var unzippedJson = gunzipSync(gzippedBytes).toString();
        return JSON.parse(unzippedJson);
    };
    CompressionProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], CompressionProvider);
    return CompressionProvider;
}());
export { CompressionProvider };
//# sourceMappingURL=compression.js.map