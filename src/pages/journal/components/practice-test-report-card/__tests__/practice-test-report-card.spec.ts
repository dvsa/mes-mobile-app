import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { PracticeTestReportCardComponent } from '../practice-test-report-card';

describe('PracticeTestReportCard ', () => {
  let component: PracticeTestReportCardComponent;
  let fixture: ComponentFixture<PracticeTestReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeTestReportCardComponent],
      imports: [IonicModule.forRoot(PracticeTestReportCardComponent)],
      providers: [],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PracticeTestReportCardComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {

  });
});
