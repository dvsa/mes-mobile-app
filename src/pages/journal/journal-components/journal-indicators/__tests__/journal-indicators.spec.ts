import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JournalIndicatorsComponent } from '../journal-indicators';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';


describe('JournalIndicatorsComponent', () => {
  let component: JournalIndicatorsComponent;
  let fixture: ComponentFixture<JournalIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JournalIndicatorsComponent],
      imports: [IonicModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(JournalIndicatorsComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    describe('special needs indicator', () => {
      it('should render when visibility is configured', () => {
        component.showSpecialNeedsIndicator = true;
        fixture.detectChanges();
        const renderedImage = fixture.debugElement.query(By.css('.special-needs-indicator')).nativeElement;
        expect(renderedImage.getAttribute('src')).toContain('special');
      });
      it('should not be rendered when visibility is turned off', () => {
        component.showSpecialNeedsIndicator = false;
        fixture.detectChanges();
        const renderedImages = fixture.debugElement.queryAll(By.css('.special-needs-indicator'));
        expect(renderedImages).toHaveLength(0);
      });
    });
  });
});
