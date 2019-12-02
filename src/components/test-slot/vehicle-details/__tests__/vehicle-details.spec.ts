import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { VehicleDetailsComponent } from '../vehicle-details';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from 'ng-bullet'

describe('VehicleDetailsComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsComponent>;
  let component: VehicleDetailsComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsComponent,
      ],
      imports: [IonicModule],
    })
  })

  beforeEach(async(() => {
      fixture = TestBed.createComponent(VehicleDetailsComponent);
      component = fixture.componentInstance;
  }));

  describe('DOM', () => {
    it('should show vehicle details when showDimensions is true', () => {
      component.showDimensions = true;
      fixture.detectChanges();
      const ionCols = fixture.debugElement.queryAll(By.css('.vehicle-details-row'));
      expect(ionCols.length).toBe(1);
    });

    it('should not show vehicle details when showDimensions is false', () => {
      component.showDimensions = false;
      fixture.detectChanges();
      const ionCols = fixture.debugElement.queryAll(By.css('.vehicle-details-row'));
      expect(ionCols.length).toBe(0);
    });
  });

});
