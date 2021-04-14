import { async, TestBed } from '@angular/core/testing';
import { LanguageComponent } from '../language';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';
describe('LanguageComponent', function () {
    var component;
    var fixture;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [LanguageComponent],
            imports: [IonicModule],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LanguageComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        describe('Welsh language image indicator', function () {
            it('should render an image when the language is Welsh', function () {
                component.welshLanguage = true;
                fixture.detectChanges();
                var renderedImage = fixture.debugElement.query(By.css('img'));
                expect(renderedImage.attributes.src).toContain('welsh-red-dragon-hi');
            });
            it('should not render an image when the language is not Welsh', function () {
                component.welshLanguage = false;
                fixture.detectChanges();
                var renderedImage = fixture.debugElement.queryAll(By.css('img'));
                expect(renderedImage.length).toBe(0);
            });
        });
        describe('Welsh language indicator description', function () {
            it('should render text when the language is Welsh', function () {
                component.welshLanguage = true;
                fixture.detectChanges();
                var renderedText = fixture.debugElement.query(By.css('h6.language-description'))
                    .nativeElement;
                expect(renderedText.textContent).toBe('Cymraeg');
            });
            it('should not render text when the language is not Welsh', function () {
                component.welshLanguage = false;
                fixture.detectChanges();
                var renderedText = fixture.debugElement.queryAll(By.css('h6.language-description'));
                expect(renderedText.length).toBe(0);
            });
        });
    });
});
//# sourceMappingURL=language.spec.js.map