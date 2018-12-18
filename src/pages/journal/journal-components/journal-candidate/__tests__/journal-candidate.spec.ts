import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { JournalCandidateComponent } from '../journal-candidate';

describe('Journal Test Details', () => {
  let fixture: ComponentFixture<JournalCandidateComponent>;
  let component: JournalCandidateComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalCandidateComponent],
      imports: [IonicModule.forRoot(JournalCandidateComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalCandidateComponent);
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