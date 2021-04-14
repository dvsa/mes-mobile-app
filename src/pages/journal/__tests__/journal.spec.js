import { MockAppComponent } from './../../../app/__mocks__/app.component.mock';
import { App } from './../../../app/app.component';
import { async, TestBed } from '@angular/core/testing';
import { Config, Platform, LoadingController, ToastController, IonicModule, ModalController, NavController, NavParams, } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock, LoadingControllerMock, ModalControllerMock, ToastControllerMock, } from 'ionic-mocks';
import { JournalComponentsModule } from './../components/journal-components.module';
import { AppModule } from '../../../app/app.module';
import { JournalPage } from '../journal';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import { Subscription } from 'rxjs';
import { SlotSelectorProvider } from '../../../providers/slot-selector/slot-selector';
import { MockedJournalModule } from '../../../modules/journal/__mocks__/journal.module.mock';
import { UnloadJournal, LoadJournal, LoadJournalSuccess, SetupPolling, } from '../../../modules/journal/journal.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { ERROR_PAGE } from '../../page-names.constants';
import { ErrorTypes } from '../../../shared/models/error-message';
import journalSlotsDataMock from '../../../modules/journal/__mocks__/journal-slots-data.mock';
import { By } from '@angular/platform-browser';
import { ConnectionStatus } from '../../../providers/network-state/network-state';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { TestSlotComponentsModule } from '../../../components/test-slot/test-slot-components.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { ComponentsModule } from '../../../components/common/common-components.module';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { SlotProvider } from '../../../providers/slot/slot';
import { configureTestSuite } from 'ng-bullet';
import { CompletedTestPersistenceProviderMock } from '../../../providers/completed-test-persistence/__mocks__/completed-test-persistence.mock';
import { CompletedTestPersistenceProvider } from '../../../providers/completed-test-persistence/completed-test-persistence';
describe('JournalPage', function () {
    var fixture;
    var component;
    var store$;
    var screenOrientation;
    var insomnia;
    var deviceProvider;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [JournalPage],
            imports: [
                JournalComponentsModule,
                TestSlotComponentsModule,
                IonicModule,
                AppModule,
                StoreModule.forRoot({
                    journal: journalReducer,
                    tests: testsReducer,
                }),
                MockedJournalModule,
                ComponentsModule,
            ],
            providers: [
                { provide: NavController, useFactory: function () { return NavControllerMock.instance(); } },
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: LoadingController, useFactory: function () { return LoadingControllerMock.instance(); } },
                { provide: ToastController, useFactory: function () { return ToastControllerMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
                { provide: SlotSelectorProvider, useClass: SlotSelectorProvider },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: App, useClass: MockAppComponent },
                { provide: DeviceProvider, useClass: DeviceProviderMock },
                { provide: ScreenOrientation, useClass: ScreenOrientationMock },
                { provide: Insomnia, useClass: InsomniaMock },
                { provide: SlotProvider, useClass: SlotProvider },
                { provide: CompletedTestPersistenceProvider, useClass: CompletedTestPersistenceProviderMock },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(JournalPage);
        component = fixture.componentInstance;
        component.subscription = new Subscription();
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
    }));
    describe('Class', function () {
        describe('logout', function () {
            it('should dispatch an UnloadJournal action and call base page logout', function () {
                spyOn(BasePageComponent.prototype, 'logout');
                component.logout();
                expect(store$.dispatch).toHaveBeenCalledWith(new UnloadJournal());
                expect(BasePageComponent.prototype.logout).toHaveBeenCalled();
            });
        });
        describe('loadJournalManually', function () {
            it('should dispatch a LoadJournal action', function () {
                component.loadJournalManually();
                expect(store$.dispatch).toHaveBeenCalledWith(new LoadJournal());
            });
        });
        describe('setupPolling', function () {
            it('should dispatch a setupPolling action', function () {
                component.setupPolling();
                expect(store$.dispatch).toHaveBeenCalledWith(new SetupPolling());
            });
        });
        describe('handleLoadingUI', function () {
            it('should create a loading spinner instance if loading is true', function () {
                component.handleLoadingUI(true);
                expect(component.loadingController.create).toHaveBeenCalledWith({
                    dismissOnPageChange: true,
                    spinner: 'circles',
                });
            });
        });
        describe('showError', function () {
            it('should create a modal instance if there is an error', function () {
                var errorMessage = {
                    message: 'Error',
                    status: 500,
                    statusText: 'Something went wrong',
                };
                component.showError(errorMessage);
                expect(component.modalController.create).toHaveBeenCalledWith(ERROR_PAGE, { type: ErrorTypes.JOURNAL_REFRESH }, { cssClass: 'modal-fullscreen text-zoom-regular' });
            });
        });
        describe('ionViewDidEnter', function () {
            it('should disable test inhibitions', function () {
                component.ionViewDidEnter();
                expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
                expect(screenOrientation.unlock).toHaveBeenCalled();
                expect(insomnia.allowSleepAgain).toHaveBeenCalled();
            });
        });
    });
    describe('DOM', function () {
        // Unit tests for the components template
        var componentEl;
        beforeEach(function () {
            componentEl = fixture.debugElement;
            // Manually dispatching an action which loads slots to the store
            store$.dispatch(new LoadJournalSuccess({ examiner: { staffNumber: '123', individualId: 456 }, slotItemsByDate: journalSlotsDataMock }, ConnectionStatus.ONLINE, false, new Date()));
        });
        // TODO - Come back and look at this test
        xit('there should be one slot for every journal entry', function () {
            var slotsList = componentEl.query(By.css('ion-list'));
            expect(slotsList.children.length).toBe(0);
            fixture.detectChanges();
            var noOfSlotsReturned;
            component.pageState.slots$.subscribe(function (slots) { return noOfSlotsReturned = slots.length; });
            expect(slotsList.children.length).toBe(noOfSlotsReturned);
            expect(slotsList.children.every(function (child) { return child.name === 'test-slot'; })).toEqual(true);
        });
    });
});
//# sourceMappingURL=journal.spec.js.map