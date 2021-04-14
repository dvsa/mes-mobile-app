import { TestBed, async } from '@angular/core/testing';
import { IncompleteTestsBanner } from '../incomplete-tests-banner';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { testsReducer } from '../../../../modules/tests/tests.reducer';
import { journalReducer } from '../../../../modules/journal/journal.reducer';
import { SlotProvider } from '../../../../providers/slot/slot';
import { AppConfigProvider } from '../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../providers/app-config/__mocks__/app-config.mock';
import { configureTestSuite } from 'ng-bullet';
describe('IncompleteTestsBanner', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [IncompleteTestsBanner],
            imports: [
                IonicModule,
                StoreModule.forRoot({
                    tests: testsReducer,
                    journal: journalReducer,
                }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: SlotProvider, useClass: SlotProvider },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(IncompleteTestsBanner);
        component = fixture.componentInstance;
    }));
    describe('DOM', function () {
        it('should display the number of incomplete tests', function () {
            fixture.detectChanges();
            component.componentState = { count$: of(1) };
            fixture.detectChanges();
            var rendered = fixture.debugElement.query(By.css('span')).nativeElement.innerHTML;
            expect(rendered).toBe('You have 1 incomplete test');
        });
        it('should display the number of incomplete tests as plural', function () {
            fixture.detectChanges();
            component.componentState = { count$: of(5) };
            fixture.detectChanges();
            var rendered = fixture.debugElement.query(By.css('span')).nativeElement.innerHTML;
            expect(rendered).toBe('You have 5 incomplete tests');
        });
        it('should not be visible when the fault count is 0', function () {
            fixture.detectChanges();
            component.componentState = { count$: of(0) };
            fixture.detectChanges();
            var rendered = fixture.debugElement.query(By.css('div'));
            expect(rendered).toBeNull();
        });
    });
});
//# sourceMappingURL=incomplete-tests-banner.spec.js.map