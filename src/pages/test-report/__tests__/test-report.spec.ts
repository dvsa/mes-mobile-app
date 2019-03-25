import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';

import { AppModule } from '../../../app/app.module';
import { TestReportPage } from '../test-report';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';
import { Insomnia } from '@ionic-native/insomnia';
import { InsomniaMock } from '../../../shared/mocks/insomnia.mock';
import { CompetencyComponent } from '../components/competency/competency';
import { DeviceProvider } from '../../../providers/device/device';
import { DeviceProviderMock } from '../../../providers/device/__mocks__/device.mock';

describe('TestReportPage', () => {
  let fixture: ComponentFixture<TestReportPage>;
  let component: TestReportPage;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportPage, MockComponent(CompetencyComponent)],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
        { provide: Insomnia, useClass: InsomniaMock },
        { provide: DeviceProvider, useClass: DeviceProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestReportPage);
        component = fixture.componentInstance;
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('ionViewDidEnter', () => {
      it('should lock the screen orientation to Portrait Primary', () => {
        component.ionViewDidEnter();
        expect(screenOrientation.lock)
          .toHaveBeenCalledWith(screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      });

      it('should keep the device awake', () => {
        component.ionViewDidEnter();
        expect(insomnia.keepAwake).toHaveBeenCalled();
      });

      it('should enable singleAppMode', () => {
        component.ionViewDidEnter();
        expect(deviceProvider.enableSingleAppMode).toHaveBeenCalled();
      });

    });

    describe('ionViewDidLeave', () => {
      it('should unlock the screen orientation', () => {
        component.ionViewDidLeave();
        expect(screenOrientation.unlock).toHaveBeenCalled();
      });

      it('should allow the device to sleep', () => {
        component.ionViewDidLeave();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
      });

      it('should disable singleAppMode', () => {
        component.ionViewDidLeave();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
  });
});
