import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { PracticeEndToEndCardComponent } from '../practice-end-to-end-card';
import { NavControllerMock } from 'ionic-mocks';

describe('PracticeEndToEndCard ', () => {
  let component: PracticeEndToEndCardComponent;
  let fixture: ComponentFixture<PracticeEndToEndCardComponent>;
  let navContoller: NavController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeEndToEndCardComponent],
      imports: [IonicModule.forRoot(PracticeEndToEndCardComponent)],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PracticeEndToEndCardComponent);
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
        component.navigateToFakeJournal();

        expect(navContoller.push).toHaveBeenCalledWith('FakeJournalPage');
      });
    });
  });

  describe('DOM', () => {

  });
});
