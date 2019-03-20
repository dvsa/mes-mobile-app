import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsComponent } from '../vehicle-details';
import { By } from '@angular/platform-browser';

describe('VehicleDetailsComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsComponent>;
  let component: VehicleDetailsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsComponent,
      ],
      imports: [IonicModule],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(VehicleDetailsComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });
  });

  describe('DOM', () => {
    it('should show vehicle details when showDimensions is true', () => {
      component.showDimensions = true;
      fixture.detectChanges();
      const ionCols = fixture.debugElement.queryAll(By.css('p'));
      expect(ionCols.length).toBe(1);
    });

    it('should not vehicle details when showDimensions is false', () => {
      component.showDimensions = false;
      fixture.detectChanges();
      const ionCols = fixture.debugElement.queryAll(By.css('p'));
      expect(ionCols.length).toBe(0);
    });
  });

});
