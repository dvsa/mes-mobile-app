import { async, TestBed } from '@angular/core/testing';
import { IndicatorsComponent } from '../indicators';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { configureTestSuite } from 'ng-bullet';
describe('IndicatorsComponent', function () {
    var component;
    var fixture;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [IndicatorsComponent],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(IndicatorsComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        describe('exclamation indicator', function () {
            it('should render when visibility is configured', function () {
                component.showExclamationIndicator = true;
                component.testStatus = TestStatus.Booked;
                fixture.detectChanges();
                var renderedImage = fixture.debugElement.query(By.css('.exclamation-indicator'));
                expect(renderedImage.attributes.src).toContain('exclamation');
            });
            it('should not be rendered when visibility is turned off', function () {
                component.showExclamationIndicator = false;
                component.testStatus = TestStatus.Booked;
                fixture.detectChanges();
                var renderedImages = fixture.debugElement.queryAll(By.css('.exclamation-indicator'));
                expect(renderedImages.length).toBe(0);
            });
            it('should not be rendered when test status is submitted', function () {
                component.showExclamationIndicator = false;
                component.testStatus = TestStatus.Submitted;
                fixture.detectChanges();
                var renderedImages = fixture.debugElement.queryAll(By.css('.exclamation-indicator'));
                expect(renderedImages.length).toBe(0);
            });
        });
        describe('green tick indicator', function () {
            it('should be rendered when test status is submitted', function () {
                component.showExclamationIndicator = false;
                component.testStatus = TestStatus.Submitted;
                fixture.detectChanges();
                var renderedImage = fixture.debugElement.query(By.css('.green-tick-indicator'));
                expect(renderedImage.attributes.src).toContain('tick');
            });
            it('should not rendered when test status is not submitted', function () {
                component.showExclamationIndicator = false;
                component.testStatus = TestStatus.Booked;
                fixture.detectChanges();
                var renderedImages = fixture.debugElement.queryAll(By.css('.green-tick-indicator'));
                expect(renderedImages.length).toBe(0);
            });
        });
    });
});
//# sourceMappingURL=indicators.spec.js.map