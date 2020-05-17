import { MockAppComponent } from './../../../app/__mocks__/app.component.mock';
import { App } from './../../../app/app.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import {
  Config, Platform,
  LoadingController, ToastController, IonicModule, ModalController, NavController, NavParams,
} from 'ionic-angular';
import {
  NavControllerMock, NavParamsMock, ConfigMock,
  PlatformMock, LoadingControllerMock, ModalControllerMock, ToastControllerMock,
} from 'ionic-mocks';
import { JournalComponentsModule } from './../components/journal-components.module';
import { AppModule } from '../../../app/app.module';
import { JournalPage } from '../journal';
import { DebugElement } from '@angular/core';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../../../modules/journal/journal.reducer';
import { Subscription } from 'rxjs';
import { SlotSelectorProvider } from '../../../providers/slot-selector/slot-selector';
import { MockedJournalModule } from '../../../modules/journal/__mocks__/journal.module.mock';
import {
  UnloadJournal,
  LoadJournal,
  LoadJournalSuccess,
  SetupPolling,
} from '../../../modules/journal/journal.actions';
import { BasePageComponent } from '../../../shared/classes/base-page';
import { StoreModel } from '../../../shared/models/store.model';
import { MesError } from '../../../shared/models/mes-error.model';
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
import {
  AmberAlertProvider,
} from '../../../external-modules/lw-ionic-module/providers/amber-alert.provider';
import {
  LoneWorkerIntegrationProvider,
} from '../../../providers/lone-worker-integration/lone-worker-integration.provider';
import {
  LoneWorkerIntegrationProviderMock,
} from '../../../providers/lone-worker-integration/__mocks__/lone-worker-integration.provider.mock';

describe('JournalPage', () => {
  let fixture: ComponentFixture<JournalPage>;
  let component: JournalPage;
  let store$: Store<StoreModel>;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  configureTestSuite(() => {
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
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: ToastController, useFactory: () => ToastControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SlotSelectorProvider, useClass: SlotSelectorProvider },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: App, useClass: MockAppComponent },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: SlotProvider, useClass: SlotProvider },
        { provide: AmberAlertProvider, useClass: AmberAlertProvider },
        { provide: LoneWorkerIntegrationProvider, useClass: LoneWorkerIntegrationProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(JournalPage);
    component = fixture.componentInstance;
    component.subscription = new Subscription();
    screenOrientation = TestBed.get(ScreenOrientation);
    insomnia = TestBed.get(Insomnia);
    deviceProvider = TestBed.get(DeviceProvider);
    store$ = TestBed.get(Store);
    spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('logout', () => {
      it('should dispatch an UnloadJournal action and call base page logout', () => {
        spyOn(BasePageComponent.prototype, 'logout');
        component.logout();
        expect(store$.dispatch).toHaveBeenCalledWith(new UnloadJournal());
        expect(BasePageComponent.prototype.logout).toHaveBeenCalled();
      });
    });

    describe('loadJournalManually', () => {
      it('should dispatch a LoadJournal action', () => {
        component.loadJournalManually();
        expect(store$.dispatch).toHaveBeenCalledWith(new LoadJournal());
      });
    });

    describe('setupPolling', () => {
      it('should dispatch a setupPolling action', () => {
        component.setupPolling();
        expect(store$.dispatch).toHaveBeenCalledWith(new SetupPolling());
      });
    });

    describe('handleLoadingUI', () => {
      it('should create a loading spinner instance if loading is true', () => {
        component.handleLoadingUI(true);
        expect(component.loadingController.create).toHaveBeenCalledWith({
          dismissOnPageChange: true,
          spinner: 'circles',
        });
      });
    });

    describe('showError', () => {
      it('should create a modal instance if there is an error', () => {
        const errorMessage: MesError = {
          message: 'Error',
          status: 500,
          statusText: 'Something went wrong',
        };

        component.showError(errorMessage);
        expect(component.modalController.create).toHaveBeenCalledWith(
          ERROR_PAGE,
          { type: ErrorTypes.JOURNAL_REFRESH },
          { cssClass: 'modal-fullscreen text-zoom-regular' });
      });
    });

    describe('ionViewDidEnter', () => {
      it('should disable test inhibitions', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
    let componentEl: DebugElement;

    beforeEach(() => {
      componentEl = fixture.debugElement;

      // Manually dispatching an action which loads slots to the store
      store$.dispatch(
        new LoadJournalSuccess(
          { examiner: { staffNumber: '123', individualId: 456 }, slotItemsByDate: journalSlotsDataMock },
          ConnectionStatus.ONLINE,
          false,
          new Date(),
        ),
      );
    });

    // TODO - Come back and look at this test
    xit('there should be one slot for every journal entry', () => {
      const slotsList = componentEl.query(By.css('ion-list'));
      expect(slotsList.children.length).toBe(0);

      fixture.detectChanges();

      let noOfSlotsReturned: number;
      component.pageState.slots$.subscribe(slots => noOfSlotsReturned = slots.length);

      expect(slotsList.children.length).toBe(noOfSlotsReturned);
      expect(slotsList.children.every(child => child.name === 'test-slot')).toEqual(true);
    });
  });
});
