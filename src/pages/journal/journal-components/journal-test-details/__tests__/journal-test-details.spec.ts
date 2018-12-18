import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { JournalTestDetailsComponent } from '../journal-test-details';

describe('Journal Test Details', () => {
  let fixture: ComponentFixture<JournalTestDetailsComponent>;
  let component: JournalTestDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalTestDetailsComponent],
      imports: [IonicModule.forRoot(JournalTestDetailsComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalTestDetailsComponent);
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
