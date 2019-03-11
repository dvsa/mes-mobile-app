import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { TestReportPage } from '../test-report';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ScreenOrientationMock } from '../../../shared/mocks/screen-orientation.mock';

describe('TestReportPage', () => {
  let fixture: ComponentFixture<TestReportPage>;
  let component: TestReportPage;
  let screenOrientation: ScreenOrientation;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestReportPage],
      imports: [IonicModule, AppModule],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: ScreenOrientation, useClass: ScreenOrientationMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestReportPage);
        component = fixture.componentInstance;
        screenOrientation = TestBed.get(ScreenOrientation);
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
      describe('ionViewDidLeave', () => {
        it('should unlock the screen orientation', () => {
          component.ionViewDidLeave();
          expect(screenOrientation.unlock).toHaveBeenCalled();
        });
      });
    });
  });

  describe('DOM', () => {
    // Unit tests for the components template
  });
});
