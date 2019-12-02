import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, AlertController, ModalController } from 'ionic-angular';
import { PracticeTestReportCardComponent } from '../practice-test-report-card';
import { NavControllerMock, AlertControllerMock, ModalControllerMock } from 'ionic-mocks';
import { journalReducer } from '../../../../../modules/journal/journal.reducer';
import { StoreModule } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';

describe('PracticeTestReportCard ', () => {
  let component: PracticeTestReportCardComponent;
  let fixture: ComponentFixture<PracticeTestReportCardComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeTestReportCardComponent],
      imports: [
        IonicModule.forRoot(PracticeTestReportCardComponent),
        StoreModule.forRoot({
          journal: journalReducer,
        }),
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
      ],
    })
  });

  beforeEach(async(() => {
      fixture = TestBed.createComponent(PracticeTestReportCardComponent);
      component = fixture.componentInstance;
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
