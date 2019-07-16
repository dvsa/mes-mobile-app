import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, ViewControllerMock } from 'ionic-mocks';
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

describe('TestResultsSearchPage', () => {
  let fixture: ComponentFixture<TestResultsSearchPage>;
  let component: TestResultsSearchPage;
  let appConfigProviderMock: AppConfigProvider;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestResultsSearchPage,
      ],
      imports: [
        IonicModule,
        AppModule,
        TestResultsSearchComponentsModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SearchProvider, useClass: SearchProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestResultsSearchPage);
        appConfigProviderMock = TestBed.get(AppConfigProvider);
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

  describe('advanced search', () => {
    describe('when the user is an LDTM', () => {
      beforeEach(() => {
        spyOn(appConfigProviderMock, 'getAppConfig').and.returnValue({
          role: ExaminerRole.LDTM,
        });
        fixture.detectChanges();
      });

      it('displays the advanced search', () => {
        expect(fixture.debugElement.query(By.css('#tab-search-advanced'))).not.toBeNull();
      });
    });

    describe('when the user is a DE', () => {
      beforeEach(() => {
        spyOn(appConfigProviderMock, 'getAppConfig').and.returnValue({
          role: ExaminerRole.DE,
        });
        fixture.detectChanges();
      });

      it('only displays the candidate search', () => {
        expect(fixture.debugElement.query(By.css('#tab-search-candidate-details'))).not.toBeNull();
        expect(fixture.debugElement.query(By.css('#tab-search-advanced'))).toBeNull();
      });
    });
  });
});
