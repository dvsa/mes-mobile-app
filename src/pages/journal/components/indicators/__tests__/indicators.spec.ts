import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicatorsComponent } from '../indicators';
import { IonicModule } from 'ionic-angular';
import { By } from '@angular/platform-browser';


describe('IndicatorsComponent', () => {
  let component: IndicatorsComponent;
  let fixture: ComponentFixture<IndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IndicatorsComponent],
      imports: [IonicModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(IndicatorsComponent);
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
        const renderedImage = fixture.debugElement.query(By.css('.special-needs-indicator'));
        expect(renderedImage.attributes.src).toContain('special');
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
