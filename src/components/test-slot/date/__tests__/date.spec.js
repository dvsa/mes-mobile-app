import { async, TestBed } from '@angular/core/testing';
import { DateComponent } from '../date';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';
import { LogHelper } from '../../../../providers/logs/logsHelper';
import { LogHelperMock } from '../../../../providers/logs/__mocks__/logsHelper.mock';
import { configureTestSuite } from 'ng-bullet';
describe('TimeComponent', function () {
    var component;
    var fixture;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [DateComponent],
            imports: [IonicModule],
            providers: [
                { provide: LogHelper, useClass: LogHelperMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DateComponent);
        component = fixture.componentInstance;
        component.date = '2018-12-31T10:04:00+00:00';
    }));
    describe('DOM', function () {
        var componentEl;
        beforeEach(function () {
            componentEl = fixture.debugElement;
        });
        describe('Date output ', function () {
            it('should be displayed', function () {
                var dateSpan = componentEl.query(By.css('p'))
                    .nativeElement;
                fixture.detectChanges();
                expect(dateSpan.textContent).toBe('31/12/2018');
            });
        });
    });
});
//# sourceMappingURL=date.spec.js.map