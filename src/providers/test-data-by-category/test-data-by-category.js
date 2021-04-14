var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { getTestData as getTestDataC } from '../../modules/tests/test-data/cat-c/test-data.cat-c.reducer';
import { getTestData as getTestDataC1 } from '../../modules/tests/test-data/cat-c/test-data.cat-c1.reducer';
import { getTestData as getTestDataCE } from '../../modules/tests/test-data/cat-c/test-data.cat-ce.reducer';
import { getTestData as getTestDataC1E } from '../../modules/tests/test-data/cat-c/test-data.cat-c1e.reducer';
import { getTestData as getTestDataCatBE } from '../../modules/tests/test-data/cat-be/test-data.cat-be.reducer';
import { getTestData as getTestDataCatD } from '../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';
import { getTestData as getTestDataCatD1 } from '../../modules/tests/test-data/cat-d/test-data.cat-d1.reducer';
import { getTestData as getTestDataCatDE } from '../../modules/tests/test-data/cat-d/test-data.cat-de.reducer';
import { getTestData as getTestDataCatD1E } from '../../modules/tests/test-data/cat-d/test-data.cat-d1e.reducer';
import { getTestData as getTestDataCatF } from '../../modules/tests/test-data/cat-home-test/test-data.cat-f.reducer';
import { getTestData as getTestDataCatG } from '../../modules/tests/test-data/cat-home-test/test-data.cat-g.reducer';
import { getTestData as getTestDataCatH } from '../../modules/tests/test-data/cat-home-test/test-data.cat-h.reducer';
import { getTestData as getTestDataCatK } from '../../modules/tests/test-data/cat-home-test/test-data.cat-k.reducer';
import { getTestData as getTestDataCatB } from '../../modules/tests/test-data/cat-b/test-data.reducer';
import { getTestData as getTestDataCatADI2, } from '../../modules/tests/test-data/cat-adi-part2/test-data.cat-adi-part2.reducer';
var TestDataByCategoryProvider = /** @class */ (function () {
    function TestDataByCategoryProvider() {
    }
    TestDataByCategoryProvider_1 = TestDataByCategoryProvider;
    TestDataByCategoryProvider.prototype.getTestDataByCategoryCode = function (category) {
        switch (category) {
            case "ADI2" /* ADI2 */: return getTestDataCatADI2;
            case "B" /* B */: return getTestDataCatB;
            case "B+E" /* BE */: return getTestDataCatBE;
            case "C" /* C */: return getTestDataC;
            case "C1" /* C1 */: return getTestDataC1;
            case "C+E" /* CE */: return getTestDataCE;
            case "C1+E" /* C1E */: return getTestDataC1E;
            case "D" /* D */: return getTestDataCatD;
            case "D1" /* D1 */: return getTestDataCatD1;
            case "D+E" /* DE */: return getTestDataCatDE;
            case "D1+E" /* D1E */: return getTestDataCatD1E;
            case "F" /* F */: return getTestDataCatF;
            case "G" /* G */: return getTestDataCatG;
            case "H" /* H */: return getTestDataCatH;
            case "K" /* K */: return getTestDataCatK;
            default: throw new Error(TestDataByCategoryProvider_1.getTestDataByCategoryCodeErrMsg);
        }
    };
    TestDataByCategoryProvider.prototype.getTestDataByTestCategory = function (testCategory) {
        switch (testCategory) {
            case "ADI2" /* ADI2 */: return getTestDataCatADI2;
            case "B" /* B */: return getTestDataCatB;
            case "B+E" /* BE */: return getTestDataCatBE;
            case "C" /* C */: return getTestDataC;
            case "C1" /* C1 */: return getTestDataC1;
            case "C+E" /* CE */: return getTestDataCE;
            case "C1+E" /* C1E */: return getTestDataC1E;
            case "D" /* D */: return getTestDataCatD;
            case "D1" /* D1 */: return getTestDataCatD1;
            case "D+E" /* DE */: return getTestDataCatDE;
            case "D1+E" /* D1E */: return getTestDataCatD1E;
            case "F" /* F */: return getTestDataCatF;
            case "G" /* G */: return getTestDataCatG;
            case "H" /* H */: return getTestDataCatH;
            case "K" /* K */: return getTestDataCatK;
            default: throw new Error(TestDataByCategoryProvider_1.getTestDataByCategoryCodeErrMsg);
        }
    };
    var TestDataByCategoryProvider_1;
    TestDataByCategoryProvider.getTestDataByCategoryCodeErrMsg = 'Error getting test category';
    TestDataByCategoryProvider = TestDataByCategoryProvider_1 = __decorate([
        Injectable()
    ], TestDataByCategoryProvider);
    return TestDataByCategoryProvider;
}());
export { TestDataByCategoryProvider };
//# sourceMappingURL=test-data-by-category.js.map