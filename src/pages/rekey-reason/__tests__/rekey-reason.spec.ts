import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, Platform, Config, LoadingController } from 'ionic-angular';
import { NavControllerMock, PlatformMock, ConfigMock, LoadingControllerMock } from 'ionic-mocks';
import { RekeyReasonPage } from '../rekey-reason';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { Store, StoreModule } from '@ngrx/store';
import { AppModule } from '../../../app/app.module';

describe('RekeyReasonPage', () => {
  let fixture: ComponentFixture<RekeyReasonPage>;
  let component: RekeyReasonPage;
  let loadingController: LoadingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RekeyReasonPage,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({}),
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        Store,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(RekeyReasonPage);
        component = fixture.componentInstance;
        loadingController = TestBed.get(LoadingController);
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('handleLoadingUI', () => {
      it('should setup a loading spinner when isUploading is set to true', () => {
        component.handleLoadingUI(true);

        expect(component.loadingSpinner).not.toBeNull;
      });
      it('should remove the loading spinner when isUploading is set to false', () => {
        component.loadingSpinner = loadingController.create();

        component.handleLoadingUI(false);

        expect(component.loadingSpinner).toBeNull();
      });
    });
  });
});
