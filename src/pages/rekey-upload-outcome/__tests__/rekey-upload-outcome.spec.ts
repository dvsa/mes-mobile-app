import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Config, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, ConfigMock, PlatformMock } from 'ionic-mocks';

import { AppModule } from '../../../app/app.module';
import { RekeyUploadOutcomePage } from '../rekey-upload-outcome';
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
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { rekeyReasonReducer } from '../../rekey-reason/rekey-reason.reducer';
import { of } from 'rxjs/observable/of';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet';

describe('RekeyUploadOutcomePage', () => {
  let fixture: ComponentFixture<RekeyUploadOutcomePage>;
  let component: RekeyUploadOutcomePage;
  let navController: NavController;
  let store$: Store<StoreModel>;
  let screenOrientation: ScreenOrientation;
  let insomnia: Insomnia;
  let deviceProvider: DeviceProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyUploadOutcomePage,
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forRoot({
          tests: testsReducer,
          rekeyReason: rekeyReasonReducer,
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
  });

  beforeEach(async(() => {
        fixture = TestBed.createComponent(RekeyUploadOutcomePage);
        component = fixture.componentInstance;
        navController = TestBed.get(NavController);
        screenOrientation = TestBed.get(ScreenOrientation);
        insomnia = TestBed.get(Insomnia);
        deviceProvider = TestBed.get(DeviceProvider);
        store$ = TestBed.get(Store);
        spyOn(store$, 'dispatch');
  }));

  describe('Class', () => {
    describe('ionViewDidEnter', () => {
      it('should disable test inhibitions', () => {
        component.ionViewDidEnter();
        expect(screenOrientation.unlock).toHaveBeenCalled();
        expect(insomnia.allowSleepAgain).toHaveBeenCalled();
        expect(deviceProvider.disableSingleAppMode).toHaveBeenCalled();
      });
    });

    describe('goToJournal', () => {
      it('should call the popTo method in the navcontroller', () => {
        component.goToJournal();
        expect(navController.popTo).toHaveBeenCalled();
      });
    });
  });

  describe('DOM', () => {

    describe('isDuplicate', () => {
      it('should show the sucess message when the upload succeeded', () => {
        fixture.detectChanges();
        component.pageState.duplicateUpload$ = of(false);
        fixture.detectChanges();
        const element: HTMLElement = fixture.debugElement.query(By.css('.modal-alert-header')).nativeElement;
        expect(element.textContent).toEqual('Rekeyed test uploaded successfully');
        expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeDefined();
        expect(fixture.debugElement.query(By.css('.warning-icon'))).toBeNull();
      });
      it('should show the duplicate upload message when the upload was detected as a duplicate', () => {
        fixture.detectChanges();
        component.pageState.duplicateUpload$ = of(true);
        fixture.detectChanges();
        const element: HTMLElement = fixture.debugElement.query(By.css('.modal-alert-header')).nativeElement;
        expect(element.textContent).toEqual('Rekeyed test has already been uploaded');
        expect(fixture.debugElement.query(By.css('.warning-icon'))).toBeDefined();
        expect(fixture.debugElement.query(By.css('.tick-icon'))).toBeNull();
      });
    });
  });
});
