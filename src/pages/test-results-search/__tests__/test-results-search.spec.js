import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ModalControllerMock, ViewControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { TestResultsSearchPage } from '../test-results-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { TestResultsSearchComponentsModule } from '../components/test-results-search-components.module';
import { SearchProvider } from '../../../providers/search/search';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { By } from '@angular/platform-browser';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { ExaminerRole } from '../../../providers/app-config/constants/examiner-role.constants';
import { App } from '../../../app/app.component';
import { MockAppComponent } from '../../../app/__mocks__/app.component.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { configureTestSuite } from 'ng-bullet';
describe('TestResultsSearchPage', function () {
    var fixture;
    var component;
    var modalController;
    var appConfigProviderMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TestResultsSearchPage,
            ],
            imports: [
                IonicModule,
                AppModule,
                TestResultsSearchComponentsModule,
                ComponentsModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: ViewController, useFactory: function () { return ViewControllerMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: SearchProvider, useClass: SearchProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: App, useClass: MockAppComponent },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(TestResultsSearchPage);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
        appConfigProviderMock = TestBed.get(AppConfigProvider);
    }));
    describe('DOM', function () {
        describe('advanced search', function () {
            describe('when the user is an LDTM', function () {
                beforeEach(function () {
                    spyOn(appConfigProviderMock, 'getAppConfig').and.returnValue({
                        role: ExaminerRole.LDTM,
                    });
                    fixture.detectChanges();
                });
                it('displays the advanced search', function () {
                    expect(fixture.debugElement.query(By.css('#tab-search-advanced'))).not.toBeNull();
                });
            });
            describe('when the user is a DE', function () {
                beforeEach(function () {
                    spyOn(appConfigProviderMock, 'getAppConfig').and.returnValue({
                        role: ExaminerRole.DE,
                    });
                    fixture.detectChanges();
                });
                it('only displays the candidate search', function () {
                    expect(fixture.debugElement.query(By.css('#tab-search-candidate-details'))).not.toBeNull();
                    expect(fixture.debugElement.query(By.css('#tab-search-advanced'))).toBeNull();
                });
            });
        });
        describe('search submitted', function () {
            it('should display a modal on error', function () {
                component.showError({ status: 500, statusText: 'error', message: 'error' });
                expect(modalController.create).toHaveBeenCalled();
            });
        });
    });
});
//# sourceMappingURL=test-results-search.spec.js.map