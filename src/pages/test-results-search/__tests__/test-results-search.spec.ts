import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { TestResultsSearchPage } from '../test-results-search';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';

describe('TestResultsSearchPage', () => {
  let fixture: ComponentFixture<TestResultsSearchPage>;
  let component: TestResultsSearchPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestResultsSearchPage,
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestResultsSearchPage);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    // Unit tests for the components TypeScript class
    it('should create', () => {
      expect(component).toBeDefined();
    });

  });

  describe('DOM', () => {
  });
});
