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
      imports: [IonicModule],
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
    describe('exclamation indicator', () => {
      it('should render when visibility is configured', () => {
        component.showExclamationIndicator = true;
        fixture.detectChanges();
        const renderedImage = fixture.debugElement.query(By.css('.exclamation-indicator'));
        expect(renderedImage.attributes.src).toContain('exclamation');
      });
      it('should not be rendered when visibility is turned off', () => {
        component.showExclamationIndicator = false;
        fixture.detectChanges();
        const renderedImages = fixture.debugElement.queryAll(By.css('.exclamation-indicator'));
        expect(renderedImages.length).toBe(0);
      });
    });
  });
});
