import { async, TestBed } from '@angular/core/testing';
import { JournalNavigationComponent } from '../journal-navigation';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../../../../../modules/journal/journal.reducer';
import { LoadJournalSuccess, SetSelectedDate } from '../../../../../modules/journal/journal.actions';
import journalSlotsDataMock from '../__mocks__/journal-slots-data.mock';
import { By } from '@angular/platform-browser';
import { DateTime, Duration } from '../../../../../shared/helpers/date-time';
import { ConnectionStatus } from '../../../../../providers/network-state/network-state';
import { AppConfigProvider } from '../../../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../../../providers/app-config/__mocks__/app-config.mock';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { configureTestSuite } from 'ng-bullet';
describe('JournalNavigationComponent', function () {
    var fixture;
    var store$;
    var dateTimeProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [JournalNavigationComponent],
            imports: [
                IonicModule,
                StoreModule.forRoot({
                    journal: journalReducer,
                }),
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(JournalNavigationComponent);
        store$ = TestBed.get(Store);
        dateTimeProvider = TestBed.get(DateTimeProvider);
    }));
    describe('DOM', function () {
        var componentEl;
        beforeEach(function () {
            componentEl = fixture.debugElement;
            store$.dispatch(new LoadJournalSuccess({ examiner: { staffNumber: '123', individualId: 456 }, slotItemsByDate: journalSlotsDataMock }, ConnectionStatus.ONLINE, false, new Date()));
            store$.dispatch(new SetSelectedDate(dateTimeProvider.now().format('YYYY-MM-DD')));
        });
        describe('selected date is today', function () {
            it('does show previous day button', function () {
                fixture.detectChanges();
                var previousDayContainer = componentEl.query(By.css('#previous-day-container'));
                expect(previousDayContainer).not.toBeNull();
            });
            it('shows Today as header', function () {
                fixture.detectChanges();
                var mainHeader = componentEl.query(By.css('h1')).nativeElement;
                expect(mainHeader.textContent).toBe('Today');
            });
            it('shows correct date format as sub header', function () {
                fixture.detectChanges();
                var subHeader = componentEl.query(By.css('h3')).nativeElement;
                expect(subHeader.textContent).toBe(dateTimeProvider.now().format('dddd D MMMM YYYY'));
            });
            it('shows next day button', function () {
                fixture.detectChanges();
                var nextDayContainer = componentEl.query(By.css('#next-day-container'));
                expect(nextDayContainer).not.toBeNull();
            });
        });
        describe('selected date is day in the middle', function () {
            var nextDay;
            beforeEach(function () {
                nextDay = dateTimeProvider.now().add(1, Duration.DAY).format('YYYY-MM-DD');
                store$.dispatch(new SetSelectedDate(nextDay));
            });
            it('shows previous day button', function () {
                fixture.detectChanges();
                var previousDayContainer = componentEl.query(By.css('#previous-day-container'));
                expect(previousDayContainer).not.toBeNull();
            });
            it('shows day of the week as header', function () {
                fixture.detectChanges();
                var mainHeader = componentEl.query(By.css('h1')).nativeElement;
                expect(mainHeader.textContent).toBe(DateTime.at(nextDay).format('dddd'));
            });
            it('shows correct date format as sub header', function () {
                fixture.detectChanges();
                var subHeader = componentEl.query(By.css('h3')).nativeElement;
                expect(subHeader.textContent).toBe(DateTime.at(nextDay).format('D MMMM YYYY'));
            });
            it('shows next day button', function () {
                fixture.detectChanges();
                var nextDayContainer = componentEl.query(By.css('#next-day-container'));
                expect(nextDayContainer).not.toBeNull();
            });
        });
        describe('selected date is the last available date', function () {
            var selectedDay;
            beforeEach(function () {
                selectedDay = DateTime.at(DateTime.today()).add(7, Duration.DAY).format('YYYY-MM-DD');
                store$.dispatch(new SetSelectedDate(selectedDay));
            });
            it('shows previous day button', function () {
                fixture.detectChanges();
                var previousDayContainer = componentEl.query(By.css('#previous-day-container'));
                expect(previousDayContainer).not.toBeNull();
            });
            it('shows day of the week as header', function () {
                fixture.detectChanges();
                var mainHeader = componentEl.query(By.css('h1')).nativeElement;
                expect(mainHeader.textContent).toBe(DateTime.at(selectedDay).format('dddd'));
            });
            it('shows correct date format as sub header', function () {
                fixture.detectChanges();
                var subHeader = componentEl.query(By.css('h3')).nativeElement;
                expect(subHeader.textContent).toBe(DateTime.at(selectedDay).format('D MMMM YYYY'));
            });
            it('does not shows next day button', function () {
                fixture.detectChanges();
                var nextDayContainer = componentEl.query(By.css('#next-day-container'));
                expect(nextDayContainer).toBeNull();
            });
        });
    });
});
//# sourceMappingURL=journal-navigation.spec.js.map