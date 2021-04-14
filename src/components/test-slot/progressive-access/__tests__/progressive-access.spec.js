import { ProgressiveAccessComponent } from '../progressive-access';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('ProgressiveAccessComponent', function () {
    var component;
    var fixture;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [ProgressiveAccessComponent],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ProgressiveAccessComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        describe('Welsh language indicator description', function () {
            it('should render text when the language is Welsh', function () {
                component.progressiveAccess = true;
                fixture.detectChanges();
                var renderedText = fixture.debugElement.query(By.css('h6.language-description'))
                    .nativeElement;
                expect(renderedText.textContent).toBe('PROG');
            });
            it('should not render text when the language is not Welsh', function () {
                component.progressiveAccess = false;
                fixture.detectChanges();
                var renderedText = fixture.debugElement.queryAll(By.css('h6.language-description'));
                expect(renderedText.length).toBe(0);
            });
        });
    });
});
//# sourceMappingURL=progressive-access.spec.js.map