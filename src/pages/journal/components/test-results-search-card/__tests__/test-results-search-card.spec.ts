import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TestResultsSearchCardComponent } from '../test-results-search-card';
import { NavControllerMock } from 'ionic-mocks';

describe('TestResultsSearchCard ', () => {
  let component: TestResultsSearchCardComponent;
  let fixture: ComponentFixture<TestResultsSearchCardComponent>;
  let navContoller: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestResultsSearchCardComponent],
      imports: [IonicModule.forRoot(TestResultsSearchCardComponent)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TestResultsSearchCardComponent);
      component = fixture.componentInstance;
      navContoller = TestBed.get(NavController);
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('navigateToFakeJournal', () => {
      it('should trigger navigation to Fake Journal', () => {
        component.navigateToTestResultsSearch();

        expect(navContoller.push).toHaveBeenCalledWith('TestResultsSearchPage');
      });
    });
  });

  describe('DOM', () => {

  });
});
