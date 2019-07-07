import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { NavControllerMock, NavParamsMock, PlatformMock, LoadingControllerMock } from 'ionic-mocks';
import { AppModule } from '../../../app/app.module';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { ViewTestResultPage } from '../view-test-result';
import { SearchProvider } from '../../../providers/search/search';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { MockComponent } from 'ng-mocks';
import { TestDetailsComponent } from '../components/test-details/test-details';
import { ExaminerDetailsComponent } from '../components/examiner-details/examiner-details';
import { categoryBTestResultMock } from '../__mocks__/cat-b-test-result.mock';
import { By } from '@angular/platform-browser';
import { ExaminerDetailsModel } from '../components/examiner-details/examiner-details.model';
import { TestDetailsModel } from '../components/test-details/test-details.model';

describe('ViewTestResultPage', () => {
  let fixture: ComponentFixture<ViewTestResultPage>;
  let component: ViewTestResultPage;
  let loadingController: LoadingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ViewTestResultPage,
        MockComponent(TestDetailsComponent),
        MockComponent(ExaminerDetailsComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: LoadingController, useFactory: () => LoadingControllerMock.instance() },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: SearchProvider, useClass:  SearchProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ViewTestResultPage);
        component = fixture.componentInstance;
        loadingController = TestBed.get(LoadingController);
      });
  }));

  describe('Class', () => {
    describe('handleLoadingUI', () => {
      it('should setup a loading spinner when isLoading is set to true', () => {
        component.handleLoadingUI(true);

        expect(component.isLoading).toBeTruthy();
        expect(component.loadingSpinner).not.toBeNull;
      });
      it('should remove the loading spinner when isLoading is set to false', () => {
        component.loadingSpinner = loadingController.create();

        component.handleLoadingUI(false);

        expect(component.isLoading).toBeFalsy();
        expect(component.loadingSpinner).toBeNull();
      });
    });
    describe('getTestDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryBTestResultMock;

        const result: TestDetailsModel = component.getTestDetails();

        expect(result.applicationReference).toBe('123');
        expect(result.category).toBe('B');
        expect(result.date).toBe('Friday 5th July 2019');
        expect(result.time).toBe('09:00');
      });
      it('should return null when there is no test result', () => {
        const result: TestDetailsModel = component.getTestDetails();
        expect(result).toBeNull();
      });
    });
    describe('getExaminerDetails', () => {
      it('should correctly generate the data', () => {
        component.testResult = categoryBTestResultMock;

        const result: ExaminerDetailsModel = component.getExaminerDetails();

        expect(result.staffNumber).toBe('mock-staff-number');
        expect(result.costCode).toBe('mock-cost-code');
      });
      it('should return null when there is no test result', () => {
        const result: ExaminerDetailsModel = component.getExaminerDetails();
        expect(result).toBeNull();
      });
    });

  });

  describe('DOM', () => {
    it('should hide the cards when the data is loading', () => {
      component.isLoading = true;

      expect(fixture.debugElement.query(By.css('test-details'))).toBeNull();
      expect(fixture.debugElement.query(By.css('examiner-details'))).toBeNull();
    });
    it('should show the cards when the data is not loading', () => {
      component.isLoading = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('test-details'))).not.toBeNull();
      expect(fixture.debugElement.query(By.css('examiner-details'))).not.toBeNull();
    });
  });
});
