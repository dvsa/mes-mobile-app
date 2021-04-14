import { TestBed } from '@angular/core/testing';
import { OutcomeBehaviourMapProvider } from '../outcome-behaviour-map';
import { configureTestSuite } from 'ng-bullet';
describe('OutcomeBehaviourMapProvider', function () {
    var _a, _b, _c, _d;
    var outcomeBehaviourMapProvider;
    var simpleBehaviourMap = (_a = {},
        _a['1'] = (_b = {},
            _b['routeNumber'] = { display: 'Y', defaultValue: null, showNotApplicable: false },
            _b['independentDriving'] = { display: 'Y', showNotApplicable: false },
            _b['showMeQuestion'] = { display: 'Y', defaultValue: '', showNotApplicable: false },
            _b['faultComment'] = { display: 'A', showNotApplicable: false },
            _b),
        _a['3'] = (_c = {},
            _c['routeNumber'] = { display: 'N', defaultValue: '1', showNotApplicable: false },
            _c['independentDriving'] = { display: 'N', showNotApplicable: false },
            _c['showMeQuestion'] = { display: 'N', showNotApplicable: false },
            _c['faultComment'] = { display: 'A', showNotApplicable: false },
            _c),
        _a['4'] = (_d = {},
            _d['routeNumber'] = { display: 'Y' },
            _d['independentDriving'] = { display: 'Y', showNotApplicable: true },
            _d['showMeQuestion'] = { display: 'Y', showNotApplicable: true },
            _d['faultComment'] = { display: 'A', showNotApplicable: false },
            _d),
        _a);
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                OutcomeBehaviourMapProvider,
            ],
        });
    });
    beforeEach(function () {
        outcomeBehaviourMapProvider = TestBed.get(OutcomeBehaviourMapProvider);
        outcomeBehaviourMapProvider.setBehaviourMap(simpleBehaviourMap);
    });
    describe('getVisibilityType', function () {
        it("should return Y for an outcome and field that has display Y", function () {
            var result = outcomeBehaviourMapProvider.getVisibilityType('1', 'routeNumber');
            expect(result).toBe('Y');
        });
        it("should return N for an outcome and field that has display N", function () {
            var result = outcomeBehaviourMapProvider.getVisibilityType('3', 'routeNumber');
            expect(result).toBe('N');
        });
        it("should return A for an outcome and field that has display A", function () {
            var result = outcomeBehaviourMapProvider.getVisibilityType('4', 'faultComment');
            expect(result).toBe('A');
        });
        it("should return N for a non-existant outcome", function () {
            var result = outcomeBehaviourMapProvider.getVisibilityType('40', 'faultComment');
            expect(result).toBe('N');
        });
        it("should return N for a non-existant field", function () {
            var result = outcomeBehaviourMapProvider.getVisibilityType('4', 'fakefield');
            expect(result).toBe('N');
        });
    });
    describe('isVisible', function () {
        it("should return true for an outcome and field that has display Y", function () {
            var result = outcomeBehaviourMapProvider.isVisible('1', 'routeNumber', 'x');
            expect(result).toEqual(true);
        });
        it("should return false for an outcome and field that has display N", function () {
            var result = outcomeBehaviourMapProvider.isVisible('3', 'routeNumber', 'x');
            expect(result).toEqual(false);
        });
        it("should return true for an outcome and field that has display A and has a value", function () {
            var result = outcomeBehaviourMapProvider.isVisible('4', 'faultComment', 'x');
            expect(result).toEqual(true);
        });
        it("should return false for an outcome and field that has display A and has no value", function () {
            var result = outcomeBehaviourMapProvider.isVisible('4', 'faultComment', null);
            expect(result).toEqual(false);
        });
        it("should return true for a non-existant outcome", function () {
            var result = outcomeBehaviourMapProvider.isVisible('40', 'faultComment', 'x');
            expect(result).toEqual(true);
        });
        it("should return false for a non-existant field", function () {
            var result = outcomeBehaviourMapProvider.isVisible('4', 'fakefield', 'x');
            expect(result).toEqual(false);
        });
    });
    describe('hasDefault', function () {
        it("should return false if defaultValue field is not present", function () {
            var result = outcomeBehaviourMapProvider.hasDefault('1', 'independentDriving');
            expect(result).toEqual(false);
        });
        it("should return false if defaultValue field is present but is null", function () {
            var result = outcomeBehaviourMapProvider.hasDefault('1', 'routeNumber');
            expect(result).toEqual(false);
        });
        it("should return false if defaultValue field is present but is empty string", function () {
            var result = outcomeBehaviourMapProvider.hasDefault('1', 'routeNumber');
            expect(result).toEqual(false);
        });
        it("should return true if defaultValue field is present and non null", function () {
            var result = outcomeBehaviourMapProvider.hasDefault('3', 'routeNumber');
            expect(result).toEqual(true);
        });
    });
    describe('getDefault', function () {
        it("should return null if defaultValue field is not present", function () {
            var result = outcomeBehaviourMapProvider.getDefault('1', 'independentDriving');
            expect(result).toBeNull();
        });
        it("should return null if defaultValue field is present but is null", function () {
            var result = outcomeBehaviourMapProvider.getDefault('1', 'routeNumber');
            expect(result).toBeNull();
        });
        it("should return null if defaultValue field is present but is empty string", function () {
            var result = outcomeBehaviourMapProvider.getDefault('1', 'routeNumber');
            expect(result).toBeNull();
        });
        it("should return value if defaultValue field is present and non null", function () {
            var result = outcomeBehaviourMapProvider.getDefault('3', 'routeNumber');
            expect(result).toBe('1');
        });
    });
    describe('showNotApplicable', function () {
        it("should return false if showNotApplicable is false", function () {
            var result = outcomeBehaviourMapProvider.showNotApplicable('1', 'independentDriving');
            expect(result).toEqual(false);
        });
        it("should return false if showNotApplicable field is missing", function () {
            var result = outcomeBehaviourMapProvider.showNotApplicable('1', 'routeNumber');
            expect(result).toEqual(false);
        });
        it("should return false if showNotApplicable field is true", function () {
            var result = outcomeBehaviourMapProvider.showNotApplicable('4', 'independentDriving');
            expect(result).toEqual(true);
        });
        it("should return false if called with non existant outcome", function () {
            var result = outcomeBehaviourMapProvider.showNotApplicable('x', 'routeNumber');
            expect(result).toEqual(false);
        });
        it("should return false if called with non existant field", function () {
            var result = outcomeBehaviourMapProvider.showNotApplicable('4', 'fakeroute');
            expect(result).toEqual(false);
        });
    });
});
//# sourceMappingURL=outcome-behaviour-map.spec.js.map