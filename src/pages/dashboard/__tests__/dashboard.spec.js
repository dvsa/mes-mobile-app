import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { App } from '../../../app/app.component';
import { async, TestBed } from '@angular/core/testing';
import { Config, Platform, LoadingController, ToastController, IonicModule, NavController, NavParams, } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, LoadingControllerMock, ToastControllerMock, } from 'ionic-mocks';
import { DashboardComponentsModule } from './../components/dashboard-components.module';
import { AppModule } from '../../../app/app.module';
import { DashboardPage } from '../dashboard';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import { SlotProvider } from '../../../providers/slot/slot';
import { configureTestSuite } from 'ng-bullet';
import { CompletedTestPersistenceProvider } from '../../../providers/completed-test-persistence/completed-test-persistence';
import { CompletedTestPersistenceProviderMock } from '../../../providers/completed-test-persistence/__mocks__/completed-test-persistence.mock';
describe('DashboardPage', function () {
    var fixture;
    var component;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [DashboardPage],
            imports: [
                DashboardComponentsModule,
                ComponentsModule,
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    journal: journalReducer,
                    tests: testsReducer,
                }),
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: LoadingController, useFactory: function () { return LoadingControllerMock.instance(); } },
                { provide: ToastController, useFactory: function () { return ToastControllerMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: App, useClass: MockAppComponent },
                { provide: SlotProvider, useClass: SlotProvider },
                { provide: CompletedTestPersistenceProvider, useClass: CompletedTestPersistenceProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(DashboardPage);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('DOM', function () {
        describe('test report practice mode', function () {
            it('should show test report practice mode banner when config is set to true', function () {
                component.showTestReportPracticeMode =
                    jasmine.createSpy('showTestReportPracticeMode').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#testReportPracticeMode'))).not.toBeNull();
            });
            it('should not show test report practice mode banner when config is set to false', function () {
                component.showTestReportPracticeMode =
                    jasmine.createSpy('showTestReportPracticeMode').and.returnValue(false);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#testReportPracticeMode'))).toBeNull();
            });
            it('should not show test report practice mode banner when showDelegatedExaminerRekey returns true', function () {
                spyOn(component, 'showDelegatedExaminerRekey').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('practice-test-report-card'))).toBeNull();
            });
        });
        describe('end to end practice mode', function () {
            it('should show the end to end practice mode banner when config is set to true', function () {
                component.showEndToEndPracticeMode =
                    jasmine.createSpy('showEndToEndPracticeMode').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#endToendPracticeMode'))).not.toBeNull();
            });
            it('should not show the end to end practice mode banner when config is set to false', function () {
                component.showEndToEndPracticeMode =
                    jasmine.createSpy('showEndToEndPracticeMode').and.returnValue(false);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#endToendPracticeMode'))).toBeNull();
            });
            it('should not show the end to end practice mode banner when showDelegatedExaminerRekey returns true', function () {
                spyOn(component, 'showDelegatedExaminerRekey').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('practice-end-to-end-card'))).toBeNull();
            });
        });
        describe('goToJournalCard', function () {
            it('should not show journal card when showDelegatedExaminerRekey returns true', function () {
                spyOn(component, 'showDelegatedExaminerRekey').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('go-to-journal-card'))).toBeNull();
            });
            it('should show the journal card when showDelegatedExaminerRekey returns false', function () {
                spyOn(component, 'showDelegatedExaminerRekey').and.returnValue(false);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('go-to-journal-card'))).not.toBeNull();
            });
        });
        describe('delegatedExaminerRekey', function () {
            it('should show the delegated examiner rekey card when showDelegatedExaminerRekey returns true', function () {
                spyOn(component, 'showDelegatedExaminerRekey').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('delegated-examiner-rekey'))).not.toBeNull();
            });
        });
        describe('rekeySearchCard', function () {
            it('should hide the rekey search card when showDelegatedExaminerRekey returns true', function () {
                spyOn(component, 'showDelegatedExaminerRekey').and.returnValue(true);
                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('rekey-search-card'))).toBeNull();
            });
        });
    });
});
//# sourceMappingURL=dashboard.spec.js.map