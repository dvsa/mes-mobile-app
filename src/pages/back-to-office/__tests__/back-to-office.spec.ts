import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { BackToOfficePage } from '../back-to-office';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../components/common/practice-mode-banner/practice-mode-banner';

describe('BackToOfficePage', () => {
  let fixture: ComponentFixture<BackToOfficePage>;
  let component: BackToOfficePage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BackToOfficePage,
        MockComponent(PracticeModeBanner),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(BackToOfficePage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
      });
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should disable test inhibitions when not in practice mode', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });
      it('should disable test inhibitions when in practice mode', () => {
        component.isPracticeMode = true;
        component.ionViewDidEnter();
        expect(deviceProvider.disableSingleAppMode).not.toHaveBeenCalled();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });
    });
  });

  describe('goToJournal', () => {
    it('should call the popTo method in the navcontroller if not in practice mode', () => {
      component.goToJournal();
      expect(navController.popTo).toHaveBeenCalled();
    });
    it('should call the popTo method in the navcontroller if in practice mode', () => {
      component.isPracticeMode = true;
      component.goToJournal();
      expect(navController.popTo).toHaveBeenCalled();
    });
  });
});
