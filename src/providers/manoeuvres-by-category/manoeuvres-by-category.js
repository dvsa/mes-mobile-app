var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { getManoeuvres as getManoeuvresC, } from '../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import { getManoeuvres as getManoeuvresD, } from '../../modules/tests/test-data/cat-d/test-data.cat-d.selector';
import { getManoeuvres as getManoeuvresHomeTest, } from '../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';
import { getManoeuvres as getManoeuvresBE } from '../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import { Injectable } from '@angular/core';
var ManoeuvresByCategoryProvider = /** @class */ (function () {
    function ManoeuvresByCategoryProvider() {
    }
    ManoeuvresByCategoryProvider_1 = ManoeuvresByCategoryProvider;
    ManoeuvresByCategoryProvider.prototype.getManoeuvresByCategoryCode = function (category) {
        switch (category) {
            case "B+E" /* BE */: return getManoeuvresBE;
            case "C" /* C */:
            case "C1" /* C1 */:
            case "C+E" /* CE */:
            case "C1+E" /* C1E */: return getManoeuvresC;
            case "D" /* D */:
            case "D1" /* D1 */:
            case "D+E" /* DE */:
            case "D1+E" /* D1E */: return getManoeuvresD;
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */: return getManoeuvresHomeTest;
            default: throw new Error(ManoeuvresByCategoryProvider_1.getManoeuvresByCategoryCodeErrMsg);
        }
    };
    var ManoeuvresByCategoryProvider_1;
    ManoeuvresByCategoryProvider.getManoeuvresByCategoryCodeErrMsg = 'Error getting test category manoeuvres';
    ManoeuvresByCategoryProvider = ManoeuvresByCategoryProvider_1 = __decorate([
        Injectable()
    ], ManoeuvresByCategoryProvider);
    return ManoeuvresByCategoryProvider;
}());
export { ManoeuvresByCategoryProvider };
//# sourceMappingURL=manoeuvres-by-category.js.map