import { TestBed, async } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { WarningBannerComponent } from '../warning-banner';
import { configureTestSuite } from 'ng-bullet';
describe('WarningBanner', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [WarningBannerComponent],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(WarningBannerComponent);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should display the warning message', function () {
            var warningText = 'This is the warning text';
            component.warningText = warningText;
            fixture.detectChanges();
            var rendered = fixture.debugElement.query(By.css('span#warning_text')).nativeElement.innerHTML;
            expect(rendered).toBe(warningText);
        });
    });
});
//# sourceMappingURL=warning-banner.spec.js.map