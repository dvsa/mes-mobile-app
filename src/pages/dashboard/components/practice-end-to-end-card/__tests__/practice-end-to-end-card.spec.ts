import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { PracticeEndToEndCardComponent } from '../practice-end-to-end-card';
import { NavControllerMock } from 'ionic-mocks';
import { FAKE_JOURNAL_PAGE } from '../../../../page-names.constants';
import { configureTestSuite } from 'ng-bullet';

describe('PracticeEndToEndCard ', () => {
  let component: PracticeEndToEndCardComponent;
  let fixture: ComponentFixture<PracticeEndToEndCardComponent>;
  let navContoller: NavController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeEndToEndCardComponent],
      imports: [IonicModule.forRoot(PracticeEndToEndCardComponent)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    })
  });

  beforeEach(async(() => {
      fixture = TestBed.createComponent(PracticeEndToEndCardComponent);
      component = fixture.componentInstance;
      navContoller = TestBed.get(NavController);
  }));

  describe('Class', () => {
    describe('navigateToFakeJournal', () => {
      it('should trigger navigation to Fake Journal', () => {
        component.navigateToFakeJournal();

        expect(navContoller.push).toHaveBeenCalledWith(FAKE_JOURNAL_PAGE);
      });
    });
  });

});
