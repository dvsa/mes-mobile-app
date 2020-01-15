import { VehicleChecksComponent } from '../vehicle-checks';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { SeriousFaultBadgeComponent }
from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { DrivingFaultsBadgeComponent }
from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { FaultCountProvider } from '../../../../../../providers/fault-count/fault-count';
import { VehicleChecksScore } from '../../../../../../shared/models/vehicle-checks-score.model';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

describe('VehicleChecksComponent', () => {
  let fixture: ComponentFixture<VehicleChecksComponent>;
  let component: VehicleChecksComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksComponent,
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DrivingFaultsBadgeComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        FaultCountProvider,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleChecksComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);

        // TODO - PREP-AMOD2: Change test category to AMod2
        store$.dispatch(new StartTest(105, TestCategory.BE));
      });
  }));

  describe('Class', () => {
    const vehicleChecksScore: VehicleChecksScore = {
      drivingFaults: 4,
      seriousFaults: 1,
    };

    beforeEach(() => {
      // TODO - AMOD2-PREP: Use cat a mod2 provider function name
      spyOn(component.faultCountProvider, 'getVehicleChecksFaultCountCatBE').and.returnValue(vehicleChecksScore);
    });

    it('should set the vehicle checks driving fault count', (done: DoneFn) => {
      component.ngOnInit();
      component.componentState.vehicleChecksDrivingFaultCount$.subscribe((result) => {
        // TODO - AMOD2-PREP: Use cat a mod2 provider function
        component.componentState.vehicleChecksDrivingFaultCount$.subscribe((result) => {
          expect(component.faultCountProvider.getVehicleChecksFaultCount).toHaveBeenCalled();
          expect(result).toEqual(4);
          done();
        done();
      });
    });
    it('should set the vehicle checks serious fault count', (done: DoneFn) => {
      component.ngOnInit();
      component.componentState.vehicleChecksSeriousFaultCount$.subscribe((result) => {
        // TODO - AMOD2-PREP: Use cat a mod2 provider function
        component.componentState.vehicleChecksSeriousFaultCount$.subscribe((result) => {
          expect(component.faultCountProvider.getVehicleChecksFaultCount).toHaveBeenCalled();
          expect(result).toEqual(1);
        done();
      });
    });
  });

  describe('DOM', () => {

    it('should pass the number of VC driving faults to the driving faults component', () => {
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;
      component.componentState.vehicleChecksDrivingFaultCount$ = of(3);
      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(3);
    });

    it('should pass true to the serious faults badge if there are serious VC faults', () => {
      fixture.detectChanges();
      const seriousFaultsBadge = fixture.debugElement.query(By.css('serious-fault-badge'))
        .componentInstance as SeriousFaultBadgeComponent;
      component.componentState.vehicleChecksSeriousFaultCount$ = of(1);
      fixture.detectChanges();
      expect(seriousFaultsBadge.showBadge).toEqual(true);
    });

  });
});
