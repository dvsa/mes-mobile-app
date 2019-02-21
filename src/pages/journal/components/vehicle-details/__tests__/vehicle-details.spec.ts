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
    // it('should show vehicle details when showDimensions is true', () => {
    //   component.showDimensions = true;
    //   fixture.detectChanges();
    //   const ionCols = fixture.debugElement.queryAll(By.css('ion-col'));
    //   expect(ionCols.length).toBe(3);
    // });

    // it('should not vehicle details when showDimensions is false', () => {
    //   component.showDimensions = false;
    //   fixture.detectChanges();
    //   const ionCols = fixture.debugElement.queryAll(By.css('ion-col'));
    //   expect(ionCols.length).toBe(0);
    // });

    // it('should show number of seats when showNumberOfSeats is true', () => {
    //   component.showDimensions = false;
    //   component.showNumberOfSeats = true;
    //   fixture.detectChanges();
    //   const ionCols = fixture.debugElement.queryAll(By.css('ion-col'));
    //   expect(ionCols.length).toBe(1);
    // });

    // it('should not show number of seats when showNumberOfSeats is false', () => {
    //   component.showDimensions = false;
    //   component.showNumberOfSeats = false;
    //   fixture.detectChanges();
    //   const ionCols = fixture.debugElement.queryAll(By.css('ion-col'));
    //   expect(ionCols.length).toBe(0);
    // });
  });

});
