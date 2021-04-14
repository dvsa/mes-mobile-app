import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { ConductedLanguageComponent } from '../conducted-language';
import { EventEmitter } from '@angular/core';
import { configureTestSuite } from 'ng-bullet';
describe('ConductedLanguageComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ConductedLanguageComponent,
            ],
            imports: [
                IonicModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ConductedLanguageComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('welshTextSelected', function () {
            it('should emit an event if welsh is selected ', function () {
                // ARRANGE
                component.welshTextSelect = new EventEmitter();
                spyOn(component.welshTextSelect, 'emit');
                component.welshIsSelected = false;
                component.englishIsSelected = true;
                // ACT
                component.welshTextSelected();
                fixture.detectChanges();
                // ASSERT
                expect(component.welshTextSelect.emit).toHaveBeenCalled();
                expect(component.welshIsSelected).toEqual(true);
                expect(component.englishIsSelected).toEqual(false);
            });
        });
        describe('englishTextSelected', function () {
            it('should emit an event if english is selected ', function () {
                // ARRANGE
                component.englishTextSelect = new EventEmitter();
                spyOn(component.englishTextSelect, 'emit');
                component.welshIsSelected = true;
                component.englishIsSelected = false;
                // ACT
                component.englishTextSelected();
                fixture.detectChanges();
                // ASSERT
                expect(component.englishTextSelect.emit).toHaveBeenCalled();
                expect(component.welshIsSelected).toEqual(false);
                expect(component.englishIsSelected).toEqual(true);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=conducted-language.spec.js.map