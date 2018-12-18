import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { JournalTimeComponent } from '../journal-time';

describe('Journal Test Details', () => {
  let fixture: ComponentFixture<JournalTimeComponent>;
  let component: JournalTimeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalTimeComponent],
      imports: [IonicModule.forRoot(JournalTimeComponent)],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(JournalTimeComponent);
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