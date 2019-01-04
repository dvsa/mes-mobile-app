import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { JournalTestOutcomeComponent } from '../journal-test-outcome';


describe('Journal Test Outcome', () => {
  let fixture: ComponentFixture<JournalTestOutcomeComponent>;
  let component: JournalTestOutcomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalTestOutcomeComponent],
      imports: [IonicModule.forRoot(JournalTestOutcomeComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalTestOutcomeComponent);
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
    // Unit tests for the components template

  });
});
