var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { InputRestrictionUppercaseAlphanumDirective } from '../input-restriction-uppercasealphanum.directive';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
var TestAlphaNumComponent = /** @class */ (function () {
    function TestAlphaNumComponent() {
    }
    TestAlphaNumComponent = __decorate([
        Component({
            template: "<input type=\"text\" uppercaseAlphanumOnly>",
        })
    ], TestAlphaNumComponent);
    return TestAlphaNumComponent;
}());
describe('Directive: InputRestrictionUppercaseAlphanumDirective', function () {
    var fixture;
    var inputElement;
    beforeEach(function () {
        TestBed.configureTestingModule({
            declarations: [
                TestAlphaNumComponent,
                InputRestrictionUppercaseAlphanumDirective,
            ],
        });
        fixture = TestBed.createComponent(TestAlphaNumComponent);
    });
    it('should upper case input and remove spaces and non alpha numeric chars', function () {
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.css('input'));
        inputElement.nativeElement.value = '_aBc!@ £$%^&123)(*&^%$£@   []{}`~';
        inputElement.nativeElement.dispatchEvent(new Event('input'));
        expect(inputElement.nativeElement.value).toEqual('ABC123');
    });
});
//# sourceMappingURL=input-restriction-uppercasealphanum.directive.spec.js.map