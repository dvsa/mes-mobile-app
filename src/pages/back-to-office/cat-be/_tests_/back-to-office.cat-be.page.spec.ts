import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../../app/app.module';
import { BackToOfficeCatBEPage } from '../back-to-office.cat-be.page';
import { AuthenticationProvider } from '../../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../providers/date-time/__mocks__/date-time.mock';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Insomnia } from '@ionic-native/insomnia';
import { DeviceProvider } from '../../../../providers/device/device';
import { DeviceProviderMock } from '../../../../providers/device/__mocks__/device.mock';
import { InsomniaMock } from '../../../../shared/mocks/insomnia.mock';
import { ScreenOrientationMock } from '../../../../shared/mocks/screen-orientation.mock';
import { MockComponent } from 'ng-mocks';
import { PracticeModeBanner } from '../../../../components/common/practice-mode-banner/practice-mode-banner';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

describe('BackToOfficePage', () => {
  let fixture: ComponentFixture<BackToOfficeCatBEPage>;
  let component: BackToOfficeCatBEPage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BackToOfficeCatBEPage,
        MockComponent(PracticeModeBanner),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                  vehicleChecks: {
                    showMeQuestion: {
                      code: 'S3',
                      description: '',
                      outcome: '',
                    },
                    tellMeQuestion: {
                      code: '',
                      description: '',
                      outcome: '',
                    },
                  },
                  eyesightTest: {},
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
                },
                rekey: false,
              },
            },
          }),
        }),
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
        fixture = TestBed.createComponent(BackToOfficeCatBEPage);
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
      it('should disable test inhibitions', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });
    });
  });

  describe('goToJournal', () => {
    it('should call the popTo method in the navcontroller', () => {
      component.goToJournal();
      expect(navController.popTo).toHaveBeenCalled();
    });
  });

  describe('DOM', () => {
    it('should show the return to journal button when not a rekey', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.bottom-button'))).toBeDefined();
    });
    it('should hide the return to journal button when this is a rekey', () => {
      fixture.detectChanges();
      component.pageState.isRekey$ = of(true);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.bottom-button'))).toBeNull();
    });
  });
});
