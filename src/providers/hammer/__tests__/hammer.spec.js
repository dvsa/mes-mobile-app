var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TestBed } from '@angular/core/testing';
import { HammerProvider } from '../hammer';
import { Component } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
var MockComponent = /** @class */ (function () {
    function MockComponent() {
    }
    MockComponent = __decorate([
        Component({
            selector: 'mock-component',
            template: '<button>Test</button>',
        }),
        __metadata("design:paramtypes", [])
    ], MockComponent);
    return MockComponent;
}());
describe('HammerProvider', function () {
    var fixture;
    var hammerProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                MockComponent,
            ],
            providers: [
                HammerProvider,
            ],
        })
            .compileComponents()
            .then(function () {
            hammerProvider = TestBed.get(HammerProvider);
            fixture = TestBed.createComponent(MockComponent);
        });
    });
    describe('addPressAndHoldEvent', function () {
        it('should invoke the provided callback when "pressAndHold" is emitted', function () {
            var elementRef = fixture.elementRef;
            hammerProvider.init(elementRef);
            var postHoldCallback = jasmine.createSpy('someCallback');
            hammerProvider.addPressAndHoldEvent(postHoldCallback);
            hammerProvider.hammerManager.emit('pressAndHold', {});
            expect(postHoldCallback).toHaveBeenCalled();
        });
    });
    describe('addPressEvent', function () {
        it('should invoke the provided callback when "press" is emitted', function () {
            var elementRef = fixture.elementRef;
            hammerProvider.init(elementRef);
            var pressCallback = jasmine.createSpy('someCallback');
            hammerProvider.addPressEvent(pressCallback);
            hammerProvider.hammerManager.emit('press', {});
            expect(pressCallback).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=hammer.spec.js.map