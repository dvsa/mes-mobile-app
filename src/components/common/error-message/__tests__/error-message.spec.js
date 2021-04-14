import { async, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { ErrorMessageComponent, additionalText } from '../error-message';
import { ErrorTypes } from '../../../../shared/models/error-message';
describe('ErrorMessageComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [ErrorMessageComponent],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(ErrorMessageComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('ngOnInit', function () {
            it('should set the correct properties if the error is JOURNAL_REFRESH', function () {
                component.returnTo = ErrorTypes.JOURNAL_REFRESH;
                fixture.detectChanges();
                component.ngOnInit();
                expect(component.additionalText).toEqual(additionalText.JOURNAL);
                expect(component.redirectLinkText).toEqual(ErrorTypes.JOURNAL_REFRESH);
                expect(component.adviceToUsePaperTest).toEqual(false);
            });
            it('should set the correct properties if the error is JOURNAL_DATA_MISSING', function () {
                component.returnTo = ErrorTypes.JOURNAL_DATA_MISSING;
                fixture.detectChanges();
                component.ngOnInit();
                expect(component.additionalText).toEqual(additionalText.STANDARD_TEXT);
                expect(component.redirectLinkText).toEqual('Dashboard');
                expect(component.adviceToUsePaperTest).toEqual(true);
            });
            it('should set the correct properties if the error is something else', function () {
                component.returnTo = 'RandomPage';
                fixture.detectChanges();
                component.ngOnInit();
                expect(component.additionalText).toEqual(additionalText.STANDARD_TEXT);
                expect(component.redirectLinkText).toEqual('RandomPage');
                expect(component.adviceToUsePaperTest).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=error-message.spec.js.map