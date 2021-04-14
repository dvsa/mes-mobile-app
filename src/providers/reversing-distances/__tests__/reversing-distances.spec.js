var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ReversingDistancesProvider } from '../reversing-distances';
import { TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
describe('ReversingDistancesProvider', function () {
    var reversingDistancesProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                ReversingDistancesProvider,
            ],
        });
    });
    beforeEach(function () {
        reversingDistancesProvider = TestBed.get(ReversingDistancesProvider);
    });
    describe('getDistanceLength', function () {
        var vehicleDetails = {
            vehicleLength: 15,
            vehicleWidth: 2,
        };
        var vehicleDetailsDecimal = {
            vehicleLength: 15.55,
            vehicleWidth: 2,
        };
        var longVehicleDetails = {
            vehicleLength: 20,
            vehicleWidth: 2,
        };
        var longVehicleDetailsDecimal = {
            vehicleLength: 16.75,
            vehicleWidth: 2,
        };
        // CAT C
        describe('Category C', function () {
            it('should return a start value 3 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C" /* C */);
                expect(result.startDistance).toEqual(52.5);
            });
            it('should return a start value 3 and a half times vehicle length if > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "C" /* C */);
                expect(result.startDistance).toEqual(70);
            });
            it('should return a start value 3 and a half times vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "C" /* C */);
                expect(result.startDistance).toEqual(58.63);
            });
            it('should return a middle value 1 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C" /* C */);
                expect(result.middleDistance).toEqual(22.5);
            });
            it('should return a middle value 1 and a half times the vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "C" /* C */);
                expect(result.middleDistance).toEqual(23.33);
            });
        });
        describe('Category C+E', function () {
            it('should return a start value 4 times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C+E" /* CE */);
                expect(result.startDistance).toEqual(60);
            });
            it('should return a start value of 66 if the vehicle length > than 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "C+E" /* CE */);
                expect(result.startDistance).toEqual(66);
            });
            it('should return the correct middle value if the vehicle length is > 16.5', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "C+E" /* CE */);
                expect(result.middleDistance).toEqual(26);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "C+E" /* CE */);
                expect(result.middleDistance).toEqual(32.5);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(__assign(__assign({}, longVehicleDetailsDecimal), { vehicleLength: 17.25 }), "C+E" /* CE */);
                expect(result.middleDistance).toEqual(31.5);
            });
            it('should return the correct middle value if the vehicle length is < 16.5', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C+E" /* CE */);
                expect(result.middleDistance).toEqual(30);
            });
            it('should return the correct middle value for vehicles < 16.5 with decimal places ', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "C+E" /* CE */);
                expect(result.middleDistance).toEqual(31.1);
            });
        });
        describe('Category C1', function () {
            it('should return a start value 3 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C1" /* C1 */);
                expect(result.startDistance).toEqual(52.5);
            });
            it('should return a start value 3 and a half times vehicle length if > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "C1" /* C1 */);
                expect(result.startDistance).toEqual(70);
            });
            it('should return a start value 3 and a half times vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "C1" /* C1 */);
                expect(result.startDistance).toEqual(58.63);
            });
            it('should return a middle value 1 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C1" /* C1 */);
                expect(result.middleDistance).toEqual(22.5);
            });
            it('should return a middle value 1 and a half times the vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "C" /* C */);
                expect(result.middleDistance).toEqual(23.33);
            });
        });
        describe('Category C1+E', function () {
            it('should return a start value 4 times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C1+E" /* C1E */);
                expect(result.startDistance).toEqual(60);
            });
            it('should return a start value of 66 if the vehicle length is > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "C1+E" /* C1E */);
                expect(result.startDistance).toEqual(66);
            });
            it('should return the correct middle value if the vehicle length is > 16.5', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "C1+E" /* C1E */);
                expect(result.middleDistance).toEqual(26);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "C1+E" /* C1E */);
                expect(result.middleDistance).toEqual(32.5);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(__assign(__assign({}, longVehicleDetailsDecimal), { vehicleLength: 18.25 }), "C1+E" /* C1E */);
                expect(result.middleDistance).toEqual(29.5);
            });
            it('should return the correct middle distance if the vehicle length is < 16.5', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "C1+E" /* C1E */);
                expect(result.middleDistance).toEqual(30);
            });
            it('should return the correct middle value for vehicles < 16.5 with decimal places ', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "C1+E" /* C1E */);
                expect(result.middleDistance).toEqual(31.1);
            });
        });
        // CAT D
        describe('Category D', function () {
            it('should return a start value 3 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D" /* D */);
                expect(result.startDistance).toEqual(52.5);
            });
            it('should return a start value 3 and a half times vehicle length if > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "D" /* D */);
                expect(result.startDistance).toEqual(70);
            });
            it('should return a start value 3 and a half times vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "D" /* D */);
                expect(result.startDistance).toEqual(58.63);
            });
            it('should return a middle value 1 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D" /* D */);
                expect(result.middleDistance).toEqual(22.5);
            });
            it('should return a middle value 1 and a half times the vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "D" /* D */);
                expect(result.middleDistance).toEqual(23.33);
            });
        });
        describe('Category D+E', function () {
            it('should return a start value 4 times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D+E" /* DE */);
                expect(result.startDistance).toEqual(60);
            });
            it('should return a start value of 66 if the vehicle length is > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "D+E" /* DE */);
                expect(result.startDistance).toEqual(66);
            });
            it('should return the correct middle distance if the vehicle length is > 16.5', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "D+E" /* DE */);
                expect(result.middleDistance).toEqual(26);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "D+E" /* DE */);
                expect(result.middleDistance).toEqual(32.5);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(__assign(__assign({}, longVehicleDetailsDecimal), { vehicleLength: 17.25 }), "D+E" /* DE */);
                expect(result.middleDistance).toEqual(31.5);
            });
            it('should return the correct middle distance if the vehicle length is < 16.5', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D+E" /* DE */);
                expect(result.middleDistance).toEqual(30);
            });
            it('should return the correct middle value for vehicles < 16.5 with decimal places ', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "D+E" /* DE */);
                expect(result.middleDistance).toEqual(31.1);
            });
        });
        describe('Category D1', function () {
            it('should return a start value 3 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D1" /* D1 */);
                expect(result.startDistance).toEqual(52.5);
            });
            it('should return a start value 3 and a half times vehicle length if > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "D1" /* D1 */);
                expect(result.startDistance).toEqual(70);
            });
            it('should return a start value 3 and a half times vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "D1" /* D1 */);
                expect(result.startDistance).toEqual(58.63);
            });
            it('should return a middle value 1 and a half times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D1" /* D1 */);
                expect(result.middleDistance).toEqual(22.5);
            });
            it('should return a middle value 1 and a half times the vehicle length to 2 fixed decimal places', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "D1" /* D1 */);
                expect(result.middleDistance).toEqual(23.33);
            });
        });
        describe('Category D1+E', function () {
            it('should return a start value 4 times the vehicle length', function () {
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D1+E" /* D1E */);
                expect(result.startDistance).toEqual(60);
            });
            it('should return a start value of 66 if the vehicle length is > 16.5', function () {
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "D1+E" /* D1E */);
                expect(result.startDistance).toEqual(66);
            });
            it('should return the correct middle distance if the vehicle length is > 16.5', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetails, "D1+E" /* D1E */);
                expect(result.middleDistance).toEqual(26);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(longVehicleDetailsDecimal, "D1+E" /* D1E */);
                expect(result.middleDistance).toEqual(32.5);
            });
            it('should return the correct middle value for vehicles > 16.5 with decimal places', function () {
                // Calculation: 66 - 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(__assign(__assign({}, longVehicleDetailsDecimal), { vehicleLength: 18.25 }), "C1+E" /* C1E */);
                expect(result.middleDistance).toEqual(29.5);
            });
            it('should return the correct middle distance if the vehicle length is < 16.5', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetails, "D1+E" /* D1E */);
                expect(result.middleDistance).toEqual(30);
            });
            it('should return the correct middle value for vehicles < 16.5 with decimal places ', function () {
                // Calculation: 2 x vehicle length
                var result = reversingDistancesProvider.getDistanceLength(vehicleDetailsDecimal, "D1+E" /* D1E */);
                expect(result.middleDistance).toEqual(31.1);
            });
        });
    });
    describe('getDistanceWidth', function () {
        var vehicleDetails = {
            vehicleLength: 15,
            vehicleWidth: 2,
        };
        // CAT C
        describe('Category C', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "C" /* C */);
                expect(result).toEqual(3);
            });
        });
        describe('Category C+E', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "C+E" /* CE */);
                expect(result).toEqual(3);
            });
        });
        describe('Category C1', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "C1" /* C1 */);
                expect(result).toEqual(3);
            });
        });
        describe('Category C1+E', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "C1+E" /* C1E */);
                expect(result).toEqual(3);
            });
        });
        // CAT D
        describe('Category D', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "D" /* D */);
                expect(result).toEqual(3);
            });
        });
        describe('Category D+E', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "D+E" /* DE */);
                expect(result).toEqual(3);
            });
        });
        describe('Category D1', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "D1" /* D1 */);
                expect(result).toEqual(3);
            });
        });
        describe('Category D1+E', function () {
            it('should return a value 1 and a half times the vehicle width', function () {
                var result = reversingDistancesProvider.getDistanceWidth(vehicleDetails, "D1+E" /* D1E */);
                expect(result).toEqual(3);
            });
        });
    });
});
//# sourceMappingURL=reversing-distances.spec.js.map