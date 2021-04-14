import { async, TestBed } from '@angular/core/testing';
import { TimeComponent } from '../time';
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
            declarations: [TimeComponent],
            imports: [IonicModule],
            providers: [
                { provide: LogHelper, useClass: LogHelperMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TimeComponent);
        component = fixture.componentInstance;
        component.time = '2018-12-10T10:04:00+00:00';
        component.testComplete = true;
    }));
    describe('DOM', function () {
        var componentEl;
        beforeEach(function () {
            componentEl = fixture.debugElement;
        });
        describe('Time output ', function () {
            it('should be displayed', function () {
                var timeSpan = componentEl.query(By.css('h2'))
                    .nativeElement;
                fixture.detectChanges();
                expect(timeSpan.textContent).toBe('10:04');
            });
        });
        describe('class if test complete ', function () {
            it('should be time-test-complete-text', function () {
                fixture.detectChanges();
                var timeSpan = componentEl.query(By.css('h2'));
                expect(timeSpan.classes['time-test-complete-text']).not.toBeNull();
            });
        });
    });
});
//# sourceMappingURL=time.spec.js.map