import { async, TestBed } from '@angular/core/testing';
import { CompetencyButtonComponent } from '../competency-button';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
describe('CompetencyButtonComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                CompetencyButtonComponent,
            ],
            imports: [
                AppModule,
                IonicModule,
            ],
            providers: [
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(CompetencyButtonComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('onTapEvent', function () {
            it('should not call onTap if disabled is true', function () {
                component.disabled = true;
                component.onTap = function () { };
                spyOn(component, 'onTap');
                component.onTapEvent();
                expect(component.onTap).not.toHaveBeenCalled();
            });
        });
        describe('onPressEvent', function () {
            it('should not call onPress if disabled is true', function () {
                component.disabled = true;
                component.onPress = function () { };
                spyOn(component, 'onPress');
                component.onPressEvent();
                expect(component.onPress).not.toHaveBeenCalled();
            });
        });
        describe('onTouchStart', function () {
            it('should not set touchState to true if disabled is true', function () {
                component.disabled = true;
                component.onTouchStart();
                expect(component.touchState).toEqual(false);
            });
        });
        it('should call the tap function when a tap event is triggered', function () {
            var tapSpy = jasmine.createSpy('onTapEvent');
            component.onTapEvent = tapSpy;
            var button = fixture.debugElement.query(By.css('.competency-button'));
            button.triggerEventHandler('tap', null);
            expect(tapSpy).toHaveBeenCalled();
        });
        it('should call the press function when a press event is triggered', function () {
            var pressSpy = jasmine.createSpy('onPressEvent');
            component.onPressEvent = pressSpy;
            var button = fixture.debugElement.query(By.css('.competency-button'));
            button.triggerEventHandler('press', null);
            expect(pressSpy).toHaveBeenCalled();
        });
    });
    describe('DOM', function () {
        describe('Ripple effect', function () {
            it('should have added no classes to the competency button', function () {
                var competencyButton = fixture.debugElement.query(By.css('.competency-button'));
                expect(competencyButton.nativeElement.className).toEqual('competency-button');
            });
            it('should not add the activated class when the button is pressed if disabled is true', function () {
                component.disabled = true;
                component.onTouchStart();
                fixture.detectChanges();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                expect(button).toBeDefined();
                expect(button.nativeElement.className).not.toContain('activated');
                expect(component.touchState).toEqual(false);
            });
            it('should add the activated class when the button is pressed', function () {
                component.onTouchStart();
                fixture.detectChanges();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                expect(button).toBeDefined();
                expect(button.nativeElement.className).toContain('activated');
                expect(component.touchState).toEqual(true);
            });
            it('should remove the activated class after a specified delay when the button is not pressed', function (done) {
                component.onTouchEnd();
                fixture.detectChanges();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                setTimeout(function () {
                    fixture.detectChanges();
                    expect(button).toBeDefined();
                    expect(button.nativeElement.className).not.toContain('activated');
                    expect(component.touchState).toEqual(false);
                    done();
                }, component.touchStateDelay);
            });
            it('should add the ripple effect animation css class', function () {
                component.onPressEvent();
                fixture.detectChanges();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                expect(button).toBeDefined();
                expect(button.nativeElement.className).toContain('ripple-effect');
            });
            it('should not add the ripple effect animation if disabled is true', function () {
                component.disabled = true;
                component.onPressEvent();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                expect(button).toBeDefined();
                expect(button.nativeElement.className).not.toContain('ripple-effect');
            });
            it('should remove the ripple effect animation css class within the required time frame', function (done) {
                component.onPressEvent();
                fixture.detectChanges();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                setTimeout(function () {
                    fixture.detectChanges();
                    expect(button).toBeDefined();
                    expect(button.nativeElement.className).not.toContain('ripple-effect');
                    done();
                }, component.rippleEffectAnimationDuration);
            });
            it('should not add the ripple effect animation css class when ripple is disabled', function () {
                component.ripple = false;
                component.onPressEvent();
                fixture.detectChanges();
                var button = fixture.debugElement.query(By.css('.competency-button'));
                expect(button).toBeDefined();
                expect(button.nativeElement.className).not.toContain('ripple-effect');
            });
        });
    });
});
//# sourceMappingURL=competency-button.spec.js.map