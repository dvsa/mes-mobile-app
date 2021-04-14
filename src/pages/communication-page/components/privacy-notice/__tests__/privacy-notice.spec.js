import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { PrivacyNoticeComponent } from '../privacy-notice';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '../../../../../shared/__mocks__/translate';
import { ConfigMock } from 'ionic-mocks';
import { configureTestSuite } from 'ng-bullet';
describe('PrivacyNoticeComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                PrivacyNoticeComponent,
            ],
            imports: [
                IonicModule,
                TranslateModule,
            ],
            providers: [
                { provide: TranslateService, useValue: translateServiceMock },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(PrivacyNoticeComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should compile', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=privacy-notice.spec.js.map