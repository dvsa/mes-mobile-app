import { LicenceProvidedWarningBannerComponent } from '../licence-provided-warning-banner';
import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { WarningBannerComponent } from '../../../../../components/common/warning-banner/warning-banner';
describe('LicenceProvidedWarningBannerComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                LicenceProvidedWarningBannerComponent,
                WarningBannerComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                LicenceProvidedWarningBannerComponent,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LicenceProvidedWarningBannerComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should display correct message when licence provided', function () {
            component.licenceProvided = true;
            fixture.detectChanges();
            var rendered = fixture.debugElement.query(By.css('span#warning_text')).nativeElement.innerHTML;
            expect(rendered).toBe(component.yesText);
        });
        it('should display correct message when licence NOT provided', function () {
            component.licenceProvided = false;
            fixture.detectChanges();
            var rendered = fixture.debugElement.query(By.css('span#warning_text')).nativeElement.innerHTML;
            expect(rendered).toBe(component.noText);
        });
    });
});
//# sourceMappingURL=licence-provided-warning-banner.spec.js.map