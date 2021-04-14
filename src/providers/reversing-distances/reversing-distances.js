var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
var ReversingDistancesProvider = /** @class */ (function () {
    function ReversingDistancesProvider() {
    }
    ReversingDistancesProvider.prototype.getDistanceValues = function () {
        if (!this.distanceValues) {
            this.distanceValues = new Map([
                ["B+E" /* BE */, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
                ["C" /* C */, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
                ["C+E" /* CE */, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
                ["C1" /* C1 */, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
                ["C1+E" /* C1E */, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
                ["D" /* D */, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
                ["D+E" /* DE */, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
                ["D1" /* D1 */, { lengthMultiplier: 3.5, widthMultiplier: 1.5, distanceMultiplier: 1.5 }],
                ["D1+E" /* D1E */, { lengthMultiplier: 4, widthMultiplier: 1.5, distanceMultiplier: 2 }],
            ]);
        }
        return this.distanceValues;
    };
    ReversingDistancesProvider.prototype.getDistanceLength = function (data, category) {
        if (!this.getDistanceValues().has(category)) {
            return { startDistance: 52.5, middleDistance: 30 };
        }
        var distanceFromStart = data.vehicleLength * this.distanceValues.get(category).lengthMultiplier;
        var distanceFromMiddle = data.vehicleLength * this.distanceValues.get(category).distanceMultiplier;
        switch (category) {
            case "C+E" /* CE */:
            case "C1+E" /* C1E */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */:
                return ({
                    startDistance: data.vehicleLength > 16.5 ? 66 : Number(distanceFromStart.toFixed(2)),
                    middleDistance: data.vehicleLength > 16.5
                        ? Number((66 - (data.vehicleLength * 2)).toFixed(2))
                        : Number(distanceFromMiddle.toFixed(2)),
                });
            default:
                return ({
                    startDistance: Number(distanceFromStart.toFixed(2)),
                    middleDistance: Number(distanceFromMiddle.toFixed(2)),
                });
        }
    };
    ReversingDistancesProvider.prototype.getDistanceWidth = function (data, category) {
        if (!this.getDistanceValues().has(category)) {
            return 3;
        }
        var distanceOfBayWidth = data.vehicleWidth * this.distanceValues.get(category).widthMultiplier;
        return Number(distanceOfBayWidth.toFixed(2));
    };
    ReversingDistancesProvider = __decorate([
        Injectable()
    ], ReversingDistancesProvider);
    return ReversingDistancesProvider;
}());
export { ReversingDistancesProvider };
//# sourceMappingURL=reversing-distances.js.map