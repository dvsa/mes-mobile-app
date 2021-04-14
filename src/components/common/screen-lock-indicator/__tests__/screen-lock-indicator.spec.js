import { LockScreenIndicator } from '../lock-screen-indicator';
import { TestBed, async } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { translateServiceMock } from '../../../../shared/__mocks__/translate';
import { configureTestSuite } from 'ng-bullet';
describe('LockScreenIndicator', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                LockScreenIndicator,
            ],
            imports: [
                TranslateModule,
            ],
            providers: [
                { provide: TranslateService, useValue: translateServiceMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(LockScreenIndicator);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        // Unit tests for the components TypeScript class
        it('should create', function () {
            expect(component).toBeDefined();
        });
    });
});
//# sourceMappingURL=screen-lock-indicator.spec.js.map