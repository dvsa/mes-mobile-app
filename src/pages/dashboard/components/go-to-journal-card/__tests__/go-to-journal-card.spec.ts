import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { GoToJournalCardComponent } from '../go-to-journal-card';
import { NavControllerMock } from 'ionic-mocks';
import { JOURNAL_PAGE } from '../../../../page-names.constants';
import { configureTestSuite } from 'ng-bullet';

describe('GoToJournalCard ', () => {
  let component: GoToJournalCardComponent;
  let fixture: ComponentFixture<GoToJournalCardComponent>;
  let navContoller: NavController;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [GoToJournalCardComponent],
      imports: [IonicModule.forRoot(GoToJournalCardComponent)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoToJournalCardComponent);
    component = fixture.componentInstance;
    navContoller = TestBed.get(NavController);
  }));

  describe('Class', () => {
    describe('navigateToJournal', () => {
      it('should trigger navigation to Journal', () => {
        component.navigateToJournal();

        expect(navContoller.push).toHaveBeenCalledWith(JOURNAL_PAGE);
      });
    });
  });

  describe('DOM', () => {

  });
});
